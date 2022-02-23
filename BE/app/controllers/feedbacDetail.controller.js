var FeedbackDetail = require('../models/feedback_detail.model');
exports.addFeedBackDetailBySalon = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="salon";
    var dateCreate = new Date();
    dataFeedBackDetail={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedbackDetail.addFeedBackDetailBySalon(dataFeedBackDetail,function (data) {
         res.json(data);
    });
}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    FeedbackDetail.getFeedbackDetail(id,function (data) {

        res.json(data);
    });
}
exports.deleteFeedbackDetailByFeedbackDetailId=function (req, res, next) {
    var id= req.params.id;
   
    FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id,function (data) {

        res.json(data);
    });
}
exports.updateFeedbackDetail= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    
    FeedbackDetail.updateFeedbackDetail(id,dataUpdate,function (data) {

        res.json(data);
    });
}
exports.addFeedBackDetailByCustomer = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="customer";
    var dateCreate = new Date();
    dataFeedBackDetail={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedbackDetail.addFeedBackDetailByCustomer(dataFeedBackDetail,function (data) {
         res.json(data);
    });
}
