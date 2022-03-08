var Customer = require('../models/customer.model');
var Account = require('../models/account.model');
var StatusRegisterService = require('../models/statusRegisterService.model');
var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');
var FeedBack = require('../models/feedBack.model');
var FeedbackDetail = require('../models/feedback_detail.model');
const { body, validationResult } = require('express-validator');

exports.getAllCustomer = function (req, res, next) {
    res.json("wellcome to customer");
}
exports.getCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    console.log(req.user)
    // console.log(checkId)
    if (parseInt(req.user.account_id)==parseInt(id)) {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    try {
        Customer.getCustomerSalon(id, function (data) {
            if (data== null) {
                res.status(400).json({data:data,message:"get data customer 's profile failed"});
            } else {
                if (data.length==0) {
                    res.status(400).json({data:data,message:"not have customer 's profile"});
                } else {
                    res.json({data:data,message:"get data customer 's profile success"});
                }
            }
        });
    } catch (error) {
        res.status(400).json({data:error,message:"get data customer 's profile failed"});
    }
    }else{
        res.status(400).json({message:"you not have access"})
    }
    
}
exports.updateCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    var accountId=req.body.accountId;
    const errors = validationResult(req);
    console.log(req.user)
    // console.log(parseInt(req.user.customerId)==parseInt(id)&&parseInt(req.user.account_id)==parseInt(accountId))
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var dataUpdate = {
        nameCustomer:req.body.nameCustomer,
        phone:req.body.phone,
        address: req.body.address,
        birthday: req.body.birthday,

    };
    // Account.checkToken
if (req.user.account_id==accountId&&req.user.customerId==id) {
    Customer.updateProfileCustomer(id,dataUpdate, function (data){
        if (data==null) {
            res.status(400).json({data:data,message:"update data customer 's profile failed"})
        } else {
            if (data.affectedRows==0) {
                res.status(400).json({data:data,message:"not have data customer 's profile to update"})
            } else {
                res.json({data:data,message:"get data customer 's profile success"})
            }
        }
    })
} else {
    res.status(400).json({message:"you not have access"})
}
   

    
}










