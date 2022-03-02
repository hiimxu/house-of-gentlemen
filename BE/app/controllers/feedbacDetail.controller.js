var FeedbackDetail = require('../models/feedback_detail.model');
exports.addFeedBackDetailBySalon = function (req, res, next) {
    var dataFeedBack={salonId:req.body.salonId,
        feedbackId:req.body.feedbackId,
        content: req.body.content
        };
    var wsend="salon";
    var dateCreate = new Date();
    dataFeedBackDetail={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    try {
        FeedbackDetail.addFeedBackDetailBySalon(dataFeedBackDetail,function (data) {
            // res.json({data:data,message:"add feedback detail success"});    
           if (data== null) {
            res.json({data:data,message:"add feedback detail failed"});
           } else {
            if (data.length== 0) {
                res.json({data:data,message:"add feedback detail failed"});
            }else{
                res.json({data:data,message:"add feedback detail success"});
            }
           }
       });
    } catch (error) {
        res.json({data:error,message:"add feedback detail failed"});
    }
}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    try {
        FeedbackDetail.getFeedbackDetail(id,function (data) {

            if (data== null) {
                res.json({data:data,message:"get feedback detail failed"});
            } else {
                if (data.length==0) {
                    res.json({data:data,message:"not have feedback detail"});
                } else {
                    res.json({data:data,message:"get feedback detail success"});
                }
            }
        });
    } catch (error) {
        res.json({data:error,message:"get feedback detail failed"});
    }
}
exports.deleteFeedbackDetailByFeedbackDetailId=function (req, res, next) {
    var id= req.params.id;
   try {
    FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id,function (data) {

        if (data== null) {
           res.json({data:data,message:"detete feedback detail failed"});
        } else {
            if (data.affectedRows) {
                res.json({data:data,message:"not have feed back detail to delete"});
            } else {
                res.json({data:data,message:"detete feedback detail success"});  
            }
           
        }
    });
   } catch (error) {
    res.json({data:error,message:"detete feedback detail failed"});
   }
    
}
exports.updateFeedbackDetail= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate={content:req.body.content};
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    try {
        FeedbackDetail.updateFeedbackDetail(id,dataUpdate,function (data) {
            if (data== null) {
                res.json({data:data,message:"update feedback detail failed"});
            } else {
                if (row.affectedRows==0) {
                    res.json({data:data,message:"not have feedback detail to update"});
                } else {
                    res.json({data:data,message:"update feedback detail success"});
                }
               
            }
        });
    } catch (error) {
        res.json({data:data,message:"update feedback detail failed"});
    }
    
}
exports.addFeedBackDetailByCustomer = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="customer";
    var dateCreate = new Date();
    dataFeedBackDetail={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    try {
        FeedbackDetail.addFeedBackDetailByCustomer(dataFeedBackDetail,function (data) {
            if (data== null) {
                res.json({data:data,message:"add feedback detail failed"});
            } else {
                res.json({data:data,message:"add feedback detail success"});
            }
       });
    } catch (error) {
        res.json({data:error,message:"add feedback detail failed"});
    }
}
