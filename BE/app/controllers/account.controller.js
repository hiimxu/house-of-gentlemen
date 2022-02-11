var Account = require('../models/account.model');
var SalonOwner = require('../models/salonOwner.model');
var Customer = require('../models/customer.model');
var md5 = require('md5');


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
exports.change_password = function(req, res, next) {
    
    var new_pass = req.body.new_password;
    var md5_new_pass=md5(md5_new_pass);
    var old_pass = req.body.old_password;
    var md5_old_pass=md5(md5_old_pass);
    var acc = req.body.account_name;
    // res.json(acc +" "+ old_pass +" "+new_pass);

    var data = Account.checkPassword(acc,md5_old_pass,function(data) {
        if (data.length==1) {
            var data = Account.updatePasswordAccount(data[0].account_id,md5_new_pass, function (response) {
                res.json({ response });
            });
        } else {
            res.json("kiem tra lai old_password");
        }
    })
    
    
    
}
exports.login_account = function (req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;
    var md5_pass=md5(pass);
    var data = Account.getAccountToLogin(acc,md5_pass, function (data) {
        res.json({ data });
    });


}
exports.add_account = function (req, res, next) {
    var acc = req.body.account_name;
    var pass = req.body.password;
    var md5_pass=md5(pass);
    var rol = req.body.role;
    var save_data = { account_name: acc, password: md5_pass, role: rol }
    console.log("acc la:" + acc);
    var check = Account.checkAccount(save_data, function (data) {
        if (data.length == 1) {
            res.json("tai khoan da ton tai")
        }
        else {
            // data = Account.createAccount(save_data, function (data) {
            //     res.json({ data })
            // })
            if (rol=='salon') {
                data = Account.createAccount(save_data, function (data) {
                    // res.json("da tao account co role la salon voi accountId la"+data)
                    var accountId=data;
                    var nameSalon= req.body.nameSalon;
                    var phone= req.body.phone;
                    var possibility= req.body.possibility;
                    var taxCode= req.body.taxCode;
                    var save_salonOwner={accountId:accountId,nameSalon:nameSalon,phone:phone,possibility:possibility,taxCode:taxCode};
                    data = SalonOwner.createSalonOwner(save_salonOwner, function (data) {
                        res.json(data);
    
                    })

                })
            }else{
                data = Account.createAccount(save_data, function (data) {
                    var accountId=data;
                    var phone= req.body.phone;
                    var address=req.body.address;
                    var birthday = req.body.birthday;//1993/03/30  yyyy/mm/dd
                    var nameCustomer=req.body.nameCustomer;
                    var save_customer={accountId:accountId,nameCustomer:nameCustomer,phone:phone,address:address,birthday:birthday}
                    data = Customer.createCustomer(save_customer, function (data) {
                        res.json(data);
    
                    })
                })

            }

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