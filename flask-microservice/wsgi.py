import os
from app import create_app
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Create app instance
app = create_app()

if __name__ == "__main__":
    PORT = os.getenv("PORT", 5000)
    app.run(host='0.0.0.0', port=PORT)