from pymongo import MongoClient
from flask import g, current_app

def init_db(app):
    mongo_uri = app.config.get("MONGO_URI")
    mongo_db_name = app.config.get("MONGO_DB")

    if not mongo_uri:
        raise RuntimeError("MONGO_URI is not set in app configuration.")
    if not mongo_db_name:
        raise RuntimeError("MONGO_DB_NAME is not set in app configuration.")

    client = MongoClient(mongo_uri)
    app.mongo_client = client
    app.db = client[mongo_db_name]

    # @app.teardown_appcontext
    # def close_db_client(exception):
    #     client = getattr(app, "mongo_client", None)
    #     if client is not None:
    #         client.close()