var SalonOwner = require('../models/salonOwner.model');

exports.salonOwner = function (req, res, next) {
    try {
        SalonOwner.getAll(function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}

exports.getSalonOwnerProfile = function (req, res, next) {
    var id = req.params.id;
    try {
        SalonOwner.getProfileSalon(id,function (data) {
            res.json(data);
       });
    } catch (error) {
        res.json(error);
    }
}
exports.updateSalonOwnerProfile= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    try {
        SalonOwner.updateProfileSalon(id,dataUpdate,function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
    
}


