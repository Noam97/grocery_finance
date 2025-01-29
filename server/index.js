const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => {
        console.log('Connected to NeonDB!');

        return client.query(`
            CREATE TABLE IF NOT EXISTS financial_data (
                id SERIAL PRIMARY KEY,
                date DATE NOT NULL,
                income DECIMAL(10,2) NOT NULL,
                outcome DECIMAL(10,2) NOT NULL,
                clear DECIMAL(10,2) GENERATED ALWAYS AS (income - outcome) STORED
            );
        `);
    })
    .then(() => {
        console.log('Table created or already exists!');
        
        return client.query(`
            INSERT INTO financial_data (date, income, outcome)
            VALUES
                ('2021-01-01', 1000.00, 400.00),
                ('2021-04-02', 1200.00, 500.00),
                ('2021-06-03', 1500.00, 600.00),
                ('2021-07-04', 1300.00, 450.00)
            ON CONFLICT DO NOTHING; 
        `);
    })
    .then(() => {
        console.log('Sample data inserted or already exists!');
    })
    .catch(err => {
        console.error('Error creating table or inserting data:', err.stack);
    });

    app.get('/api/data', async (req, res) => {
        const { start, end } = req.query;
        console.log(`Filtering data from ${start} to ${end}`);
        try {
          const result = await client.query(`
            SELECT DISTINCT date, income, outcome, clear
            FROM financial_data
            WHERE DATE(date) BETWEEN DATE '${start}' AND DATE '${end}'
            ORDER BY date;
          `);
          console.log('Fetched data:', result.rows); 
          res.json(result.rows); 
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
    
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

client.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
    } else {
        console.log('Connected to NeonDB! Current time:', res.rows[0].now);
    }
});
