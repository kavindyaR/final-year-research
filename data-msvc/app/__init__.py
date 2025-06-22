import os
from flask import Flask
from flask_cors import CORS
from config import config
from .db import init_db
from app.routes import default_bp
from app.routes import file_api_bp

def create_app():
    app = Flask(__name__)
    
    # Allow all domains (CORS for all routes)
    CORS(app, supports_credentials=True)

    # Load configuration based on environment
    env = os.getenv("FLASK_ENV", "default")
    print(f"Application running on {env} mode\n")
    app.config.from_object(config[env])

    # print(f"Mongo URI: {app.config['MONGO_URI']}")

    init_db(app)

    # Register routes
    app.register_blueprint(default_bp)
    app.register_blueprint(file_api_bp)

    return app