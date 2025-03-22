from flask import Blueprint, jsonify, request

default_bp = Blueprint("default", __name__, url_prefix="/api/data")

@default_bp.route("/", methods=["GET"])
def get_users():
    # return jsonify({"message": "Hello World"})
    return "Hello, It's me, Flask!"