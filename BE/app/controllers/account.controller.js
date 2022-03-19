const { body, validationResult } = require('express-validator');
var Customer = require('../models/customer.model');
var SalonOwner = require('../models/salonOwner.model');
var Account = require('../models/account.model');
var SalonOwner = require('../models/salonOwner.model');
var Address = require('../models/address.model');

const nodemailer = require('nodemailer');
var md5 = require('md5');
const jwt = require("jsonwebtoken");

const config = process.env;


exports.account = function (req, res, next) {
    try {
        Account.getAll(function (data) {
            if (data == null) {
               return res.json({ message: "get account fail", data: data });
            } else {
               return res.json({ message: "get account success", data: data });
            }
        });
    } catch (error) {
       return res.json({ message: "get account fail", data: error });
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
               return res.status(400).json({ message: "get account failed", data: data });
            } else {
               return res.json({ message: "get account success", data: data });
            }

        });
    } catch (error) {
       return res.status(400).json({ message: "get account fail", data: error });
    }
}
exports.change_password = function (req, res, next) {
    try {
        var new_pass = req.body.new_password;
        var old_pass = req.body.old_password;
        var acc = req.body.account_name;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var md5_new_pass = md5(new_pass);
        var md5_old_pass = md5(old_pass);
        Account.checkAccount(acc, function(data){
            if (data.length==0) {
               return res.status(400).json({message:"please check account_name"});
                
            }else{
                var data = Account.checkPassword(acc, md5_old_pass, function (data) {
                    if (data.length == 1) {
                        var id = data[0].account_id;
        
                        var data = Account.updatePasswordAccount(id, md5_new_pass, function (response) {
                           return res.json({ message: "update password success", data: response });
                        });
                    } else {
                       return res.status(400).json({ message: "kiem tra lai old_password ", data: "update failed" });
                    }
                })

            }
        })
        
    } catch (error) {
       return res.json({ message: "kiem tra lai old_password va account_name", data: error });
    }
}
exports.login_account = function async(req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var md5_pass = md5(pass);
    Account.checkAccount(acc, function(data){
        if (data.length==0) {
           return res.status(400).json({message:"please check account_name"});
            
        }
        else{
            try {
                var data = Account.getAccountToLogin(acc, md5_pass, function (data) {
                    if (data == null) {
                        
                       return res.json({ data: data,datauser:message, message: "login failed" });
                    } else {
                        if (data.length == 0) {
                          return res.status(400).json({ data: data ,userData:{message:"empty"}, message: "please check password" });
                        } else {
                            
                            var redata = data;
                            if (redata[0].role == 'customer') {
                                Customer.getCustomerSalon(redata[0].account_id, function (data) {
                                    // Create token
                             
                            const token = jwt.sign(
                                { account_id: data[0].accountId,account_name: acc,customerId:data[0].customerId },
                                process.env.TOKEN_KEY,
                                {
                                    expiresIn: "2h",
                                }
                            );
                            Account.updateToken(acc, token, function (response) {
                                redata[0].token = token;
                                return res.setHeader("x-access-token",token).json({ accountData: redata,userData:data, message: "login successed", token: token });
                            
                                
                            })
                                });
                            }
                             else  if(redata[0].role=='salon'){
                                let id=redata[0].account_id;
                                SalonOwner.getProfileSalon(id, function (data) {
                                    console.log(data[0].accountId+" "+data[0].salonId)
                                    const token = jwt.sign(
                                        { account_id: data[0].accountId,account_name: acc,salonId:data[0].salonId },
                                        process.env.TOKEN_KEY,
                                        {
                                            expiresIn: "2h",
                                        }
                                    );
                                    Account.updateToken(acc, token, function (response) {
                                        redata[0].token = token;
                                        return res.setHeader("x-access-token",token).json({ accountData: redata,userData:data, message: "login successed", token: token });
                                    
                                        
                                    })  
                                });
                            }else if (redata[0].role=='admin')
                            {console.log(redata[0].account_id)
                                var adminData={name:'admin'}
                                const token = jwt.sign(
                                    
                                    { account_id: redata[0].account_id,role: acc,role:redata[0].role },
                                    process.env.TOKEN_KEY,
                                    {
                                        expiresIn: "2h",
                                    }
                                );
                                Account.updateToken(acc, token, function (response) {
                                    redata[0].token = token;
                                    return res.setHeader("x-access-token",token).json({ accountData: redata,userData:adminData ,message: "login successed", token: token });
                                
                                    
                                })  
                            }
                            else{
                                return res.status(400).json({message:"err systems"})
                            }
                            
                            
                        }
        
                    }
        
                });
            } catch (error) {
               return res.status(400).json({ data: error, message: "login failed" });
            }

        }

    }) ;
    
}

