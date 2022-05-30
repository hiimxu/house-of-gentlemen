var SalonOwner = require('../models/salonOwner.model');
var Address = require('../models/address.model');
var ImageSalon = require('../models/imageSalon.model');
var Account = require('../models/account.model');
var RegisterService = require('../models/register_service.model');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../common/config');
const OAuth2 = google.auth.OAuth2
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        var data = SalonOwner.getProfileSalon(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get salon 's profile failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "get salon 's profile failed" });
                }
                else {
                    res.json({ data: data, message: "get salon 's profile success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get salon 's profile failed" });
    }
}
exports.getAllSalon = function (req, res, next) {
    try {
        var data = SalonOwner.getProfileAllSalon(function (data) {
            if (data == null) { res.status(400).json({ data: data, message: "get all salon failed" }); }
            else {
                res.json({ data: data, message: "get all salon success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: data, message: "get all salon failed" });
    }

}
exports.getHomePage = function (req, res, next) {
    var index = req.body.index;
    if (index == '') {
        index = 1;
    }
    SalonOwner.getProfileAllSalon(function (data) {
        var totalPage = Math.floor(data.length / 5) + 1;
        if (index > totalPage) {
            return res.status(400).json({ data: [], totalPage, message: "1<=index<=totalPage" })
        }
        SalonOwner.getHomePage(index, function (data) {
            res.json({ data: data, totalPage, message: "get home page success" })

        })

    });
}
exports.searchSalon = function (req, res, next) {
    var name = req.body.name;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    SalonOwner.searchSalon(name, function (data) {
        res.json({ data: data, message: "search salon" });
    })
}
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.body.id;
    var possibility = req.body.possibility;
    var user = req.user;
    if (user.role == null) {
        return res.status(400).json({ message: "please login admin" })
    } else {
        var checkPossibility = ['1', '0'];
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (!checkPossibility.includes(req.body.possibility)) {
            res.status(400).json({ message: "check possibility" });
            return;
        } try {
            var data = SalonOwner.setPossitiveSalonOwner(id, possibility, function (data) {
                if (data == null) {
                    res.status(400).json({ data: data, message: "set salon's possitive failed" });
                } else {
                    if (data.affectedRows == 0) {
                        res.status(400).json({ data: { id: id }, message: "not have data update" });
                    } else
                        if (data.changedRows == 0) {
                            res.status(400).json({ data: { id: id }, message: "data not change" });
                        }
                        else {
                            if (possibility == 1) {
                                res.json({ data: { id: id }, message: "set salon's possitive success" });
                            } else {
                                res.json({ data: { id: id }, message: "set salon's impossitive success" });
                            }
                        }
                }
            });
        } catch (error) {
            res.status(400).json({ data: data, message: "set salon's possitive failed" });
        }
    }




}
exports.salonOwner = function (req, res, next) {
    try {
        SalonOwner.getAll(function (data) {
            if (data == null) { res.status(400).json({ data: data, message: "get salonowner failed" }); }
            else {
                res.json({ data: data, message: "get salonowner success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get salonowner failed" });
    }
}

exports.getSalonOwnerProfile = function (req, res, next) {


    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }

    try {
        SalonOwner.getProfileSalonBySalonId(salonId, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get salon 's profile failed" });
            }
            else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have infor to see" });
                } else { res.json({ data: data, message: "get salon 's profile success" }); }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get salon 's profile failed" });
    }
}
exports.salonInformationForCustomer = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    console.log(req.user)
    var checkTimeOpen = new Date("01-01-2017 " + req.body.timeOpen + ":00");
    var checkTimeClose = new Date("01-01-2017 " + req.body.timeClose + ":00");
    if (checkTimeOpen.getHours() > checkTimeClose.getHours() || (checkTimeOpen.getHours() == checkTimeClose.getHours() && checkTimeOpen.getMinutes() > checkTimeClose.getMinutes())) {
        return res.status(400).json({ message: "time open <time close" });
    }
    var dataUpdate = {
        nameSalon: req.body.nameSalon,
        phone: req.body.phone,
        timeOpen: req.body.timeOpen,
        timeClose: req.body.timeClose,
        description: req.body.description,

    };
    var addressUpdate = {
        city: req.body.city,
        district: req.body.district,
        detailAddress: req.body.detailAddress,
    }
    var image = req.body.image;
    var dataOk = { ...dataUpdate, ...addressUpdate, image }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Address.updateAddressSalon(salonId, addressUpdate, function (data) {
        ImageSalon.updateImage(salonId, image, function (data) {
            SalonOwner.updateProfileSalon(salonId, dataUpdate, function (data) {
                if (data == null) {
                    res.status(400).json({ data: data, message: "update salon information for customer failed" });
                }
                else {

                    res.json({ data: dataOk, message: "update salon information for customer success" });

                }
            });

        })

    })






}
exports.salonBusinessInformation = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var checkTimeOpen = new Date("01-01-2017 " + req.body.timeOpen + ":00");
    var checkTimeClose = new Date("01-01-2017 " + req.body.timeClose + ":00");
    if (checkTimeOpen.getHours() > checkTimeClose.getHours() || (checkTimeOpen.getHours() == checkTimeClose.getHours() && checkTimeOpen.getMinutes() > checkTimeClose.getMinutes())) {
        return res.status(400).json({ message: "kiểm tra thời gian mở cửa và thời gian đóng cửa của salon" });
    }
    var accountId = req.user.account_id;
    var dataUpdate = {
        nameSalon: req.body.nameSalon,
        phone: req.body.phone,
        taxCode: req.body.taxCode,
        timeOpen: req.body.timeOpen,
        timeClose: req.body.timeClose,
        nameOwner: req.body.nameOwner,
    };
    var addressUpdate = {
        city: req.body.city,
        district: req.body.district,
        detailAddress: req.body.detailAddress,
    }
    var image = req.body.image;
    var email = req.body.email;
    var dataOk = { ...dataUpdate, ...addressUpdate, image, email }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Account.updateEmail(accountId, email, function (data) {
        Address.updateAddressSalon(salonId, addressUpdate, function (data) {
            ImageSalon.updateImage(salonId, image, function (data) {

                SalonOwner.updateProfileSalon(salonId, dataUpdate, function (data) {

                    if (data == null) {
                        res.status(400).json({ data: data, message: "Thay đổi thông tin thất bại" });
                    }
                    else {
                        if (data.affectedRows == 0) {
                            res.status(400).json({ data: data, message: "not have salon 's profile to update" });
                        } else {
                            res.json({ data: dataOk, message: "Thay đổi thông tin thành công" });
                        }
                    }
                });

            })

        })

    })




}
exports.updateSalonOwnerProfile = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var checkTimeOpen = new Date("01-01-2017 " + req.body.timeOpen + ":00");
    var checkTimeClose = new Date("01-01-2017 " + req.body.timeClose + ":00");
    if (checkTimeOpen.getHours() > checkTimeClose.getHours() || (checkTimeOpen.getHours() == checkTimeClose.getHours() && checkTimeOpen.getMinutes() > checkTimeClose.getMinutes())) {
        return res.status(400).json({ message: "time open <time close" });
    }
    console.log(req.user)
    var dataUpdate = {
        nameSalon: req.body.nameSalon,
        phone: req.body.phone,
        taxCode: req.body.taxCode,
        timeOpen: req.body.timeOpen,
        timeClose: req.body.timeClose,
        description: req.body.description,
        nameOwner: req.body.nameOwner,
    };
    var addressUpdate = {
        city: req.body.city,
        district: req.body.district,
        detailAddress: req.body.detailAddress,
    }
    var image = req.body.image;
    var email = req.body.email;
    var dataOk = { ...dataUpdate, ...addressUpdate, image, email }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Account.updateEmail(account_id, email, function (data) {
        Address.updateAddressSalon(salonId, addressUpdate, function (data) {
            ImageSalon.updateImage(salonId, image, function (data) {
                SalonOwner.updateProfileSalon(salonId, dataUpdate, function (data) {
                    if (data == null) {
                        res.status(400).json({ data: data, message: "update salon 's profile failed" });
                    }
                    else {
                        if (data.affectedRows == 0) {
                            res.status(400).json({ data: data, message: "not have salon 's profile to update" });
                        } else {
                            res.json({ data: dataOk, message: "update salon 's profile success" });
                        }
                    }
                });

            })

        })

    })




}
exports.setDeactiveSalon = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var salonId = req.body.salonId;
    SalonOwner.setDeactiveSalon(salonId, function (data) {
        RegisterService.cancelBookingOfSalon(salonId, function (data){
            
        })
        SalonOwner.getEmailOfSalon(salonId, function (data) {
            email = data[0].email;
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
                    subject: 'A message from the house of gentlemen',
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
                        return res.status(400).json({data:[],message:"check token email"})
                    } else {
                        console.log('Success:', result)
                        res.json({ data: { email: email,salonId:salonId }, message: "đã ngưng hoạt động cho salon và gửi email thông báo đến chủ salon" })
                    }
                    transport.close();
                   

                })
            }
            function get_html_message(name) {
                return `
                    <h3>sign:salon của bạn đã bị deactive</h3>
                        `
            }
            send_mail('', email)



        })
        

    });
}
exports.setActiveSalon = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var salonId = req.body.salonId;
    var joinDate = new Date()
    SalonOwner.setActiveSalon(salonId, joinDate, function (data) {
        SalonOwner.getEmailOfSalon(salonId, function (data) {
            email = data[0].email;
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
                    subject: 'A message from the house of gentlemen',
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
                        return res.status(400).json({data:[],message:"check token email"})
                    } else {
                        console.log('Success:', result)
                        res.json({ data: { email: email,salonId:salonId, joinDate:joinDate}, message: "kích hoạt thành công , gửi email thông báo đến chủ salon" })
                    }
                    transport.close();
                   

                })
            }
            function get_html_message(name) {
                return `
                    <h3>sign:salon của bạn đã được active</h3>
                        `
            }
            send_mail('', email)



        })
    });
}
exports.deleteSalon = function (req, res, next) {
    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var salonId = req.body.salonId;
    SalonOwner.deleteSalon(salonId, function (data) {
        SalonOwner.getEmailOfSalon(salonId, function (data) {
            email = data[0].email;
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
                    subject: 'A message from the house of gentlemen',
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
                        return res.status(400).json({data:[],message:"check token email"})
                    } else {
                        console.log('Success:', result)
                        res.json({ data: { email: email,salonId:salonId}, message: "từ chối thành công, đã gửi email thông báo đến chủ salon" })
                    }
                    transport.close();
                   

                })
            }
            function get_html_message(name) {
                return `
                    <h3>sign:salon của bạn đã bị xóa</h3>
                        `
            }
            send_mail('', email)



        })

    });
}