const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.get('/account',accountController.account);
router.get('/account/detail/:id',accountController.get_accountbyid);
router.post('/account/add',accountController.add_account);
router.delete('/account/delete/:id',accountController.delete_accountbyid);

module.exports = router;