exports.add_account_customer = function (req, res, next) {

    var acc = req.body.account_name;
    var pass = req.body.password;
    var rol = req.body.role;
    var email = req.body.email;
    


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    var md5_pass = md5(pass);
    var save_data = { account_name: acc, password: md5_pass, role: rol, email: email }
    try {
        var check = Account.checkAccount(acc, function (data) {
            if (data.length == 1) {
                res.status(400).json({  message: "Account already exists" });
            }
            else {
                if (rol == 'customer') {
                    Account.createAccount(save_data, function (data_account) {
                        var accountId = data_account.accountId;
                        var phone = req.body.phone;
                        var address = req.body.address;
                        var birthday = req.body.birthday;//1993/03/30  yyyy/mm/dd 
                        var nameCustomer = req.body.nameCustomer;
                        var save_customer = { accountId: accountId, nameCustomer: nameCustomer, phone: phone, address: address, birthday: birthday }
                        Customer.createCustomer(save_customer, function (data) {

                            if (data == null) {
                                res.status(400).json({ data: data, message: "create account customer failed" });
                            } else {
                                res.json({ account: data_account, data: data, message: "create account customer success" });
                            }
                        });
                    });
                } else {
                    res.status(400).json({ message: "create account customer failed see role:customer" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "create account failed" });
    }
}
exports.add_account_salon = function (req, res, next) {
    var check_role = ["salon"];
    var acc = req.body.account_name;
    var pass = req.body.password;
    var rol = req.body.role;
    var email = req.body.email;
    var possibility = 0;
    var dataAddress={ city:req.body.city,
        district: req.body.district,
        detailAddress: req.body.detailAddress
        }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var checkTimeOpen=new Date("01-01-2017 " + req.body.timeOpen + ":00");
    var checkTimeClose=new Date("01-01-2017 " + req.body.timeClose + ":00");
    if (checkTimeOpen.getHours()>checkTimeClose.getHours()||(checkTimeOpen.getHours()==checkTimeClose.getHours()&&checkTimeOpen.getMinutes()>checkTimeClose.getMinutes())) {
        return res.status(400).json({message: "time open <time close"});
    }
    var dtime=checkTimeClose-checkTimeOpen;
    var totalSlot=dtime/(60000*15);


    
    var md5_pass = md5(pass);
    var save_data = { account_name: acc, password: md5_pass, role: rol, email: email }
    try {
        var check = Account.checkAccount(acc, function (data) {
            if (data.length == 1) {
                res.status(400).json({ data: "Account already exists", message: "Account already exists" });
            }
            else {
                if (rol == 'salon') {
                    data = Account.createAccount(save_data, function (data_account) {
                        var nameSalon = req.body.nameSalon;
                        var phone = req.body.phone;
                        var taxCode = req.body.taxCode;
                        var timeOpen = req.body.timeOpen;
                        var timeClose = req.body.timeClose;
                        var save_salonOwner = { accountId:data_account.accountId, nameSalon: nameSalon, phone: phone, possibility: possibility, taxCode: taxCode, timeOpen:timeOpen,timeClose:timeClose,totalSlot:totalSlot };
                        data = SalonOwner.createSalonOwner(save_salonOwner, function (data) {
                            var dataSalon=data;
                            if (data == null) {
                                res.status(400).json({ data: data, message: "create account salon failed" });
                            } else {
                                
                                dataAddress={salonId:dataSalon.id,...dataAddress}
                                Address.addAddress(dataAddress, function(data){
                                    if (data== null) {
                                       return res.status(400).json({message:"mysql error"})
                                    } else {
                                       res.json({ data_account: data_account, dataSalon: dataSalon,dataAddress:data, message: "create account salon success" });  
                                    }
                                })

                            }
                        });
                    });
                } else {
                    res.status(400).json({ message: "create account salon failed" })
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "create account success" });
    }
}
exports.delete_accountbyid = function (req, res, next) {
    var id = req.params.id;
    try {
        Account.removeAccount
            (id, function (response) {
                if (response == null) {
                    res.status(400).json({ data: response, message: "delete account failed" });
                } else {
                    res.json({ data: response, message: "delete account success" });
                }
            })
    } catch (error) {
        res.status(400).json({ data: error, message: "delete account failed" });
    }
}
exports.getSalonAccount = function (req, res, next) {
    try {
        Account.getAllAccountSalon(function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get account salon failed" });
            } else {
                res.json({ data: data, message: "get account salon success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get account salon failed" });
    }
}
exports.forgotPassword = async function (req, res, next) {
    const data = req.body;
    var account_name = req.body.account_name;
    var emailcheck = req.body.email;
    // res.json({message:"Account already exists"});
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Account.checkAccount(account_name, function (data) {
        if (data.length == 1) {
            var id = data[0].account_id;
            var email = data[0].email;
            if (!(email == emailcheck)) {
               return res.status(400).json({ message: "check your email" });

            }
            var new_password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
            var md5_new_pass = md5(new_password);
            // var md5_new_pass = md5(new_password);
            Account.updatePasswordAccount(id, md5_new_pass, function (data) {
                if (data == null) {
                    res.status(400).json({ message: "send email failed", data: data })
                } else {
                    var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'duymche130521@gmail.com',
                            pass: 'Adx12311',
                            
                        }
                    });
                    var mailOptions = {
                        from: 'forgot password',
                        to: email,
                        subject: 'New Password',
                        text: 'your new password:' + new_password
                    };
                    transporter.sendMail(mailOptions, function (error, info) {

                        if (error) {
                            console.log(error);
                            res.status(400).json({ error: error, message: "failed to email" })
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json({ info ,message:"send password to your email"})
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


