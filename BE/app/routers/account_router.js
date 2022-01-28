const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.post('/login',accountController.login_account);
router.get('/detail/:id',accountController.get_accountbyid);
router.post('/add',accountController.add_account);
router.delete('/delete/:id',accountController.delete_accountbyid);
router.get('/',accountController.account);

module.exports = router;