var Customer = require('../models/customer.model');
var StatusRegisterService = require('../models/statusRegisterService.model');

exports.getAllCustomer = function (req, res, next) {
    res.json("wellcome to customer")
}
exports.getCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    Customer.getCustomerSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    
    Customer.updateProfileCustomer(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}
exports.getStatusRegisterService= function (req, res, next) {
    
    StatusRegisterService.getAllSatusRegisterService(function (data) {

        res.json({ result: data });
    });
   
}
exports.getStatusRegisterServiceById= function (req, res, next) {
    var id=req.params.id;
    StatusRegisterService.getSatusRegisterServiceById(id,function (data) {

        res.json({ result: data });
    });
   
}