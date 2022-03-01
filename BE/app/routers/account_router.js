const express = require('express');
const router = express.Router();
const cors =require('cors');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const accountController = require('../controllers/account.controller');
const validate = require('../common/valiator');

router.post('/login',validate.validateLogin(),cors(),accountController.login_account);
router.get('/detail/:id',param('id').not().isEmpty().isInt(),cors(),accountController.get_accountbyid);
router.post('/add',validate.validateCreateAccountCustomer(),cors(),accountController.add_account);
router.delete('/delete/:id',cors(),accountController.delete_accountbyid);
router.post('/changePassword',cors(),accountController.change_password);
router.get('/',cors(),accountController.account);
router.put('/forgotPassword',cors(),accountController.forgotPassword);
router.post('/sendEmail',cors(),accountController.sendEmail);
module.exports = router;