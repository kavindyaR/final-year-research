from flask import current_app
from datetime import datetime
from pymongo import MongoClient, UpdateOne
import pandas as pd
from app.utils import calculate_percentage_score, calculate_weighted_score

def save_data_to_mongo(dataframe, collection, user_id):
    db = current_app.db
    collection = db[collection]

    # Remove existing document(s) with the same user_id BEFORE inserting new records
    collection.delete_many({"user_id": user_id})

    CHUNK_SIZE = 100  

    try:
        for i in range(0, len(dataframe), CHUNK_SIZE):
            chunk = dataframe.iloc[i:i + CHUNK_SIZE]
            bulk_operations = []

            for _, row in chunk.iterrows():
                type_name = row['type']
                unit = row['unit']
                value = row['value']
                date_time = datetime.combine(row['date'], datetime.min.time())
                record = {"date": date_time, "value": value}

                # First: Try to update existing type within the same user document
                bulk_operations.append(UpdateOne(
                    {
                        "user_id": user_id,
                        "types.type": type_name
                    },
                    {
                        "$set": {
                            "types.$.unit": unit
                        },
                        "$push": {
                            "types.$.records": record
                        }
                    }
                ))

                # Second: If type doesn't exist at all, push a new type block (only if user document exists)
                bulk_operations.append(UpdateOne(
                    {
                        "user_id": user_id,
                        "types.type": { "$ne": type_name }
                    },
                    {
                        "$push": {
                            "types": {
                                "type": type_name,
                                "unit": unit,
                                "records": [record]
                            }
                        }
                    }
                ))

                # Third: If user document doesn't exist at all, create it with the type
                bulk_operations.append(UpdateOne(
                    {
                        "user_id": user_id
                    },
                    {
                        "$setOnInsert": {
                            "user_id": user_id,
                            "types": [{
                                "type": type_name,
                                "unit": unit,
                                "records": [record]
                            }]
                        }
                    },
                    upsert=True
                ))

            if bulk_operations:
                collection.bulk_write(bulk_operations)

        print("Bulk data insertion/update completed successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")



def fetch_recent_sensor_data(collection, user_id):
    db = current_app.db
    collection = db[collection]

    try:
        # Find the user document
        user_data = collection.find_one({"user_id": user_id})
        
        if not user_data:
            print(f"No data found for user {user_id}")
            return pd.DataFrame()
        
        # Initialize lists to store DataFrame columns
        types = []
        units = []
        values = []
        dates = []
        
        # Extract data from MongoDB document
        for type_data in user_data.get('types', []):
            type_name = type_data['type']
            unit = type_data['unit']
            
            for record in type_data['records']:
                types.append(type_name)
                units.append(unit)
                values.append(record['value'])
                dates.append(record['date'])
        
        # Create DataFrame
        df = pd.DataFrame({
            'type': types,
            'unit': units,
            'value': values,
            'date': dates
        })
        
        # Convert date to datetime if it's not already
        if not pd.api.types.is_datetime64_any_dtype(df['date']):
            df['date'] = pd.to_datetime(df['date'])
        
        print(f"Successfully fetched data for user {user_id}")
        return df
    
    except Exception as e:
        print(f"An error occurred while fetching data: {e}")
        return pd.DataFrame()



def insert_activity_record(collection, user_id, score):
    db = current_app.db
    collection = db[collection]
    userdata_collection = db["userdatas"]

    # Determine activity level based on score
    if score >= 80:
        activity_level = "High"
    elif score >= 60:
        activity_level = "Moderate"
    elif score >= 40:
        activity_level = "Light"
    elif score > 0:
        activity_level = "Low"
    else:
        activity_level = ""

    # Remove existing document(s) with the same user_id BEFORE inserting new records
    collection.delete_one({"_id": user_id})

    existing_record = collection.find_one({"_id": user_id})  # Check if record exists

    if existing_record:
        print(f"Record with _id {user_id} already exists. Skipping insertion.")
    else:
        try:
            collection.update_one(
                {"_id": user_id},  # Filter
                {
                    "$set": {"value": score},  # Set value
                    "$currentDate": {"date": True}  # Automatically set the current date
                },
                upsert=True  # Insert if not exists
            )
            print("Activity score inserted successfully!")

            userdata_collection.update_one(
                {"userId": user_id},
                {"$set": {"activity_level": activity_level}}
            )
            print("User activity level updated successfully!")
            # print(user_id, activity_level)
            # temp = userdata_collection.find_one({"userId": user_id})
            # print(temp)
        except Exception as e:
            print("Error inserting record:", e)



def save_activity_score(fetched_df, collection, user_id):
    db = current_app.db
    db_col = db["healthmetrics"]

    try:
        user_health_metrics = db_col.find_one({"_id": user_id}, {"__v": 0})

        if not user_health_metrics:
            raise RuntimeError("Health metrics are not available")

        metrics_margins = user_health_metrics["margins"]
        metrics_weights = user_health_metrics["weights"]

        # Calculate normalized scores for each row
        fetched_df['percentage_score'] = fetched_df.apply(calculate_percentage_score, axis=1, margins=metrics_margins)

        df_normalized = fetched_df.groupby(["type", "unit"], as_index=False)["percentage_score"].mean()
        # df_normalized.loc[df_normalized["type"] == "OxygenSaturation", "percentage_score"] *= 100

        # Round max value to 100
        df_normalized["percentage_score"] = df_normalized["percentage_score"].clip(upper=100)

        min_val = 0
        max_val = 100

        # Apply fixed highest MinMaxScaler
        df_normalized["scaled_score"] = (df_normalized["percentage_score"] - min_val) / (max_val - min_val)

        # Calculate normalized scores for each row
        df_normalized['weighted_score'] = df_normalized.apply(calculate_weighted_score, axis=1, weights=metrics_weights)

        activity_score = df_normalized['weighted_score'].sum()
        activity_score = activity_score * 100

        insert_activity_record(collection, user_id, activity_score)
    
    except Exception as e:
        return f"Error: {str(e)}"

    
