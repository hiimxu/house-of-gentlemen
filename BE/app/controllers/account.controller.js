var Account = require('../models/account.model');

exports.account = function (req, res, next) {
    Account.getAll(function (data) {
        res.json({ result: data });
    });
}
exports.get_accountbyid = function (req, res, next) {
    var id = req.params.id;
    var data = Account.getAccountById(id, function (data) {
        res.json({ data });
    });


}
exports.login_account = function (req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;
    var data = Account.getAccountToLogin(acc,pass, function (data) {
        res.json({ data });
    });


}
exports.add_account = function (req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;
    var rol = req.body.role;
    var save_data = { account_name: acc, password: pass, role: rol }
    console.log("acc la:" + acc);
    var check = Account.checkAccount(save_data, function (data) {
        if (data.length == 1) {
            res.json("tai khoan da ton tai")
        }
        else {
            data = Account.createAccount(save_data, function (data) {
                res.json({ data })
            })

        }

    })


}
exports.delete_accountbyid = function (req, res, next) {
    var id = req.params.id;
    Account.removeAccount
        (id, function (response) {
            res.json(response);
        })
}