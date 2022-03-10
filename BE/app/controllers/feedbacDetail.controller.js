var FeedbackDetail = require('../models/feedback_detail.model');
var FeedBack = require('../models/feedBack.model');
var SalonOwner = require('../models/salonOwner.model');
const { body, validationResult } = require('express-validator');
exports.addFeedBackDetailBySalon = function (req, res, next) {
    var dataFeedBack = {
        salonId: req.user.salonId,
        feedbackId: req.body.feedbackId,
        content: req.body.content
    };
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var wsend = "salon";
    var dateCreate = new Date();
    dataFeedBackDetail = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    // res.json(dataFeedBack);
   
            FeedBack.checkFeedBackofSalon(dataFeedBack.salonId, dataFeedBack.feedbackId, function (data) {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "feedback khong nam trong salon" })
                } else {
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
            })


}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
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
exports.deleteFeedbackDetailByFeedbackDetailIdBySalon = function (req, res, next) {
    var id = req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    FeedbackDetail.checkEmpty(id, function (data) {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "feedback detail is empty" });
        }
        else {
            FeedbackDetail.checkPermissionOfSalon(id, salonId, function (data) {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "ban khong co quyen xoa feedback detail" })
                } else {
                    try {
                        FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id, function (data) {

                            if (data == null) {
                                res.status(400).json({ data: data, message: "detete feedback detail failed" });
                            } else {
                                if (data.affectedRows == 0) {
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
            })

        }

    })



}
exports.deleteFeedbackDetailByFeedbackDetailId = function (req, res, next) {
    var id = req.params.id;
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        FeedbackDetail.checkEmpty(id, function (data) {
            if (data == 0) {
                return res.status(400).json({ data: data, message: "feedbackdetail not exist" })
            }
            else {
                FeedbackDetail.checkPermissionCustomer(id, customerId, function (data) {
                    if (data.length == 0) {
                        return res.status(400).json({ message: "you not have access" })
                    } else {
                        FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id, function (data) {

                            if (data == null) {
                                res.status(400).json({ data: data, message: "detete feedback detail failed" });
                            } else {
                                if (data.affectedRows == 0) {
                                    res.status(400).json({ data: data, message: "not have feed back detail to delete" });
                                } else {
                                    res.json({ data: data, message: "detete feedback detail success" });
                                }

                            }
                        });
                    }
                })

            }
        })

    } catch (error) {
        res.status(400).json({ data: error, message: "detete feedback detail failed" });
    }

}
exports.updateFeedbackDetailBySalon = function (req, res, next) {
    var id = req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var wsend = 'salon';
    var dataUpdate = { content: req.body.content, salonId: req.user.salonId };
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    FeedbackDetail.checkEmpty(id, function (data) {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "feedback detail not empty" })
        } else {
            FeedbackDetail.checkPermission(id, dataUpdate.salonId, wsend, function (data) {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "you not have permission" })
                } else {
                    try {
                        FeedbackDetail.updateFeedbackDetail(id, dataUpdate, function (data) {
                            if (data == null) {
                                res.status(400).json({ data: data, message: "update feedback detail failed" });
                            } else {
                                if (data.affectedRows == 0) {
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

            })
        }

    })


}
exports.updateFeedbackDetailByCustomer = function (req, res, next) {
    var id = req.params.id;
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }
    var dataUpdate = { content: req.body.content };
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    FeedbackDetail.checkEmpty(id, function (data) {
        if (data.length == 0) {
            return res.status(400).json({message:"feedback detail not exist"})
        }else{
            FeedbackDetail.checkEmptyByCustomer(id,customerId, function (data){
                if (data.length == 0) {
                    return res.status(400).json({message:"you not have access"})
                } else {
                    try {
                        FeedbackDetail.updateFeedbackDetail(id, dataUpdate, function (data) {
                            if (data == null) {
                                res.status(400).json({ data: data, message: "update feedback detail failed" });
                            } else {
                                if (data.affectedRows == 0) {
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
            })
        }
    })


}
exports.addFeedBackDetailByCustomer = function (req, res, next) {
    var dataFeedBack = {
        customerId: req.user.customerId,
        feedbackId: req.body.feedbackId,
        content: req.body.content
    };
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }
    var wsend = "customer";
    var dateCreate = new Date();
    dataFeedBackDetail = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
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
