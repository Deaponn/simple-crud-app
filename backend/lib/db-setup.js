const pgp = require("pg-promise")();
const {
    parsed: { DATABASE_URL, DATABASE_NAME },
} = require("dotenv").config();
const { readFile } = require("node:fs/promises");

const setup = async (db) => {
    try {
        const c = await db.connect(); // try to connect
        c.done(); // success, release connection
        console.log("Database exists");
        const _ = await db.none("SELECT 1 FROM meetings");
        console.log("Tables and relations are all set up correctly.");
    } catch (e) {
        if (e.code === "3D000")
            console.log(`
            Database does not exist, you need to manually create a database called '${DATABASE_NAME}'.
            You can change name of the database to use in .env file.
        `);
        else if (e.code === "42P01") {
            console.log("Setting up all required tables and relations");
            const query = await readFile("./db-setup-query.sql", { encoding: "utf-8" });
            const _ = await db.none(query);
            console.log("Created all tables and relations successfully");
        } else 
            console.log(`
            Unknown error was thrown.
            Error code: ${e.code}.
            Error message: ${e.message}.
            Erroneous query: ${e.query}.
        `);
        
    }
};

const db = pgp(`${DATABASE_URL}/${DATABASE_NAME}`);
setup(db);

module.exports = db;
