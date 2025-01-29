const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const initializeDatabase = require('./db/initDB');
const financialRoutes = require('./routes/financialRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.use('/api', financialRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});