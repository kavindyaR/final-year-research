import os
from flask import Flask
from config.config import config
from app.routes.default_routes import default_bp

def create_app():
    app = Flask(__name__)
    
    # Load configuration based on environment
    env = os.getenv("FLASK_ENV", "default")
    print(f"Application running on {env} mode")
    app.config.from_object(config[env])

    # Register routes
    app.register_blueprint(default_bp)

    return app