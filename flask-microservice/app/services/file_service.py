import os
from flask import current_app, jsonify
from app.utils import allowed_file, secure_file_save

# Bytes conversion
def bytes_to_megabytes(bytes_value):
    return round(bytes_value / (1024 * 1024), 2)


# Simulated function to process the uploaded file
def process_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    file_size = bytes_to_megabytes(os.path.getsize(file_path))
    return {"file_size": f"{file_size} MB", "preview": content[:100]}


# Handles file upload and processing logic
def handle_file_upload(request):
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    # return jsonify({'File Name': file.filename}), 200
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        file_path = secure_file_save(file)

        try:
            # Perform the required task
            result = process_file(file_path)

            # Delete the file after processing
            os.remove(file_path)

            return jsonify({'message': 'File processed successfully', 'result': result}), 200
        except Exception as e:
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400