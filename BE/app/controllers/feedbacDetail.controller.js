var FeedbackDetail = require('../models/feedback_detail.model');
const { body, validationResult } = require('express-validator');
exports.addFeedBackDetailBySalon = function (req, res, next) {
    var dataFeedBack = {
        salonId: req.body.salonId,
        feedbackId: req.body.feedbackId,
        content: req.body.content
    };
    var wsend = "salon";
    var dateCreate = new Date();
    dataFeedBackDetail = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    // res.json(dataFeedBack);
    try {
        FeedbackDetail.addFeedBackDetailBySalon(dataFeedBackDetail, function (data) {
            // res.json({data:data,message:"add feedback detail success"});    
            if (data == null) {
                res.status(400).json({ data: data, message: "add feedback detail failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "add feedback detail failed" });
                } else {
                    res.json({ data: data, message: "add feedback detail success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "add feedback detail failed" });
    }
}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    try {
        FeedbackDetail.getFeedbackDetail(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get feedback detail failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have feedback detail" });
                } else {
                    res.json({ data: data, message: "get feedback detail success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get feedback detail failed" });
    }
}
exports.deleteFeedbackDetailByFeedbackDetailId = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    try {
        FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "detete feedback detail failed" });
            } else {
                if (data.affectedRows) {
                    res.status(400).json({ data: data, message: "not have feed back detail to delete" });
                } else {
                    res.json({ data: data, message: "detete feedback detail success" });
                }

            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "detete feedback detail failed" });
    }

}
exports.updateFeedbackDetail = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = { content: req.body.content };
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    try {
        FeedbackDetail.updateFeedbackDetail(id, dataUpdate, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "update feedback detail failed" });
            } else {
                if (row.affectedRows == 0) {
                    res.status(400).json({ data: data, message: "not have feedback detail to update" });
                } else {
                    res.json({ data: data, message: "update feedback detail success" });
                }

            }
        });
    } catch (error) {
        res.status(400).json({ data: data, message: "update feedback detail failed" });
    }

}
exports.addFeedBackDetailByCustomer = function (req, res, next) {
    var dataFeedBack = {
        customerId: req.body.customerId,
        feedbackId: req.body.feedbackId,
        content: req.body.content
    };
    var wsend = "customer";
    var dateCreate = new Date();
    dataFeedBackDetail = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    // res.json(dataFeedBack);
    try {
        FeedbackDetail.addFeedBackDetailByCustomer(dataFeedBackDetail, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "add feedback detail failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "add feedback detail failed" });
                } else {
                    res.json({ data: data, message: "add feedback detail success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "add feedback detail failed" });
    }
}
