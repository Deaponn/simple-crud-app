const express = require("express");
const db = require("./db-setup.js");

const {
    parsed: { FORECAST_API_KEY, EXCHANGE_API_KEY },
} = require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
