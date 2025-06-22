const express = require("express");
const cors = require("cors");
const config = require("./config");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sensorDataRoutes = require("./routes/sensorDataRoutes");
const healthMetricsRoutes = require("./routes/healthMetricsRoutes");

// Connecting to MongoDB
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000", "http://localhost"];

// Enable CORS for your frontend origin
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }, // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("APIs for User Microservice are Up and Running.");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/sensor-data", sensorDataRoutes);
app.use("/api/health-metrics", healthMetricsRoutes);

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
