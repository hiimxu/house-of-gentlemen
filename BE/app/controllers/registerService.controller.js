var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');
var twilio = require('twilio');
const { body, validationResult } = require('express-validator');
var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


exports.getRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    var customerId=req.user.customerId;
    if (customerId==null) {
      return  res.status(400).json({message:"please login account customer"});
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
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
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
    var staffId = req.body.staffId;
    var date = new Date(req.body.timeUse);
    var statusId = 3;
    var timeRegister = new Date();
    var status_register_id = 1;
    var timeBusy = req.body.service_time;
    console.log("busy" + timeBusy)
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }


    var dataStaffCanleder = { staffId: staffId, date: date, statusId: statusId, timeBusy: timeBusy };
    var dataRegisterService = {
        serviceId: req.body.serviceId,
        salonId: req.body.salonId,
        customerId: req.user.customerId,
        staffId: req.body.staffId,
        timeUse: req.body.timeUse,
        price_original: req.body.price_original,
        timeRegister: timeRegister
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }

    dataRegisterService = { timeRegister, status_register_id, ...dataRegisterService };
    var today = new Date();
    var check1 = new Date(date);
    var check2 = new Date(date);
    check1.setDate(check1.getDate() - 1);
    check2.setDate(check2.getDate() + 1);
    var Times = 0;
    if (date < today) {
        res.status(400).json({ message: "use time must after now" });
    } else if (date > today.setDate(today.getDate() + 5)) {
        res.status(400).json({ message: "use time must be within 5 days" });
    } else {
        StaffCanleder.checkCanleder(check1, check2, staffId, function (data) {
            for (let index = 0; index < data.length; index++) {
                var checktime1 = new Date(data[index].date);
                var checktime2 = new Date(data[index].date);
                checktime1.setMinutes(checktime1.getMinutes() + data[index].timeBusy);
                checktime2.setMinutes(checktime2.getMinutes() - timeBusy);
                if (((checktime1 > date) && (date >= new Date(data[index].date))) || ((checktime2 < date) && (date < new Date(data[index].date)))) {
                    Times = Times + 1;
                }
            }
            if (Times > 0) {
                res.status(400).json({ message: "Staff busy" })
            } else {
                try {
                    StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) {
                        var staffCanlederId = data.staffCanlederId;
                        dataRegisterService = { staffCanlederId, ...dataRegisterService };
                        if (data == null) {
                            return res.status(400).json({ data: data, message: "add staff cander failed" });
                        } else if (data.length == 0) {
                            return res.status(400).json({ data: data, message: "add staff cander failed" });
                        }
                        else {
                            RegisterService.addRegisterService(dataRegisterService, function (data) {
                                if (data == null) {
                                    res.status(400).json({ data: data, message: "booking service failed" });
                                } else {
                                    if (data.length == 0) {
                                        res.status(400).json({ data: data, message: "booking service failed" });
                                    } else {
                                        res.json({ data: data, message: "booking service success" });
                                    }
                                }
                            });
                        }

                    });
                } catch (error) {
                    res.status(400).json({ data: error, message: "booking service failed" });
                }
            }
        })
    }

}
exports.cancelBooking = function (req, res, next) {
    var id = req.params.id;
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
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
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
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
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var registerServiceId = req.body.registerServiceId;
    var content=req.body.content;
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
                                        phone='+84'+phone.substr(1,9);
                                        client.messages
                                            .create({
                                                body: 'message from salon:'+content,
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
