const express = require('express');
const router = express.Router();
const cors =require('cors');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const accountController = require('../controllers/account.controller');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');

router.post('/login',validate.validateLogin(),cors(),accountController.login_account);
router.get('/detail/:id',param('id').not().isEmpty().isInt(),cors(),accountController.get_accountbyid);
router.post('/add/customer',validate.validateCreateAccountCustomer(),cors(),accountController.add_account_customer);
router.post('/add/salon',validate.validateCreateAccountSalon(),cors(),accountController.add_account_salon);
router.delete('/delete/:id',cors(),accountController.delete_accountbyid);
router.post('/changePassword',validate.change_password(),cors(),accountController.change_password);
router.get('/',cors(),accountController.account);
router.put('/forgotPassword',validate.forgotPassword(),cors(),accountController.forgotPassword);
router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
module.exports = router;