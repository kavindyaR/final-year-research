import os
from werkzeug.utils import secure_filename
from flask import current_app

ALLOWED_EXTENSIONS = {'xml', 'csv'}


# Check if the file has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Securely saves an uploaded file to a temporary directory
def secure_file_save(file):
    filename = secure_filename(file.filename)
    temp_dir = current_app.config['TEMP_UPLOAD_DIR']
    file_path = os.path.join(temp_dir, filename)
    file.save(file_path)
    return file_path
