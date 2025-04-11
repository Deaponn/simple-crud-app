const db = require("./db-setup.js");

const addMeeting = ({
    meetingData: { title, description, time },
    place: { name, country },
    forecast,
}) => {
    console.log(meetingData, placeId, forecast);
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

module.exports = {
    addMeeting,
    getPlaces,
    addPlace,
};
