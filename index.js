const express = require("express");

const {
    parsed: { FORECAST_API_KEY, EXCHANGE_API_KEY, DATABASE_URL, DATABASE_NAME },
} = require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
