from flask import Flask
from config.config import config
import os

def create_app():
    app = Flask(__name__)
    
    # Load configuration based on environment
    env = os.getenv("FLASK_ENV", "default")
    print(f"Application running on {env} mode")
    app.config.from_object(config[env])

    return app