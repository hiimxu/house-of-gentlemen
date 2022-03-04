const express = require('express');
const router = express.Router();
const cors =require('cors');
const adminController =require('../controllers/admin.controller');
const accountController = require('../controllers/account.controller');
const salonOwnerController = require('../controllers/salonOwner.controller');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');

router.get('/getSalonAccount',cors(),accountController.getSalonAccount);
router.get('/getSalon/:id',validate.checkId(),cors(),salonOwnerController.getSalon);
router.put('/update/possibility/salon/:id',validate.setPossitiveSalonOwner(),cors(),salonOwnerController.setPossitiveSalonOwner);

module.exports = router;