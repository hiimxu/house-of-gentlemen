var FeedbackDetail = require('../models/feedback_detail.model');
exports.addFeedBackDetailBySalon = function (req, res, next) {
    var dataFeedBack = req.body;
    var wsend = "salon";
    var dateCreate = new Date();
    dataFeedBackDetail = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    // res.json(dataFeedBack);
    try {
        FeedbackDetail.addFeedBackDetailBySalon(dataFeedBackDetail, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    try {
        FeedbackDetail.getFeedbackDetail(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.deleteFeedbackDetailByFeedbackDetailId = function (req, res, next) {
    var id = req.params.id;
    try {
        FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.updateFeedbackDetail = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = req.body;
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };
    try {
        FeedbackDetail.updateFeedbackDetail(id, dataUpdate, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.addFeedBackDetailByCustomer = function (req, res, next) {
    var dataFeedBack = req.body;
    var wsend = "customer";
    var dateCreate = new Date();
    dataFeedBackDetail = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    // res.json(dataFeedBack);
    try {
        FeedbackDetail.addFeedBackDetailByCustomer(dataFeedBackDetail, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
