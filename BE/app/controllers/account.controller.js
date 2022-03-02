const { body, validationResult } = require('express-validator');
var Account = require('../models/account.model');
var SalonOwner = require('../models/salonOwner.model');
var Customer = require('../models/customer.model');
const nodemailer = require('nodemailer');
var md5 = require('md5');
const jwt = require("jsonwebtoken");

const config = process.env;


exports.account = function (req, res, next) {
    try {
        Account.getAll(function (data) {
            if (data == null) {
                res.json({ message: "get account fail", data: data });
            } else {
                res.json({ message: "get account success", data: data });
            }
        });
    } catch (error) {
        res.json({ message: "get account fail", data: error });
    }
}
exports.get_accountbyid = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        var data = Account.getAccountById(id, function (data) {
            if (data == null) {
                res.json({ message: "get account failed", data: data });
            } else {
                res.json({ message: "get account success", data: data });
            }

        });
    } catch (error) {
        res.json({ message: "get account fail", data: error });
    }
}
exports.change_password = function (req, res, next) {
    try {
        var new_pass = req.body.new_password;
        var md5_new_pass = md5(new_pass);
        var old_pass = req.body.old_password;
        var md5_old_pass = md5(old_pass);
        var acc = req.body.account_name;
        var data = Account.checkPassword(acc, md5_old_pass, function (data) {
            if (data.length == 1) {
                var id = data[0].account_id;

                var data = Account.updatePasswordAccount(id, md5_new_pass, function (response) {
                    res.json(response);
                });
            } else {
                res.json({ message: "kiem tra lai old_password", data: "kiem tra lai old_password" });
            }
        })
    } catch (error) {
        res.json({ message: "kiem tra lai old_password", data: error });
    }
}
exports.login_account = function async(req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;
    var md5_pass = md5(pass);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        var data = Account.getAccountToLogin(acc, md5_pass, function (data) {
            if (data == null) {
                res.json({ data: data, message: "login failed" });
            } else {
                if (data.length == 0) {
                    res.json({ data: data, message: "login failed" });
                } else {
                    console.log(process.env.TOKEN_KEY);

                    // Create token
                    const token = jwt.sign(
                        { id: 1, acc },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    Account.updateToken(acc, token, function (response) {
                        var redata = data;
                        redata[0].token = token;
                        res.json({ data: redata, message: "login successed", token: token });
                    })
                    // res.json({ data: data, message: "login successed" });
                }

            }

        });
    } catch (error) {
        res.json({ data: error, message: "login failed" });
    }
}
exports.add_account_customer = function (req, res, next) {
    
    var acc = req.body.account_name;
    var pass = req.body.password;
    var md5_pass = md5(pass);
    var rol = req.body.role;
    var email = req.body.email;
    var save_data = { account_name: acc, password: md5_pass, role: rol, email: email }

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        var check = Account.checkAccount(acc, function (data) {
            if (data.length == 1) {
                res.json({ data: "Account already exists", message: "Account already exists" });
            }
            else {
                if (rol == 'customer')  {
                    data = Account.createAccount(save_data, function (data) {
                        var accountId = data;
                        var phone = req.body.phone;
                        var address = req.body.address;
                        var birthday = req.body.birthday;//1993/03/30  yyyy/mm/dd
                        var nameCustomer = req.body.nameCustomer;
                        var save_customer = { accountId: accountId, nameCustomer: nameCustomer, phone: phone, address: address, birthday: birthday }
                        data = Customer.createCustomer(save_customer, function (data) {
                            if (data == null) {
                                res.json({ data: data, message: "create account customer failed" });
                            } else {
                                res.json({ data: data, message: "create account customer success" });
                            }
                        });
                    });
                }else{
                    res.json({  message: "create account customer failed" });
                }
            }
        });
    } catch (error) {
        res.json({ data: error, message: "create account success" });
    }
}
exports.add_account_salon = function (req, res, next) {
    var check_role = ["salon"];
    var acc = req.body.account_name;
    var pass = req.body.password;
    var md5_pass = md5(pass);
    var rol = req.body.role;
    var email = req.body.email;
    var save_data = { account_name: acc, password: md5_pass, role: rol, email: email }

   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        var check = Account.checkAccount(acc, function (data) {
            if (data.length == 1) {
                res.json({ data: "Account already exists", message: "Account already exists" });
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
                            if (data == null) {
                                res.json({ data: data, message: "create account salon failed" });
                            } else {
                                res.json({ data: data, message: "create account salon success" });
                            }
                        });
                    });
                } else {
                    res.status(400).json({message:"create account salon failed"})
                }
            }
        });
    } catch (error) {
        res.json({ data: error, message: "create account success" });
    }
}
exports.delete_accountbyid = function (req, res, next) {
    var id = req.params.id;
    try {
        Account.removeAccount
            (id, function (response) {
                if (response == null) {
                    res.json({ data: response, message: "delete account failed" });
                } else {
                    res.json({ data: response, message: "delete account success" });
                }
            })
    } catch (error) {
        res.json({ data: error, message: "delete account failed" });
    }
}
exports.getSalonAccount = function (req, res, next) {
    try {
        Account.getAllAccountSalon(function (data) {
            if (data == null) {
                res.json({ data: data, message: "get account salon failed" });
            } else {
                res.json({ data: data, message: "get account salon success" });
            }
        });
    } catch (error) {
        res.json({ data: error, message: "get account salon failed" });
    }
}
exports.forgotPassword = async function (req, res, next) {
    const data = req.body;
    var account_name = req.body.account_name;
    var emailcheck = req.body.email;
    // res.json({message:"Account already exists"});
    Account.checkAccount(account_name, function (data) {
        if (data.length == 1) {
            var id = data[0].account_id;
            var email = data[0].email;
            if (!email == emailcheck) {
                res.json({ message: "check your email" });

            }
            var new_password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
            var md5_new_pass = md5(new_password);
            // var md5_new_pass = md5(new_password);
            Account.updatePasswordAccount(id, md5_new_pass, function (data) {
                if (data == null) {
                    res.json({ message: "send email failed", data: data })
                } else {
                    var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'mduyxa@gmail.com',
                            pass: 'Ad12345678'
                        }
                    });

                    var mailOptions = {
                        from: 'mduyxa@gmail.com',
                        to: email,
                        subject: 'New Password',
                        text: 'your new password:' + new_password
                    };
                    transporter.sendMail(mailOptions, function (error, info) {

                        if (error) {
                            console.log(error);
                            res.json({ error: error, message: "failed to email" })
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json({ info })
                        }
                    });
                }
            });

        }
        else {

            res.status(400).json({ data: "Account not exists", message: "Account not exists" });
        }
    })


}


