const express = require('express');
const router = express.Router();
const customerController =require('../controllers/customer.controller');

router.get('/',customerController.getAllCustomer);
router.get('/profile/:id',customerController.getCustomerProfile);
router.put('/update/profile/:id',customerController.updateCustomerProfile);
router.get('/statusRegisterService',customerController.getStatusRegisterService);
router.get('/statusRegisterServiceById/:id',customerController.getStatusRegisterServiceById);
router.get('/registerService/:id',customerController.getRegisterServiceById);

module.exports = router;