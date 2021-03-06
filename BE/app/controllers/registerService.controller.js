var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');
var SalonOwner = require('../models/salonOwner.model');
var Service = require('../models/service.model');
var Customer = require('../models/customer.model');
var twilio = require('twilio');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../common/config');
const OAuth2 = google.auth.OAuth2
const { body, validationResult } = require('express-validator');
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


exports.getRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "Please login account customer" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        RegisterService.getRegisterServiceById(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "Get booking service failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have booking service" });
                } else {
                    res.json({ data: data, message: "Get booking service success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get booking service failed" });
    }

}
exports.getRegisterServiceByCustomer = function (req, res, next) {
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "please login account customer" });
    }
    try {
        RegisterService.getRegisterServiceByCustomer(req.user.customerId, function (data) {

            if (data == null) {
                return res.status(400).json({ data: data, message: "get booking service failed" });
            } else {
                if (data.length == 0) {
                    return res.status(400).json({ data: data, message: "not have booking service" });
                } else {
                    return res.json({ data: data, message: "get booking service success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get booking service failed" });
    }



}
exports.addRegisterService = function (req, res, next) {
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "please login account customer" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var staffId = req.body.staffId;
    var date = new Date(req.body.timeUse);
    var statusId = 3;
    var timeRegister = new Date();
    var status_register_id = 1;
    var timeBusy = req.body.service_time;
    var fiveDate = new Date();
    fiveDate.setDate(fiveDate.getDate() + 5);
    if (date < new Date() || date > fiveDate) {
        return res.status(400).json({ message: "th???i gian s??? d???ng d???ch vuk trong v??ng 5 ng??y " })
    }
    var salonId = req.body.salonId;

    var dataRegisterService = {
        serviceId: req.body.serviceId,
        salonId: req.body.salonId,
        customerId: req.user.customerId,
        staffId: req.body.staffId,
        timeUse: req.body.timeUse,
        price_original: req.body.price_original,
        timeRegister: timeRegister,
        status_register_id: 1,
        note: 'customer booked'
    };

    SalonOwner.checkSalon(salonId, function (data) {

        if (data[0].possibility != '1') {
            return res.status(400).json({ data: { salonId }, message: "Salon ???? ng???ng ho???t ?????ng" });
        }
        else {


            RegisterService.checkBooking(customerId, function (data) {

                if (data.length >= 5) {
                    res.json({ message: "B???n ch??? ???????c ph??p ?????t tr?????c t???i ??a 5 d???ch v???" })
                } else {
                    Service.checkService(dataRegisterService.serviceId, function (data) {
                        if (data[0].possible == 0) {
                            res.status(400).json({ message: "D???ch v??? n??y ???? b??? x??a,vui l??ng ch???n d???ch v??? kh??c ????? booking" })
                        }
                        else {
                            var promotion = data[0].promotion;
                            SalonOwner.checkTimeSalon(dataRegisterService.salonId, function (data) {
                                var timeCloseDay = data[0].timeClose;
                                var timeOpen = new Date("01-01-2017 " + data[0].timeOpen + ":00");
                                var timeClose = new Date("01-01-2017 " + data[0].timeClose + ":00");
                                var timeUse = new Date(req.body.timeUse);
                                // return res.json({ timeUse, message: "timeUse"})
                                if (timeOpen.getHours() > timeUse.getHours() ||
                                    (timeOpen.getHours() == timeUse.getHours() && timeOpen.getMinutes() > timeUse.getMinutes())

                                ) {
                                    return res.status(400).json({ message: "Salon open at " + data[0].timeOpen });
                                } else {
                                    var slotTotal = data[0].totalSlot;
                                    var totalSlotBusy = timeBusy / 15;
                                    var slotStart = (date.getHours() - timeOpen.getHours()) * 60 / 15 + (date.getMinutes() - timeOpen.getMinutes()) / 15 + 1;
                                    if ((slotStart + totalSlotBusy) > slotTotal + 1) {
                                        return res.status(400).json({ message: "salon close at " + timeCloseDay })
                                    }
                                    StaffCanleder.checkCanlederStaff(date, staffId, function (data) {
                                        var check = 0;
                                        for (let m = 0; m < data.length; m++) {
                                            for (let n = 0; n < totalSlotBusy; n++) {
                                                if (data[m].slotBusy == (n + slotStart)) {
                                                    check = check + 1;
                                                }
                                            }
                                        }
                                        if (check > 0) {
                                            return res.status(400).json({ message: "staff b???n" });
                                        }
                                        else {

                                            RegisterService.addRegisterService(dataRegisterService, function (data) {
                                                var checkIndex = 0;
                                                for (let index = 0; index < totalSlotBusy; index++) {
                                                    slotBusy = slotStart + index;
                                        
                                                    checkIndex++;
                                                    var dataStaffCanleder = { registerServiceId: data.registerServiceId, staffId: staffId, slotTotal: slotTotal, slotBusy: slotBusy, date: date };
                                                    StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) {

                                                    })
                                                }
                                                RegisterService.dataBooking(data.registerServiceId, function (data) {
                                                    data = { promotion, ...data[0] }
                                                    return res.status(200).json({ data, message: "booking th??nh c??ng" });

                                                })

                                            })



                                        }
                                    })



                                }

                            })

                        }

                    })

                }

            })

        }
    })






}
exports.cancelBooking = function (req, res, next) {
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "please login account customer" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var registerServiceId = req.body.registerServiceId;
    var note = 'customer Canceled booking';
    StaffCanleder.cancelBooking(registerServiceId, function (data) {
        RegisterService.cancelBooking(registerServiceId, note, function (data) {
            return res.status(200).json({ message: "canceled booking service success", data: { registerServiceId, note } })
        })
    })
}
exports.getRegisterServiceOfSalon = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    RegisterService.getRegisterServiceOfSalon(salonId, function (data) {
        if (data == null) {
            return res.json({ data: data, message: "err mysqld" });
        } else {
            return res.json({ data: data, message: "get booking success" });
        }
    })

}
exports.favorviteService = function (req, res, next) {
    var customerId = req.user.customerId;
    RegisterService.favorviteService(customerId, function (data) {
        if (data.length == 0) {
            return res.json({ data: data, message: "not have history booking" });
        } else {
            return res.json({ data: data, message: "get favorite salon" });
        }
    })
}
exports.cancelBookingBySalon = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var registerServiceId = req.body.registerServiceId;
    var note = req.body.note;
    RegisterService.getRegisterServiceById(registerServiceId, function (data) {
        var customerId = data[0].customerId;
        Customer.checkEmailCustomer(customerId, function (data) {
            var email = data[0].email;
            StaffCanleder.cancelBookingBySalon(registerServiceId, function (data) {
                RegisterService.cancelBooking(registerServiceId, note, function (data) {
                    return res.status(200).json({ message: "h???y l???ch th??nh c??ng", data: { registerServiceId: registerServiceId, note: note } })
                    // const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
                    // OAuth2_client.setCredentials({ refresh_token: config.refresh_token });
                    // function send_mail(name, recipient) {
                    //     const accessToken = OAuth2_client.getAccessToken()

                    //     const transport = nodemailer.createTransport({
                    //         host: 'smtp.gmail.com',
                    //         port: 465,
                    //         secure: true,
                    //         auth: {
                    //             type: 'oauth2',
                    //             clientId: config.clientId,
                    //             clientSecret: config.clientSecret,
                    //         }
                    //     })
                    //     const mail_options = {
                    //         from: `THE house of gentlemen <${config.user}>`,
                    //         to: recipient,
                    //         subject: 'A message from the house of gentlemen',
                    //         text: get_html_message(),
                    //         auth: {
                    //             user: config.user,
                    //             refreshToken: config.refresh_token,
                    //             accessToken: accessToken,
                    //         }
                    //     }
                    //     transport.sendMail(mail_options, function (error, result) {
                    //         if (error) {
                    //             console.log('Error:', error)
                    //             return res.status(400).json({ data: [], message: "check token email" })
                    //         } else {
                    //             console.log('Success:', result)
                                
                    //         }
                    //         transport.close();


                    //     })
                    // }
                    // function get_html_message(name) {
                    //     return `
                    // <h3>sign:salon ???? h???y booking c???a b???n</h3>
                    //     `
                    // }
                    // send_mail('', email)
                    // return res.status(200).json({ message: "h???y l???ch th??nh c??ng", data: { registerServiceId: registerServiceId, note: note } })
                })
            })



        })

    })

}
exports.historyBooking = function (req, res, next) {
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "please login account customer" });
    }
    RegisterService.historyBooking(customerId, function (data) {
        // return res.json({ data: data, message: "aaa"})
        if (data.length == 0) {
            return res.json({ data: data, message: "not have history booking" });
        } else {
            return res.json({ data: data, message: "get history booking success" });
        }
    })
}
exports.reservation = function (req, res, next) {
    var customerId = req.user.customerId;
    RegisterService.reservation(customerId, function (data) {
        if (data.length == 0) {
            return res.json({ data: data, message: "not have reservation" });
        } else {
            return res.json({ data: data, message: "get reservation success" });
        }
    })
}
exports.bookingServiceForCustomer = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var staffId = req.body.staffId;
    var date = new Date(req.body.timeUse);
    var statusId = 3;
    var timeRegister = new Date();
    var status_register_id = 1;
    var timeBusy = req.body.service_time;
    var fiveDate = new Date();
    fiveDate.setDate(fiveDate.getDate() + 5);
    if (date < new Date() || date > fiveDate) {
        return res.status(400).json({ message: "timeUse within 5days " })
    }

    var dataRegisterService = {
        serviceId: req.body.serviceId,
        salonId: salonId,
        customerId: 26,
        note: req.body.note,
        staffId: req.body.staffId,
        timeUse: req.body.timeUse,
        price_original: req.body.price_original,
        timeRegister: timeRegister,
        status_register_id: 1,
    };
    SalonOwner.checkSalon(salonId, function (data) {
        if (data[0].possibility != '1') {
            return res.status(400).json({ message: "salon kh??ng ???????c ph??p ho???t ?????ng" });
        } else {
            Service.checkService(dataRegisterService.serviceId, function (data) {
                var promotion = data[0].promotion;
                SalonOwner.checkTimeSalon(dataRegisterService.salonId, function (data) {
                    var timeCloseDay = data[0].timeClose;
                    var timeOpen = new Date("01-01-2017 " + data[0].timeOpen + ":00");
                    var timeClose = new Date("01-01-2017 " + data[0].timeClose + ":00");
                    var timeUse = new Date(req.body.timeUse);
                    if (timeOpen.getHours() > timeUse.getHours() ||
                        (timeOpen.getHours() == timeUse.getHours() && timeOpen.getMinutes() > timeUse.getMinutes()) ||
                        timeUse.getHours() > timeClose.getHours ||
                        (timeUse.getHours() == timeClose.getHours() && timeUse.getMinutes() > timeClose.getMinutes())) {
                        return res.status(400).json({ message: "salon open at " + data[0].timeOpen });
                    } else {
                        var slotTotal = data[0].totalSlot;
                        var totalSlotBusy = timeBusy / 15;
                        var slotStart = (date.getHours() - timeOpen.getHours()) * 60 / 15 + (date.getMinutes() - timeOpen.getMinutes()) / 15 + 1;
                        if ((slotStart + totalSlotBusy) > slotTotal) {
                            return res.status(400).json({ message: "salon close at " + timeCloseDay })
                        }
                        StaffCanleder.checkCanlederStaff(date, staffId, function (data) {
                            var check = 0;
                            for (let m = 0; m < data.length; m++) {
                                for (let n = 0; n < totalSlotBusy; n++) {
                                    if (data[m].slotBusy == (n + slotStart)) {
                                        check = check + 1;
                                    }
                                }
                            }
                            if (check > 0) {
                                return res.status(400).json({ message: "staff busy" });
                            }
                            else {
                                RegisterService.addRegisterService(dataRegisterService, function (data) {
                                    var checkIndex = 0;
                                    for (let index = 0; index < totalSlotBusy; index++) {
                                        slotBusy = slotStart + index;
                                        checkIndex++;
                                        var dataStaffCanleder = { registerServiceId: data.registerServiceId, staffId: staffId, slotTotal: slotTotal, slotBusy: slotBusy, date: date };
                                        StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) {

                                        })
                                    }
                                    data = { promotion, ...data }
                                    return res.status(200).json({ data, message: "booking th??nh c??ng" });
                                })



                            }
                        })



                    }

                })

            })

        }
    });



}
exports.current = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var day = req.body.day;
    var staffId = req.body.staffId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var today = new Date();

    var checkDay = new Date(day + ' 23:59:00')
    console.log(checkDay)
    if (checkDay < today) {
        return res.status(400).json({ message: "you see history", data: [] });
    }
    RegisterService.current(salonId, day, staffId, function (data) {
        if (data.length == 0) {
            return res.json({ data: data, message: "not have current" });
        } else {
            return res.json({ data: data, message: "get current success" });
        }
    })
}
exports.ordersHistory = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var day = req.body.day;
    var staffId = req.body.staffId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    RegisterService.ordersHistory(salonId, day, staffId, function (data) {
        if (data.length == 0) {
            return res.json({ data: data, message: "not have history booking" });
        } else {
            return res.json({ data: data, message: "get history booking success" });
        }
    })
}
exports.finshBooking = function (req, res, next) {
    var salonId = req.user.salonId;
    var id = req.body.id;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    var note = 'booking finished';
    StaffCanleder.finishBooking(id, function (data) {
        RegisterService.finshBooking(id, note, function (data) {

            return res.json({ data: { id: id, note: note }, message: "finish booking service" });

        })

    })


}
exports.check = function (req, res, next) {

    res.status(200).json({ data: [], message: "ok" })
}
