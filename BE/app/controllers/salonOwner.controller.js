var SalonOwner = require('../models/salonOwner.model');
var Address = require('../models/address.model');
var ImageSalon = require('../models/imageSalon.model');
var Account = require('../models/account.model');
const { body, validationResult } = require('express-validator');
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        var data = SalonOwner.getProfileSalon(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get salon 's profile failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "get salon 's profile failed" });
                }
                else {
                    res.json({ data: data, message: "get salon 's profile success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get salon 's profile failed" });
    }
}
exports.getAllSalon = function (req, res, next) {
    try {
        var data = SalonOwner.getProfileAllSalon(function (data) {
            if (data == null) { res.status(400).json({ data: data, message: "get all salon failed" }); }
            else {
                res.json({ data: data, message: "get all salon success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: data, message: "get all salon failed" });
    }

}
exports.searchSalonByName = function (req, res, next) {
    var name = req.body.name;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    SalonOwner.searchSalonByName(name,function (data) {
        res.json({ data: data, message: "search salon" });
    })
}
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.body.id;
    var possibility = req.body.possibility;
    
    var checkPossibility = ['1', '0'];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!checkPossibility.includes(req.body.possibility)) {
        res.status(400).json({ message: "check possibility" });
        return;
    }
    console.log(possibility)
    
    try {
        var data = SalonOwner.setPossitiveSalonOwner(id, possibility, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "set salon's possitive failed" });
            } else {
                if (data.affectedRows == 0) {
                    res.status(400).json({ data: data, message: "not have data update" });
                } else
                    if (data.changedRows == 0) {
                        res.status(400).json({ data: data, message: "data not change" });
                    }
                    else {
                        if (possibility==1) {
                            res.json({ data: data, message: "set salon's possitive success" });
                        } else {
                            res.json({ data: data, message: "set salon's impossitive success" });
                        }
                    }
            }
        });
    } catch (error) {
        res.status(400).json({ data: data, message: "set salon's possitive failed" });
    }
}
exports.salonOwner = function (req, res, next) {
    try {
        SalonOwner.getAll(function (data) {
            if (data == null) { res.status(400).json({ data: data, message: "get salonowner failed" }); }
             else {
                res.json({ data: data, message: "get salonowner success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get salonowner failed" });
    }
}

exports.getSalonOwnerProfile = function (req, res, next) {
    var id = req.user.account_id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    
    try {
        SalonOwner.getProfileSalonBySalonId(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "get salon 's profile failed" });
            }
            else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have infor to see" });
                } else { res.json({ data: data, message: "get salon 's profile success" }); }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get salon 's profile failed" });
    }
}
exports.updateSalonOwnerProfile = function (req, res, next) {
    var account_id = req.body.account_id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    console.log(req.user)
    var dataUpdate = {
        nameSalon: req.body.nameSalon,
        phone: req.body.phone,
        taxCode: req.body.taxCode,
        timeOpen: req.body.timeOpen,
        timeClose: req.body.timeClose,
    };
    var addressUpdate = {
        city: req.body.city,
        district: req.body.district,
        detailAddress: req.body.detailAddress,
    }
    var image = req.body.image;
    var email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Account.updateEmail(account_id,email, function (data){
        Address.updateAddressSalon(salonId,addressUpdate, function (data){
            ImageSalon.updateImage(salonId,image,function (data){
                SalonOwner.updateProfileSalon(salonId, dataUpdate, function (data) {
                    if (data == null) {
                        res.status(400).json({ data: data, message: "update salon 's profile failed" });
                    }
                    else {
                        if (data.affectedRows == 0) {
                            res.status(400).json({ data: data, message: "not have salon 's profile to update" });
                        } else {
                            res.json({ data: data, message: "update salon 's profile success" });
                        }
                    }
                });

            })
            
        })

    })

        
    

}
