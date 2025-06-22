# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

import os
from app import create_app


# Create app instance
app = create_app()

if __name__ == "__main__":
    PORT = os.getenv("PORT", 8000)
    app.run(host='0.0.0.0', port=PORT)