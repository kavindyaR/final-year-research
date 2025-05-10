const express = require("express");
const config = require("./config");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Connecting to MongoDB
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
