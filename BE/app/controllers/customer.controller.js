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
exports.addFeedBackByCustomer = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="customer";
    var dateCreate = new Date();
    dataFeedBack={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedBack.addFeedBackByCustomer(dataFeedBack,function (data) {
         res.json({ result: data });
    });
}
exports.deleteFeedback=function (req, res, next) {
    var id= req.params.id;
    // chu y phai xoa feedback_detail truoc
    FeedbackDetail.deleteFeedbackDetailByFeedbackId(id,function (data) {
        FeedBack.deleteFeedback(id,function (data) {

            res.json({ result: data });
        });
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
exports.addFeedBackDetailByCustomer = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="customer";
    var dateCreate = new Date();
    dataFeedBackDetail={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedbackDetail.addFeedBackDetailByCustomer(dataFeedBackDetail,function (data) {
         res.json({ result: data });
    });
}
exports.deleteFeedbackDetailByFeedbackDetailId =function (req, res, next) {
    var id= req.params.id;
   
    FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateFeedbackDetail= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    
    FeedbackDetail.updateFeedbackDetail(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}
exports.getFeedbackOfSalon = function (req, res, next) {
    var id = req.params.id;
    FeedBack.getFeedbackOfSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    FeedbackDetail.getFeedbackDetail(id,function (data) {

        res.json({ result: data });
    });
}