const express = require('express');
const router = express.Router();
const customerController =require('../controllers/customer.controller');

router.get('/',customerController.getAllCustomer);

module.exports = router;