const express = require("express");
const config = require("./config");
const connectDB = require("./config/db");

// Routes
const biometricRoutes = require("./routes/biometricRoutes");

connectDB();

const app = express();
app.use(express.json());

app.use("/api/bio-data", biometricRoutes);

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
