const express  = require('express');
const invoice = require('./invoice.route');
const product = require('./product.route');


const router =  express.Router();
module.exports = router;

router.use('/invoice',invoice);
router.use('/product',product);


