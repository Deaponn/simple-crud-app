const express = require("express");
const cors = require("cors");
const { addMeeting, addPlace, getPlaces, getPlace, addForecast } = require("./lib/db-operations");
const { fetchForecast } = require("./lib/api-requests");

const {
    parsed: { FORECAST_API_KEY, EXCHANGE_API_KEY },
} = require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// TODO: validate user input
app.post("/api/meeting", async (req, res) => {
    const { title, description, place_id, time } = req.body;

    const place = await getPlace(place_id);
    if (!place.success) return res.status(400).send(place);

    const forecast = await fetchForecast(place.name, place.country, time, FORECAST_API_KEY);
    const { id: forecastId } = await addForecast(place.id, time, forecast);
    const { id: meetingId } = await addMeeting(title, description, time, place_id, forecastId);

    res.status(201).send({ success: true, meetingId });
});

app.get("/api/place", async (req, res) => {
    const result = await getPlaces();
    if (result.success) res.status(200).send(result);
    else res.status(500).send(result.error);
});

// TODO: validate user input
app.post("/api/place", async (req, res) => {
    const result = await addPlace(req.body);
    if (result.success) res.status(201).send(result);
    else res.status(409).send(result.error);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
