const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api/employees", employeeRoutes);

app.use(errorHandler);

module.exports = app;
