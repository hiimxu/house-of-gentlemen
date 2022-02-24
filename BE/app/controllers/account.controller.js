var Account = require('../models/account.model');
var SalonOwner = require('../models/salonOwner.model');
var Customer = require('../models/customer.model');
var md5 = require('md5');


exports.account = function (req, res, next) {
    try {
        Account.getAll(function (data) {
            if (data == null) {
                res.json({message:"get account fail",data:data});
            } else {
                res.json({message:"get account success" ,data: data });
            }
        });
    } catch (error) {
        res.json({message:"get account fail",data:error});
    }
}
exports.get_accountbyid = function (req, res, next) {
    var id = req.params.id;
    try {
        var data = Account.getAccountById(id, function (data) {
            if (data== null) {
                res.json({message:"get account failed" ,data: data }); 
            } else {
                res.json({message:"get account success" ,data: data });   
            }
           
        });
    } catch (error) {
        res.json({message:"get account fail",data:error});
    }
}
exports.change_password = function (req, res, next) {
    var new_pass = req.body.new_password;
    var md5_new_pass = md5(md5_new_pass);
    var old_pass = req.body.old_password;
    var md5_old_pass = md5(md5_old_pass);
    var acc = req.body.account_name;
    // res.json(acc +" "+ old_pass +" "+new_pass);

    try {
        var data = Account.checkPassword(acc, md5_old_pass, function (data) {
            if (data.length == 1) {
                var data = Account.updatePasswordAccount(data[0].account_id, md5_new_pass, function (response) {
                    res.json(response);
                });
            } else {
                res.json({message:"kiem tra lai old_password",data:"kiem tra lai old_password"});
            }
        })
    } catch (error) {
        res.json({message:"kiem tra lai old_password",data:error});
    }
}
exports.login_account = function (req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;
    var md5_pass = md5(pass);
    try {
        var data = Account.getAccountToLogin(acc, md5_pass, function (data) {
           if (data== null) {
            res.json({data: data,message:"login failed" }); 
           } else {
            res.json({data: data,message:"login successed" });
           }
            
        });
    } catch (error) {
        res.json({data:error,message:"login failed"});
    }
}
exports.add_account = function (req, res, next) {
    var acc = req.body.account_name;
    var pass = req.body.password;
    var md5_pass = md5(pass);
    var rol = req.body.role;
    var save_data = { account_name: acc, password: md5_pass, role: rol }
    
   try {
    var check = Account.checkAccount(save_data, function (data) {
        if (data.length == 1) {
            res.json({data:"tai khoan da ton tai",message:"tai khoan da ton tai"});
        }
        else {
            if (rol == 'salon') {
                data = Account.createAccount(save_data, function (data) {
                    var accountId = data;
                    var nameSalon = req.body.nameSalon;
                    var phone = req.body.phone;
                    var possibility = req.body.possibility;
                    var taxCode = req.body.taxCode;
                    var save_salonOwner = { accountId: accountId, nameSalon: nameSalon, phone: phone, possibility: possibility, taxCode: taxCode };
                    data = SalonOwner.createSalonOwner(save_salonOwner, function (data) {
                        if (data  == null) {
                            res.json({data:data,message:"create account salon failed"});
                        } else {
                            res.json({data:data,message:"create account salon success"});
                        }
                    });
                });
            } else
             {
                data = Account.createAccount(save_data, function (data) {
                    var accountId = data;
                    var phone = req.body.phone;
                    var address = req.body.address;
                    var birthday = req.body.birthday;//1993/03/30  yyyy/mm/dd
                    var nameCustomer = req.body.nameCustomer;
                    var save_customer = { accountId: accountId, nameCustomer: nameCustomer, phone: phone, address: address, birthday: birthday }
                    data = Customer.createCustomer(save_customer, function (data) {
                        if (data == null) {
                            res.json({data:data,message:"create account customer failed"});
                        } else {
                            res.json({data:data,message:"create account customer success"});
                        }
                    });
                });
            }
        }
    });
   } catch (error) {
       res.json({data:error,message:"create account success"});
   }
}
exports.delete_accountbyid = function (req, res, next) {
    var id = req.params.id;
    try {
        Account.removeAccount
        (id, function (response) {
            if (response==null) {
                res.json({data:response,message:"delete account failed"});
            } else {
                res.json({data:response,message:"delete account success"});
            }
        })
    } catch (error) {
        res.json({data:error,message:"delete account failed"});
    }
}
exports.getSalonAccount = function (req, res, next) {
    try {
         Account.getAllAccountSalon( function (data) {
            if (data == null) {
                res.json({data:data,message:"get account salon failed"});
            } else {
                res.json({data:data,message:"get account salon success"});
            }
        });
    } catch (error) {
        res.json({data:error,message:"get account salon failed"});
    }
}