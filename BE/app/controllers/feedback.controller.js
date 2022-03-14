var FeedBack = require('../models/feedBack.model');
var FeedbackDetail = require('../models/feedback_detail.model');
const { body, validationResult } = require('express-validator');

exports.addFeedBackBySalon = function (req, res, next) {
    var rate= req.body.rate;
    var dataFeedBack = {
        salonId: req.user.salonId,
        rate: req.body.rate,
        content: req.body.content
    };
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var checkRate=['1','2','3','4','5','6','7','8','9','10'];
    if (!checkRate.includes(rate)) {
        return res.status(400).json({message: "please check rate" });
    }else{
        var wsend = "salon";
        var dateCreate = new Date();
        dataFeedBack = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
        // res.json(dataFeedBack);
        try {
            FeedBack.addFeedBackBySalon(dataFeedBack, function (data) {
                if (data == null) {
                    res.status(400).json({ data: data, message: "add feedback failed" });
                } else {
                    res.json({ data: data, message: "add feedback success" });
                }
            });
        } catch (error) {
            res.status(400).json({ data: error, message: "add feedback failed" });
        }
    }
    
}
exports.getFeedbackOfSalon = function (req, res, next) {
    var id = req.user.salonId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    try {
        FeedBack.getFeedbackOfSalon(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get feedback failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have feed back" });
                } else {
                    res.json({ data: data, message: "get feedback success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get feedback failed" });
    }
}
exports.getFeedbackOfSalonByCustomer = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    
    try {
        FeedBack.getFeedbackOfSalon(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get feedback failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have feed back" });
                } else {
                    res.json({ data: data, message: "get feedback success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get feedback failed" });
    }
}
exports.getFeedbackOfSalon = function (req, res, next) {
    var id = req.user.salonId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    try {
        FeedBack.getFeedbackOfSalon(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get feedback failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have feed back" });
                } else {
                    res.json({ data: data, message: "get feedback success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get feedback failed" });
    }
}
exports.deleteFeedbackBySalon = function (req, res, next) {
    var id = req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var wsend='salon';
    // chu y phai xoa feedback_detail truoc
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    FeedBack.checkEmpty(id, function (data){
        if (data.length==0) {
            res.status(400).json({ data: data, message:"feedback is empty"})
        } else {
            FeedBack.checkPermission(id,salonId,wsend, function (data){
                if (data.length == 0) {
                    res.status(400).json({ data: data, message:"you not have permission"})
                } else {
                    try {
                        FeedbackDetail.deleteFeedbackDetailByFeedbackId(id, function (data) {
                            FeedBack.deleteFeedback(id, function (data) {
                
                                if (data == null) {
                                    res.status(400).json({ data: data, message: "delete feedback failed" });
                                } else {
                                    if (data.affectedRows == 0) {
                                        res.status(400).json({ data: data, message: "not have feedback to delete" });
                                    } else {
                                        res.json({ data: data, message: "delete feedback success" });
                                    }
                
                                }
                            });
                        });
                    } catch (error) {
                        res.status(400).json({ data: error, message: "delete feedback failed" });
                    }
                }

            })
        }
    })
   

}
exports.deleteFeedbackByCustomer = function (req, res, next) {
    var id = req.params.id;
    var customerId= req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }

    // chu y phai xoa feedback_detail truoc
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    FeedBack.checkEmpty(id, function (data){
        if (data.length==0) {
           return res.status(400).json({ data: data, message:"feedback is empty"})
        } else {
            FeedBack.checkPermissionCustomer(id,customerId, function (data){
                if (data.length == 0) {
                    res.status(400).json({ data: data, message:"you not have permission"})
                } else {
                    try {
                        FeedbackDetail.deleteFeedbackDetailByFeedbackId(id, function (data) {
                            FeedBack.deleteFeedback(id, function (data) {
                
                                if (data == null) {
                                    res.status(400).json({ data: data, message: "delete feedback failed" });
                                } else {
                                    if (data.affectedRows == 0) {
                                        res.status(400).json({ data: data, message: "not have feedback to delete" });
                                    } else {
                                        res.json({ data: data, message: "delete feedback success" });
                                    }
                
                                }
                            });
                        });
                    } catch (error) {
                        res.status(400).json({ data: error, message: "delete feedback failed" });
                    }
                }

            })
        }
    })
   

}
exports.updateFeedbackBySalon = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = {
        content: req.body.content,
        rate: req.body.rate,
        salonId: req.user.salonId,
    };
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    console.log(dataUpdate)
    wsend='salon';
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var checkRate=[1,2,3,4,5,6,7,8,9,10];
    if (!checkRate.includes(parseInt(dataUpdate.rate))) {
        return res.status(400).json({message: "please check rate" });
    }
    FeedBack.checkEmpty(id, function (data){
        if (data.length== 0) {
            res.status(400).json({ data: data, message:"feedback is empty"})
        } else {
            FeedBack.checkPermission(id,dataUpdate.salonId,wsend, function (data){
                if (data.length == 0) {
                    res.status(400).json({ data: data, message:"you not have permission"})
                } else {
                    try {
                        FeedBack.updateFeedback(id, dataUpdate, function (data) {
                
                            if (data == null) {
                                res.status(400).json({ result: data, message: "update feedback failed" });
                            } else {
                                if (data.affectedRows) {
                                    res.status(400).json({ result: data, message: "check id feedback to update" });
                                } else {
                                    res.json({ result: data, message: "update feedback success" });
                                }
                
                            }
                        });
                    } catch (error) {
                        res.status(400).json({ result: error, message: "update feedback failed" });
                    }
                }
            })
        }
    })
    

}
exports.updateFeedbackByCustomer = function (req, res, next) {
    var id = req.params.id;
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }
    var dataUpdate = {
        content: req.body.content,
        rate: req.body.rate,
    };
    wsend='customer';
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var checkRate=[1,2,3,4,5,6,7,8,9,10];
    if (!checkRate.includes(parseInt(dataUpdate.rate))) {
        return res.status(400).json({message: "please check rate" });
    }
    FeedBack.checkEmpty(id, function (data){
        if (data.length== 0) {
            res.status(400).json({ data: data, message:"feedback is empty"})
        } else {
            FeedBack.checkPermissionCustomer(id,customerId, function (data){
                if (data.length == 0) {
                    res.status(400).json({ data: data, message:"you not have permission"})
                } else {
                    try {
                        FeedBack.updateFeedback(id, dataUpdate, function (data) {
                
                            if (data == null) {
                                res.status(400).json({ result: data, message: "update feedback failed" });
                            } else {
                                if (data.affectedRows==0) {
                                    res.status(400).json({ result: data, message: "check id feedback to update" });
                                } else {
                                    res.json({ result: data, message: "update feedback success" });
                                }
                
                            }
                        });
                    } catch (error) {
                        res.status(400).json({ result: error, message: "update feedback failed" });
                    }
                }
            })
        }
    })
    

}
exports.addFeedBackByCustomer = function (req, res, next) {
    var customerId=req.user.customerId;
    if (customerId==null) {
       return res.status(400).json({message:"please login account customer"});
    }
    var dataFeedBack = {
        customerId: req.body.req.user.customerId,
        salonId: req.body.salonId,
        content: req.body.content,
        rate: req.body.rate
    };
    if (req.user.customerId==dataFeedBack.customerId) {
        var wsend = "customer";
    var dateCreate = new Date();
    dataFeedBack = { wsend: wsend, dateCreate: dateCreate, ...dataFeedBack }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var checkRate=['1','2','3','4','5','6','7','8','9','10'];
    if (!checkRate.includes(dataFeedBack.rate)) {
        return res.status(400).json({message: "please check rate" });
    }
    try {
        FeedBack.addFeedBackByCustomer(dataFeedBack, function (data) {
            if (data == null) {
                res.status(400).json({ result: data, message: "add feedback failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ result: data, message: "add feedback failed" });
                } else {
                    res.json({ result: data, message: "add feedback success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ result: error, message: "add feedback failed" });
    }
    } else {
        res.status(400).json({message:"you not have access"});
    }
    
}