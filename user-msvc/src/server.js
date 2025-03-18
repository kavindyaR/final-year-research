const express = require("express");
const config = require("./config");
const connectDB = require("./config/db");

// Routes
const biometricRoutes = require("./routes/biometricRoutes");
const sensorDataRoutes = require("./routes/sensorDataRoutes");

connectDB();

const app = express();
app.use(express.json());

app.use("/api/bio-data", biometricRoutes);
app.use("/api/sensor-data", sensorDataRoutes);

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
