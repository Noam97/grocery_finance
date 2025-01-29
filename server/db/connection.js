const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log("Connected to NeonDB!"))
    .catch(err => console.error("Database connection failed:", err.stack));

module.exports = client;
