const db = require("./db-setup.js");

const addMeeting = async (title, description, time, placeId, forecastId) => {
    const meetingId = await db.one(`
        INSERT INTO meetings(title, description, place_id, forecast_id, time)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id;
    `, [title, description, placeId, forecastId, time]);

    return meetingId;
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

const addForecast = async (placeId, datetime, forecast) => {
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
            time,
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id
    `,
        [
            placeId,
            datetime,
            temp_c,
            feelslike_c,
            will_it_rain == 1,
            chance_of_rain,
            wind_kph,
            pressure_mb,
            co,
            no2,
            pm2_5,
            pm10,
        ]
    );

    return forecastId;
};

module.exports = {
    addMeeting,
    getPlace,
    getPlaces,
    addPlace,
    addForecast,
};
