const express = require('express');
const { fetchFinancialData } = require('../controllers/financialController');

const router = express.Router();

router.get('/data', fetchFinancialData);

module.exports = router;
