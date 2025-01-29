const { getFinancialData } = require('../models/financialModel');

const fetchFinancialData = async (req, res) => {
    const { start, end } = req.query;
    console.log(`🔍 Filtering data from ${start} to ${end}`);
    
    try {
        const data = await getFinancialData(start, end);
        console.log("📊 Fetched data:", data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { fetchFinancialData };
