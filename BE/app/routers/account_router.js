const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.get('/api/account',accountController.account);
router.get('/api/account/detail/:id',accountController.get_accountbyid);
router.post('/api/account/add',accountController.add_account);
router.delete('/api/account/delete/:id',accountController.delete_accountbyid);

module.exports = router;