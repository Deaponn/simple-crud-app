const express = require("express");
const db = require("./lib/db-setup.js");
const cors = require("cors");

const {
    parsed: { FORECAST_API_KEY, EXCHANGE_API_KEY },
} = require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/meeting", (req, res) => {
    console.log(req.body);
    res.status(201).send({ success: true });
});

app.post("/api/place", (req, res) => {
    console.log(req.body);
    res.status(201).send({ success: true });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
