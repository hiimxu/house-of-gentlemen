const express = require('express');
const router = express.Router();
const adminController =require('../controllers/admin.controller');
const accountController = require('../controllers/account.controller');
const salonOwnerController = require('../controllers/salonOwner.controller')


router.get('/getSalonAccount',accountController.getSalonAccount);
router.get('/getSalon/:id',salonOwnerController.getSalon);
router.put('/update/possibility/salon/:id',salonOwnerController.setPossitiveSalonOwner);

module.exports = router;