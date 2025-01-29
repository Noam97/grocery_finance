const { getFinancialData } = require('../models/financialModel');

const fetchFinancialData = async (req, res) => {
    const { start, end } = req.query;
    
    try {
        const data = await getFinancialData(start, end);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { fetchFinancialData };
