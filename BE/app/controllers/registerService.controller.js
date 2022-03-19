var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');
var SalonOwner = require('../models/salonOwner.model');
var twilio = require('twilio');
const { body, validationResult } = require('express-validator');
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


exports.getRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "please login account customer" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        RegisterService.getRegisterServiceById(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get booking service failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have booking service" });
                } else {
                    res.json({ data: data, message: "get booking service success" });
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
    var fiveDate=new Date();
    fiveDate.setDate(fiveDate.getDate()+5);
    if (date<new Date()||date>fiveDate) {
        return res.status(400).json({message:"timeUse within 5days "})
    }

    var dataRegisterService = {
        serviceId: req.body.serviceId,
        salonId: req.body.salonId,
        customerId: req.user.customerId,
        staffId: req.body.staffId,
        timeUse: req.body.timeUse,
        price_original: req.body.price_original,
        timeRegister: timeRegister,
        status_register_id:1
    };

    SalonOwner.checkTimeSalon(dataRegisterService.salonId, function (data) {
        var timeCloseDay = data[0].timeClose;
        var timeOpen = new Date("01-01-2017 " + data[0].timeOpen + ":00");
        var timeClose = new Date("01-01-2017 " + data[0].timeClose + ":00");
        var timeUse = new Date(req.body.timeUse);
        if (timeOpen.getHours() > timeUse.getHours() ||
            (timeOpen.getHours() == timeUse.getHours() && timeOpen.getMinutes() > timeUse.getMinutes()) ||
            timeUse.getHours() > timeClose.getHours ||
            (timeUse.getHours() == timeClose.getHours() && timeUse.getMinutes() > timeClose.getMinutes())) {
            return res.status(400).json({ message: "salon closed" });
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
                    for (let index = 0; index < totalSlotBusy; index++) {
                        slotBusy = slotStart + index;
                        var dataStaffCanleder = { staffId: staffId, slotTotal: slotTotal, slotBusy: slotBusy, date: date };
                        StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) { })
                    }
                    RegisterService.addRegisterService(dataRegisterService, function (data){
                        return res.status(400).json({data,message:"booking success"});
                    })


                }
            })



        }

    })



}
exports.cancelBooking = function (req, res, next) {
    var id = req.params.id;
    var customerId = req.user.customerId;
    if (customerId == null) {
        return res.status(400).json({ message: "please login account customer" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    console.log(req.user)

    RegisterService.getRegisterServiceById(id, function (data) {
        if (data.length == 0) {
            return res.status(400).json({ data: data, message: "booking khong ton tai" })
        } else {
            RegisterService.checkCustomer(id, req.user.customerId, function (data) {
                if (data.length == 0) {
                    return res.status(400).json({ data: data, message: "you  not have access" })
                }
                else {
                    StaffCanleder.cancelBooking(data[0].staffCanlederId, function (data) {
                        if (data == null) {
                            return res.json({ data: data, message: "cancel booking failed" });
                        } else {
                            RegisterService.cancelBooking(id, function (data) {
                                if (data == null) {
                                    return res.json({ data: data, message: "cancel booking failed" });
                                } else {
                                    return res.json({ data: data, message: "cancel booking success" });
                                }
                            });
                        }
                    });
                }

            })

        }

    });
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
exports.cancelBookingBySalon = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var registerServiceId = req.body.registerServiceId;
    var content = req.body.content;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    RegisterService.getRegisterServiceById(registerServiceId, function (data) {
        if (data.length == 0) {
            return res.status(400).json({ message: "booking service not exist" });
        } else {
            RegisterService.checkSalon(registerServiceId, salonId, function (data) {
                if (data.length == 0) {
                    return res.status(400).json({ message: "you not have access" });
                } else {
                    StaffCanleder.cancelBooking(data[0].staffCanlederId, function (data) {
                        if (data == null) {
                            return res.json({ data: data, message: "cancel booking failed" });
                        } else {
                            RegisterService.cancelBooking(registerServiceId, function (data) {
                                if (data == null) {
                                    return res.json({ data: data, message: "cancel booking failed" });
                                } else {
                                    RegisterService.getPhone(registerServiceId, function (data) {
                                        var phone = data[0].phone;
                                        phone = '+84' + phone.substr(1, 9);
                                        client.messages
                                            .create({
                                                body: 'message from salon:' + content,
                                                from: TWILIO_PHONE_NUMBER,
                                                to: phone
                                            })
                                            .then(message => console.log(message.sid));
                                        return res.json({ message: "cancel booking success,you sent a SMS to customer " });
                                    })


                                }
                            });
                        }
                    });
                }
            })
        }
    })
}
