var Customer = require('../models/customer.model');
var StatusRegisterService = require('../models/statusRegisterService.model');
var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');

exports.getAllCustomer = function (req, res, next) {
    res.json("wellcome to customer")
}
exports.getCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    Customer.getCustomerSalon(id, function (data) {

        res.json({ result: data });
    });
}
exports.updateCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = req.body;

    Customer.updateProfileCustomer(id, dataUpdate, function (data) {

        res.json({ result: data });
    });
}
exports.getStatusRegisterService = function (req, res, next) {

    StatusRegisterService.getAllSatusRegisterService(function (data) {

        res.json({ result: data });
    });

}
exports.getStatusRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    StatusRegisterService.getSatusRegisterServiceById(id, function (data) {

        res.json({ result: data });
    });

}
exports.getRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    RegisterService.getRegisterServiceById(id, function (data) {

        res.json({ result: data });
    });

}
exports.getRegisterServiceByCustomer = function (req, res, next) {
    var id = req.params.id;
    RegisterService.getRegisterServiceByCustomer(id, function (data) {

        res.json({ result: data });
    });

}
exports.addRegisterService = function (req, res, next) {
    var staffId = req.body.staffId;
    var date = req.body.timeUse;
    var statusId = 3;
    var timeRegister = new Date();
    var status_register_id = 1;
    var dataStaffCanleder = { staffId: staffId, date: date, statusId: statusId };
    var dataRegisterService = req.body;
    dataRegisterService = { timeRegister, status_register_id, ...dataRegisterService };
    // res.json(dataRegisterService);
    StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) {
        var staffCanlederId = data.staffCanlederId;
        dataRegisterService = { staffCanlederId, ...dataRegisterService };
        
        RegisterService.addRegisterService(dataRegisterService, function (data) {
           res.json({ result: data}); 
            
        });
        
    });
}