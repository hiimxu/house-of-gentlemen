const express = require('express');
const router = express.Router();
const salonOwnerController = require('../controllers/salon_owner.controller');
router.get('/',salonOwnerController.salonOwner);

module.exports = router;