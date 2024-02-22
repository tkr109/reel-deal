const express = require('express');
const { handlePayment } = require('../controller/stripe');
const router = express.Router();

router.post('/create-checkout-session',handlePayment);

module.exports = router;