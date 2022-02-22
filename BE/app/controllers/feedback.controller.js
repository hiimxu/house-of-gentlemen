var FeedBack = require('../models/feedBack.model');

exports.addFeedBackBySalon=function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="salon";
    var dateCreate = new Date();
    dataFeedBack={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedBack.addFeedBackBySalon(dataFeedBack,function (data) {
         res.json({ result: data });
    });
}
exports.getFeedbackOfSalon = function (req, res, next) {
    var id = req.params.id;
    FeedBack.getFeedbackOfSalon(id,function (data) {

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
    
    Feedback.updateFeedback(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}