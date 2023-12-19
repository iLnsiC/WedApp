// INIT express app
const express = require("express");
const app = express();
const routes = require("./routes/index.routes");

const db = require("./config/db");


// Make req readable
app.use(express.json());

// CrossOrigine
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/", routes);

module.exports = app;