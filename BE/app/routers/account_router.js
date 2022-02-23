const express = require('express');
const router = express.Router();
const cors =require('cors');
const accountController = require('../controllers/account.controller');

router.post('/login',cors(),accountController.login_account);
router.get('/detail/:id',cors(),accountController.get_accountbyid);
router.post('/add',cors(),accountController.add_account);
router.delete('/delete/:id',cors(),accountController.delete_accountbyid);
router.post('/changePassword',cors(),accountController.change_password);
router.get('/',cors(),accountController.account);

module.exports = router;