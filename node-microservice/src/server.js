const express = require("express");
const config = require("./config");

const app = express();
app.use(express.json());

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
