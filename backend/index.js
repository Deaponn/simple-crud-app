const express = require("express");
const cors = require("cors");
const {
    addMeeting,
    addPlace,
    getPlaces,
    getPlace,
    addForecast,
    getMeetings,
    updateMeeting,
    deleteMeeting,
} = require("./lib/db-operations");
const { fetchForecast } = require("./lib/api-requests");

const {
    parsed: { FORECAST_API_KEY },
} = require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/meeting", async (req, res) => {
    const pageNumber = req.query.page ?? 0;
    const perPage = req.query.perPage ?? 5;
    const sortBy = req.query.sortBy ?? "time";
    const orderBy = req.query.orderBy ?? "DESC";

    const response = await getMeetings(pageNumber, perPage, sortBy, orderBy);

    res.status(200).send(response);
});

// TODO: validate user input
app.post("/api/meeting", async (req, res) => {
    const { title, description, placeId, time } = req.body;

    const place = await getPlace(placeId);
    if (!place.success) return res.status(400).send(place);

    const forecast = await fetchForecast(place.name, place.country, time, FORECAST_API_KEY);
    const { id: forecastId } = await addForecast(place.id, forecast);
    const { id: meetingId } = await addMeeting(title, description, time, placeId, forecastId);

    res.status(201).send({ success: true, meetingId });
});

app.patch("/api/meeting", async (req, res) => {
    const { id, title, description, time, placeId } = req.body;
    const response = await updateMeeting(id, title, description, time, placeId);
    res.status(200).send(response);
});

app.delete("/api/meeting", async (req, res) => {
    const response = deleteMeeting(req.body.meetingId);
    res.status(200).send(response);
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
