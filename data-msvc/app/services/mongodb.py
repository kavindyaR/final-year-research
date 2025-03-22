import pandas as pd
from datetime import datetime
from flask import current_app
from pymongo import MongoClient, UpdateOne
from app.utils import metrics_margins, calculate_percentage_score, weights, calculate_weighted_score

# client = MongoClient("mongodb+srv://admin:admin234@cluster0.qd5ud.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


def save_data_to_mongo(df_avg, db_name, collection, uid):
    user_id = uid
    client = MongoClient(current_app.config['MONGO_URI'])
    db = client[db_name]
    collection = db[collection]

    # Remove existing document(s) with the same user_id BEFORE inserting new records
    collection.delete_one({"user_id": user_id})

    # Define chunk size (e.g., 100 records per batch)
    chunk_size = 100  

    # Convert DataFrame into list of dictionaries (chunk-wise processing)
    for i in range(0, len(df_avg), chunk_size):
        chunk = df_avg.iloc[i:i + chunk_size]

        bulk_operations = []
        
        for _, row in chunk.iterrows():
            # Convert date to datetime format
            date_time = datetime.combine(row['date'], datetime.min.time())

            # Create update operation
            operation = UpdateOne(
                {"user_id": user_id},  # Filter by user_id only (one document per user)
                {
                    "$set": {f"types.{row['type']}.unit": row['unit']},  # Store unit once per type
                    "$push": {f"types.{row['type']}.records": {  # Push record under the corresponding type
                        "date": date_time,
                        "value": row['value']
                    }}
                },
                upsert=True  # Insert if not exists
            )
            
            bulk_operations.append(operation)

        # Execute bulk update for the chunk
        if bulk_operations:
            collection.bulk_write(bulk_operations)

    print("Bulk data insertion/update completed successfully.")


def fetch_recent_sensor_data(db_name, collection, uid):
    try:
        user_id = uid
        client = MongoClient(current_app.config['MONGO_URI'])
        db = client[db_name]
        collection = db[collection]

        user_data = collection.find_one({"user_id": user_id})

        # Check if user data is found
        if not user_data:
            return {'Error': 'No data found for the given user_id'}

        # Initialize an empty list to hold data for the DataFrame
        data = []

        # Iterate over each type and its records
        for type_name, type_data in user_data['types'].items():
            unit = type_data['unit']
            for record in type_data['records']:
                # Flatten the data, including the type, unit, date, and value
                data.append({
                    # 'user_id': user_id,
                    'type': type_name,
                    'unit': unit,
                    'date': record['date'],
                    'value': record['value']
                })

        # Convert the list of dictionaries into a DataFrame
        df_reconstructed = pd.DataFrame(data)

        # Ensure 'date' is in datetime format (in case it's stored as string)
        df_reconstructed['date'] = pd.to_datetime(df_reconstructed['date'])

        return df_reconstructed
    except Exception as e:
        return f"Error: {str(e)}"


# Function to insert a record only if the _id is not already present
def insert_activity_record(user_id, value, db_name, collection):
    client = MongoClient(current_app.config['MONGO_URI'])
    db = client[db_name]
    collection = db[collection]

    existing_record = collection.find_one({"_id": user_id})  # Check if record exists

    if existing_record:
        print(f"Record with _id {user_id} already exists. Skipping insertion.")
    else:
        try:
            collection.update_one(
                {"_id": user_id},  # Filter
                {
                    "$set": {"value": value},  # Set value
                    "$currentDate": {"date": True}  # Automatically set the current date
                },
                upsert=True  # Insert if not exists
            )
            print("Record inserted successfully!")
        except Exception as e:
            print("Error inserting record:", e)


def save_activity_score(fetch_df, db_name, collection, user_id):
    try:
        

        df_avg = fetch_df

        # Calculate normalized scores for each row
        df_avg['percentage_score'] = df_avg.apply(calculate_percentage_score, axis=1, margins=metrics_margins)

        df_normalized = df_avg.groupby(["type", "unit"], as_index=False)["percentage_score"].mean()
        df_normalized.loc[df_normalized["type"] == "OxygenSaturation", "percentage_score"] *= 100

        # Round max value to 100
        df_normalized["percentage_score"] = df_normalized["percentage_score"].clip(upper=100)

        min_val = 0
        max_val = 100

        # Apply fixed highest MinMaxScaler
        df_normalized["scaled_score"] = (df_normalized["percentage_score"] - min_val) / (max_val - min_val)

        # Calculate normalized scores for each row
        df_normalized['weighted_score'] = df_normalized.apply(calculate_weighted_score, axis=1, weights=weights)

        activity_score = df_normalized['weighted_score'].sum()
        activity_score = activity_score * 100
        
        insert_activity_record(user_id, activity_score, db_name, collection)
    except Exception as e:
        return f"Error: {str(e)}"

