var FeedBack = require('../models/feedBack.model');

exports.addFeedBackBySalon=function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="salon";
    var dateCreate = new Date();
    dataFeedBack={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    try {
        FeedBack.addFeedBackBySalon(dataFeedBack,function (data) {
            res.json(data);
       });
    } catch (error) {
        res.json(error);
    }
}
exports.getFeedbackOfSalon = function (req, res, next) {
    var id = req.params.id;
    try {
        FeedBack.getFeedbackOfSalon(id,function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.deleteFeedback=function (req, res, next) {
    var id= req.params.id;
    // chu y phai xoa feedback_detail truoc
    try {
        FeedbackDetail.deleteFeedbackDetailByFeedbackId(id,function (data) {
            FeedBack.deleteFeedback(id,function (data) {
    
                res.json(data);
            });
        });
    } catch (error) {
        res.json(error);
    }
    
}
exports.updateFeedback = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    try {
        Feedback.updateFeedback(id,dataUpdate,function (data) {

            res.json({ result: data });
        });
    } catch (error) {
        res.json(error);
    }
    
}
exports.addFeedBackByCustomer = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="customer";
    var dateCreate = new Date();
    dataFeedBack={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    try {
        FeedBack.addFeedBackByCustomer(dataFeedBack,function (data) {
            res.json({ result: data });
       });
    } catch (error) {
        res.json(error);
    }
}