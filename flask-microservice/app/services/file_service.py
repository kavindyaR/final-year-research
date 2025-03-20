import os
from flask import current_app, jsonify
from app.utils.file_util import allowed_file, secure_file_save

def process_file(file_path):
    """Simulated function to process the uploaded file."""
    with open(file_path, 'r') as f:
        content = f.read()
    return {"file_size": os.path.getsize(file_path), "preview": content[:100]}

def handle_file_upload(request):
    """Handles file upload and processing logic."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        file_path = secure_file_save(file)

        try:
            # Perform the required task
            result = process_file(file_path)

            # Delete the file after processing
            # os.remove(file_path)

            return jsonify({'message': 'File processed successfully', 'result': result}), 200
        except Exception as e:
            if os.path.exists(file_path):
                os.remove(file_path)
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400