import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "http://localhost:27017/fake-uri")
    DEBUG = False
    MAX_CONTENT_LENGTH = 150 * 1024 * 1024  # 150MB limit
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    TEMP_UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')  # Temporary directory

    # Ensure upload directory exists
    if not os.path.exists(TEMP_UPLOAD_DIR):
        os.makedirs(TEMP_UPLOAD_DIR, exist_ok=True)


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
