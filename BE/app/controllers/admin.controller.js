var Account = require('../models/account.model')
var SalonOwner = require('../models/salonOwner.model');
const { body, validationResult } = require('express-validator');
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.params.id;
    var possibility=req.body.possibility;
    try {
        SalonOwner.setPossitiveSalonOwner(id,possibility, function (data) {
            if (data== null) {
                res.status(400).json({data:data,message:"set possitive for salon failed"});
            } else {
                res.json({data:data,message:"set possitive for salon success"});
            }
        });
    } catch (error) {
        res.status(400).json({data:error,message:"set possitive for salon failed"});
    }
}
exports.getSalonAccount = function (req, res, next) {
    try {
        var data = Account.getAllAccountSalon( function (data) {
           if (data== null) {
            res.status(400).json({data:data,message:"get account salon failed"});
           } else {
            res.json({data:data,message:"get account salon successed"});
           }
        });
    } catch (error) {
        res.status(400).json({data:error,message:"get account salon failed"});
    }
}
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    try {
        var data = SalonOwner.getProfileSalon(id, function (data) {
            if (data== null) {
                res.status(400).json({data:data,message:"get profile salon failed"});
            } else {
                res.json({data:data,message:"get profile salon successed"});
            }
        });
    } catch (error) {
        res.status(400).json({data:error,message:"get profile salon failed"});
    }
}

