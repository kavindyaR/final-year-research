from datetime import datetime
from flask import current_app
from pymongo import MongoClient, UpdateOne

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