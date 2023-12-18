const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
mongoose
    .connect(
        `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PSW}@wedapp.y1re03c.mongodb.net/`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("Failed to connect to DB " + err));