import os

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "http://localhost:27017/fake-uri")
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
