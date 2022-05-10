const { body, validationResult } = require('express-validator');
var Customer = require('../models/customer.model');
var SalonOwner = require('../models/salonOwner.model');
var Account = require('../models/account.model');
var SalonOwner = require('../models/salonOwner.model');
var Address = require('../models/address.model');
var ImageSalon = require('../models/imageSalon.model');
const multer = require('multer');

const nodemailer = require('nodemailer');
var md5 = require('md5');
const jwt = require("jsonwebtoken");

const config = process.env;
//cấu hình lưu trữ file khi upload xong
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //files khi upload xong sẽ nằm trong thư mục "uploads" này - các bạn có thể tự định nghĩa thư mục này
      cb(null, 'uploads') 
    },
    filename: function (req, file, cb) {
      // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
      const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, filename + '-' + file.originalname )
    }
  })
//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const upload = multer({ storage: storage })


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
 var user = req.user;
if (req.user== null) {
    return res.status(400).json({message:"please login account"})
}
    var new_pass = req.body.new_password;
    var old_pass = req.body.old_password;
    var acc = req.user.account_name;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var md5_new_pass = md5(new_pass);
    var md5_old_pass = md5(old_pass);
    var dataOk = { account_name: acc, new_password: new_pass }
    Account.checkAccount(acc, function (data) {
        if (data.length == 0) {
            return res.status(400).json({ message: "account not exist,please check account" });

        } else {
            var data = Account.checkPassword(acc, md5_old_pass, function (data) {
                if (data.length == 1) {
                    var id = data[0].account_id;

                    var data = Account.updatePasswordAccount(id, md5_new_pass, function (response) {
                        return res.json({ message: "update password success", data: dataOk });
                    });
                } else {
                    return res.status(400).json({ message: "check old_password ", data: "update failed" });
                }
            })

        }
    })


}
exports.login_account = function async(req, res, next) {
    var acc = req.body.account;
    var pass = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var md5_pass = md5(pass);
    Account.checkAccount(acc, function (data) {
        if (data.length == 0) {
            return res.status(400).json({ message: "Account not exist, please check account" });

        }
        else {
            try {
                var data = Account.getAccountToLogin(acc, md5_pass, function (data) {
                    if (data == null) {

                        return res.status(400).json({ data: data, datauser: message, message: "login failed" });
                    } else {
                        if (data.length == 0) {
                            return res.status(400).json({ data: data, userData: { message: "empty" }, message: "password wrong,please check password" });
                        } else {

                            var redata = data;
                            if (redata[0].role == 'customer') {
                                Customer.getCustomerSalon(redata[0].account_id, function (data) {
                                    // Create token

                                    const token = jwt.sign(
                                        { account_id: data[0].accountId, account_name: acc, customerId: data[0].customerId },
                                        process.env.TOKEN_KEY,
                                        {
                                            expiresIn: "2h",
                                        }
                                    );
                                    Account.updateToken(acc, token, function (response) {
                                        redata[0].token = token;
                                        return res.setHeader("x-access-token", token).json({ accountData: redata, userData: data, message: "login successed", token: token });


                                    })
                                });
                            }
                            else if (redata[0].role == 'salon') {
                                let id = redata[0].account_id;
                                SalonOwner.getProfileSalon(id, function (data) {
                                    console.log(data[0].accountId + " " + data[0].salonId)
                                    if (data[0].possibility==3) {
                                        return res.status(400).json({accountData: [], userData: [], message: "your account is deleted", token:[] })
                                    }
                                    const token = jwt.sign(
                                        { account_id: data[0].accountId, account_name: acc, salonId: data[0].salonId },
                                        process.env.TOKEN_KEY,
                                        {
                                            expiresIn: "2h",
                                        }
                                        
                                    );
                                    Account.updateToken(acc, token, function (response) {
                                        redata[0].token = token;
                                        return res.setHeader("x-access-token", token).json({ accountData: redata, userData: data, message: "login successed", token: token });


                                    })
                                });
                            } else if (redata[0].role == 'admin') {
                                console.log(redata[0].account_id)
                                var adminData = { name: 'admin' }
                                const token = jwt.sign(

                                    { account_id: redata[0].account_id, role: acc, role: redata[0].role },
                                    process.env.TOKEN_KEY,
                                    {
                                        expiresIn: "2h",
                                    }
                                );
                                Account.updateToken(acc, token, function (response) {
                                    redata[0].token = token;

                                    return res.setHeader("x-access-token", token).json({ accountData: redata, userData: [adminData], message: "login successed", token: token });


                                })
                            }
                            else {

                                return res.status(400).json({ message: "err systems" })
                            }


                        }

                    }

                });
            } catch (error) {
                return res.status(400).json({ data: error, message: "login failed" });
            }

        }

    });

}
exports.createAccountSalon = function (req, res, next) {
    //nhận dữ liệu từ form
    const file = req.file;
    // Kiểm tra nếu không phải dạng file thì báo lỗi
    if (!file) {
        const error = new Error('Upload file again!')
        error.httpStatusCode = 400
        return next(error)
      }
     

    // file đã được lưu vào thư mục uploads
    // gọi tên file: req.file.filename và render ra màn hình
    res.sendFile(__dirname + `/uploads/${req.file.filename}`);
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
                res.status(400).json({ message: "Account already exists" });
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
    var image = req.body.image;
    var dataAddress = {
        city: req.body.city,
        district: req.body.district,
        detailAddress: req.body.detailAddress
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var checkTimeOpen = new Date("01-01-2017 " + req.body.timeOpen + ":00");
    var checkTimeClose = new Date("01-01-2017 " + req.body.timeClose + ":00");
    if (checkTimeOpen.getHours() > checkTimeClose.getHours() || (checkTimeOpen.getHours() == checkTimeClose.getHours() && checkTimeOpen.getMinutes() > checkTimeClose.getMinutes())) {
        return res.status(400).json({ message: "time open <time close" });
    }
    var dtime = checkTimeClose - checkTimeOpen;
    var totalSlot = dtime / (60000 * 15);



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
                        var description = req.body.description;
                        var requestDate = new Date();
                        var save_salonOwner = { accountId: data_account.accountId, nameSalon: nameSalon, phone: phone, possibility: possibility, taxCode: taxCode, timeOpen: timeOpen, timeClose: timeClose, totalSlot: totalSlot, description: description, nameOwner: req.body.nameOwner, requestDate: requestDate };
                        data = SalonOwner.createSalonOwner(save_salonOwner, function (data) {
                            var dataSalon = data;
                            if (data == null) {
                                res.status(400).json({ data: data, message: "Create account salon failed" });
                            } else {
                                var dataImage = { image: image, salonId: dataSalon.id }
                                ImageSalon.addImageToImageSalon(dataImage, function (data) {

                                })
                                dataSalon = { image: image, ...dataSalon }


                                dataAddress = { salonId: dataSalon.id, ...dataAddress }
                                Address.addAddress(dataAddress, function (data) {
                                    if (data == null) {
                                        return res.status(400).json({ message: "mysql error" })
                                    } else {
                                        res.json({ data_account: data_account, dataSalon: dataSalon, dataAddress: data, message: "Create account salon success" });
                                    }
                                })

                            }
                        });
                    });
                } else {
                    res.status(400).json({ message: "Create account salon failed" })
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "Create account success" });
    }
}
exports.delete_accountbyid = function (req, res, next) {
    var id = req.params.id;
    try {
        Account.removeAccount
            (id, function (response) {
                if (response == null) {
                    res.status(400).json({ data: response, message: "Delete account failed" });
                } else {
                    res.json({ data: response, message: "Delete account success" });
                }
            })
    } catch (error) {
        res.status(400).json({ data: error, message: "Delete account failed" });
    }
}
exports.getSalonAccount = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    else {
        try {
            Account.getAllAccountSalon(function (data) {
                if (data == null) {
                    res.status(400).json({ data: data, message: "Get account salon failed" });
                } else {
                    res.json({ data: data, message: "Get account salon success" });
                }
            });
        } catch (error) {
            res.status(400).json({ data: error, message: "get account salon failed" });
        }
    }

}
exports.getSalonActive = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    var nameSalon = req.body.nameSalon;
    SalonOwner.getSalonActive(nameSalon, function (data) {
        res.json({ data: data, message: "Get account salon active success" });
    });
}
exports.getSalonDeactive = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    var nameSalon = req.body.nameSalon;
    SalonOwner.getSalonDeactive(nameSalon, function (data) {
        res.json({ data: data, message: "Get account salon deactive success" });
    });
}
exports.getSalonRequest = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    var nameSalon = req.body.nameSalon;
    SalonOwner.getSalonRequest(nameSalon, function (data) {
        res.json({ data: data, message: "Get account salon request success" });
    });
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
                    const nodemailer = require('nodemailer');
                    const { google } = require('googleapis');
                    const config = require('../common/config');
                    const OAuth2 = google.auth.OAuth2

                    const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
                    OAuth2_client.setCredentials({ refresh_token: config.refresh_token });
                    function send_mail(name, recipient) {
                        const accessToken = OAuth2_client.getAccessToken()

                        const transport = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                type: 'oauth2',
                                clientId: config.clientId,
                                clientSecret: config.clientSecret,
                            }
                        })
                        const mail_options = {
                            from: `THE house of gentlemen <${config.user}>`,
                            to: recipient,
                            subject: 'A message from the G.O.A.T',
                            text: get_html_message(),
                            auth: {
                                user: config.user,
                                refreshToken: config.refresh_token,
                                accessToken: accessToken,
                            }
                        }
                        transport.sendMail(mail_options, function (error, result) {
                            if (error) {
                                console.log('Error:', error)
                            } else {
                                console.log('Success:', result)

                            }
                            transport.close();
                            res.json({data:{account_name:account_name,email:email},message:"send new_password to your email"})

                        })
                    }
                    function get_html_message(name) {
                        return `
                        <h3>newpassword: ${new_password}</h3>
                            `
                    }
                    send_mail(new_password, email)

                }
            });

        }
        else {

            res.status(400).json({ data: "Account not exists", message: "Account not exists" });
        }
    })


}


