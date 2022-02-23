var Customer = require('../models/customer.model');
var StatusRegisterService = require('../models/statusRegisterService.model');
var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');
var FeedBack = require('../models/feedBack.model');
var FeedbackDetail = require('../models/feedback_detail.model');

exports.getAllCustomer = function (req, res, next) {
    res.json("wellcome to customer")
}
exports.getCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    Customer.getCustomerSalon(id, function (data) {

        res.json(data);
    });
}
exports.updateCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = req.body;

    Customer.updateProfileCustomer(id, dataUpdate, function (data) {

        res.json(data);
    });
}







exports.updateFeedback = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    
    FeedBack.updateFeedback(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}



