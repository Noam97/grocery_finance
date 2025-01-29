const client = require('../db/connection');

const getFinancialData = async (start, end) => {
    try {
        const result = await client.query(`
            SELECT  
            TO_CHAR(date, 'YYYY-MM-DD') AS date,  
            income, outcome, clear
            FROM financial_data
            WHERE DATE(date) BETWEEN DATE '${start}' AND DATE '${end}'
            ORDER BY date;
        `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching financial data:", error);
        throw error;
    }
};

module.exports = { getFinancialData };
