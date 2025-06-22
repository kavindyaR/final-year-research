import os
from flask import jsonify, current_app
from app.utils import allowed_file, secure_file_save
from .data_preprocess import preprocess_health_data
from .db_operation import save_data_to_mongo, fetch_recent_sensor_data, save_activity_score


# Handle file upload
def handle_file_upload(request):
    user_id = request.args.get('userId')
    # print(f"user_id: {user_id}")

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    if 'file' not in request.files:
        return jsonify({'error': 'Valid request key required'}), 400

    uploaded_file = request.files['file']
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if uploaded_file and allowed_file(uploaded_file.filename):
        # return jsonify({'message': f"File '{uploaded_file.filename}' uploaded successfully"}), 200
        file_path = secure_file_save(uploaded_file)
    
        try:
            df = preprocess_health_data(file_path)
            save_data_to_mongo(df, "sensordata", user_id)

            # Delete the file after processing
            os.remove(file_path)

            fetched_df = fetch_recent_sensor_data("sensordata", user_id)
            save_activity_score(fetched_df, "activityscore", user_id)

            return jsonify({'message': 'Activity score calculated successfully'}), 200
        except Exception as e:
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({'error': str(e)}), 500
        
    return jsonify({'error': 'Invalid file type'}), 400


# -----------------------------------------------------------------------------------------------------

# USER_ID = "6846e1a4cc0447d63f58abfd"

# db = current_app.db
# collection = db["healthmetrics"]

# user_health_metrics = collection.find_one({"_id": USER_ID}, {"__v": 0})

# print(user["_id"])

# return jsonify({'user': f"{user["margins"]}"}), 200