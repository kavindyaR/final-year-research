require("dotenv").config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (!config.MONGO_URI || !config.JWT_SECRET) {
  console.error(
    "Missing critical environment variables! Check your .env or secrets manager."
  );
  process.exit(1);
}

module.exports = config;
