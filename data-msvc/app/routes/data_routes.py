from flask import Blueprint, request, jsonify, current_app
from app.services import handle_file_upload

file_api_bp = Blueprint("default", __name__, url_prefix="/api/data")

@file_api_bp.route("/upload", methods=["POST"])
def upload_file():
    # return jsonify({"message": "Hello World"})
    return handle_file_upload(request)