const db = require("./db-setup.js");

const roundToNDigits = (num, d) => Math.round(num * 10 ** d) / 10 ** d;

const whitelistedColumns = ["id", "title", "time", "name", "country_name"];

const getMeetings = async (pageNumber, perPage, sortByColumn, orderBy) => {
    const order = orderBy == "ASC" ? "ASC" : "DESC";
    const sortBy = whitelistedColumns.includes(sortByColumn) ? sortByColumn : "id";

    return {
        success: true,
        meetings: await db.manyOrNone(
            `
            SELECT
                m.id, m.title, m.description, m.time,
                p.name, p.id AS place_id,
                c.name AS country_name,
                f.temperature, f.temperature_feelslike, f.will_rain, f.rain_chance,
                f.wind_speed, f.pressure, f.aq_co, f.aq_no2, f.aq_pm2_5, f.aq_pm10
            FROM meetings AS m
            INNER JOIN places AS p ON m.place_id = p.id
            INNER JOIN countries AS c ON p.country_id = c.id
            INNER JOIN forecasts AS f ON m.forecast_id = f.id
            ORDER BY ${sortBy} ${order}
            LIMIT $1
            OFFSET $2
        `,
            [perPage, pageNumber * perPage]
        ),
    };
};

const addMeeting = async (title, description, time, placeId, forecastId) => {
    const meetingId = await db.one(
        `
        INSERT INTO meetings(title, description, place_id, forecast_id, time)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id;
    `,
        [title, description, placeId, forecastId, time]
    );

    return meetingId;
};

// TODO: update forecast aswell
const updateMeeting = async (id, title, description, time, placeId) => {
    await db.none(
        `
        UPDATE meetings 
        SET title = $1, description = $2, place_id = $3, time = $4
        WHERE meetings.id = $5
    `,
        [title, description, placeId, time, id]
    );

    return { success: true };
};

const deleteMeeting = async (id) => {
    await db.none(
        `
        DELETE FROM meetings
        WHERE meetings.id = $1
    `,
        [id]
    );

    return { success: true };
};

const getPlaces = async () => {
    return {
        success: true,
        places: await db.manyOrNone(`
            SELECT p.id, p.name, c.name AS country
            FROM places AS p
            INNER JOIN countries AS c ON p.country_id = c.id
    `),
    };
};

const getPlace = async (placeId) => {
    const place = await db.oneOrNone(
        `
            SELECT p.id, p.name, c.name AS country
            FROM places AS p
            INNER JOIN countries AS c ON p.country_id = c.id
            WHERE p.id = $1
    `,
        [placeId]
    );

    if (place == null) return { success: false, error: "Place not found" };
    return { success: true, ...place };
};

// TODO: do it using transactions
const addPlace = async ({ name, country }) => {
    let countryId = await db.oneOrNone("SELECT id FROM countries WHERE name = $1", [country]);

    if (countryId == null) {
        ({ id: countryId } = await db.one("INSERT INTO countries(name) VALUES($1) RETURNING id", [
            country,
        ]));
    } else countryId = countryId.id;

    const place = await db.oneOrNone("SELECT 1 FROM places WHERE name = $1 AND country_id = $2", [
        name,
        countryId,
    ]);

    if (place == null) {
        const { id } = await db.one(
            "INSERT INTO places(name, country_id) VALUES ($1, $2) RETURNING id",
            [name, countryId]
        );

        return { success: true, newPlaceId: id };
    }

    return { success: false, error: "Place already exists" };
};

const addForecast = async (placeId, forecast) => {
    const {
        temp_c,
        feelslike_c,
        will_it_rain,
        chance_of_rain,
        wind_kph,
        pressure_mb,
        co,
        no2,
        pm2_5,
        pm10,
    } = forecast;

    const forecastId = await db.one(
        `
        INSERT INTO forecasts(
            place_id,
            temperature,
            temperature_feelslike,
            will_rain,
            rain_chance,
            wind_speed,
            pressure,
            aq_co,
            aq_no2,
            aq_pm2_5,
            aq_pm10
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
    `,
        [
            placeId,
            roundToNDigits(temp_c, 2),
            roundToNDigits(feelslike_c, 2),
            will_it_rain == 1,
            roundToNDigits(chance_of_rain, 1),
            roundToNDigits(wind_kph, 1),
            roundToNDigits(pressure_mb, 1),
            roundToNDigits(co, 2),
            roundToNDigits(no2, 3),
            roundToNDigits(pm2_5, 3),
            roundToNDigits(pm10, 2),
        ]
    );

    return forecastId;
};

module.exports = {
    getMeetings,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    getPlace,
    getPlaces,
    addPlace,
    addForecast,
};
