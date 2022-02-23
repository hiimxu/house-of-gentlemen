const express = require('express');
const router = express.Router();
const cors =require('cors');
const adminController =require('../controllers/admin.controller');
const accountController = require('../controllers/account.controller');
const salonOwnerController = require('../controllers/salonOwner.controller');

router.get('/getSalonAccount',cors(),accountController.getSalonAccount);
router.get('/getSalon/:id',cors(),salonOwnerController.getSalon);
router.put('/update/possibility/salon/:id',cors(),salonOwnerController.setPossitiveSalonOwner);

module.exports = router;