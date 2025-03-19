const express = require("express");
const cors = require("cors");
const config = require("./config");
const connectDB = require("./config/db");

// Routes
const biometricRoutes = require("./routes/biometricRoutes");
const sensorDataRoutes = require("./routes/sensorDataRoutes");

connectDB();

const app = express();
app.use(express.json());

// Enable CORS for your frontend origin
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use("/api/bio-data", biometricRoutes);
app.use("/api/sensor-data", sensorDataRoutes);

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
