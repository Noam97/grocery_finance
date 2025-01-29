const client = require('./connection');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS financial_data (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    income DECIMAL(10,2) NOT NULL,
    outcome DECIMAL(10,2) NOT NULL,
    clear DECIMAL(10,2) GENERATED ALWAYS AS (income - outcome) STORED
);
`;

const insertSampleData = `
INSERT INTO financial_data (date, income, outcome)
VALUES
    ('2021-01-01', 1000.00, 400.00),
    ('2021-04-02', 1200.00, 500.00),
    ('2021-06-03', 1500.00, 600.00),
    ('2021-07-04', 1300.00, 450.00)
ON CONFLICT (date) DO NOTHING;
`;

const initializeDatabase = async () => {
    try {
        await client.query(createTableQuery);
        console.log("Table created or already exists.");

        const { rows } = await client.query("SELECT COUNT(*) FROM financial_data;");
        if (parseInt(rows[0].count, 10) === 0) {
            await client.query(insertSampleData);
            console.log("Sample data inserted.");
        } else {
            console.log("Sample data already exists.");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

module.exports = initializeDatabase;
