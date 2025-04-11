const express = require("express");
const cors = require("cors");
const { addMeeting, addPlace, getPlaces } = require("./lib/db-operations");

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

app.get("/api/place", async (req, res) => {
    const result = await getPlaces();
    if (result.success) res.status(200).send(result);
    else res.status(500).send(result.error);
});

app.post("/api/place", async (req, res) => {
    const result = await addPlace(req.body);
    if (result.success) res.status(201).send(result);
    else res.status(409).send(result.error);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
