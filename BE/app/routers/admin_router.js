const express = require('express');
const router = express.Router();
const adminController =require('../controllers/admin.controller');


router.get('/getSalonAccount',adminController.getSalonAccount);
router.get('/getSalon/:id',adminController.getSalon);
router.put('/update/possibility/salon/:id',adminController.setPossitiveSalonOwner);

module.exports = router;