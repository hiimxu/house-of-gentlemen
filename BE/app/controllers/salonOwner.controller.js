var SalonOwner = require('../models/salonOwner.model');
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    try {
        var data = SalonOwner.getProfileSalon(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.getAllSalon = function (req, res, next) {
   try {
    var data = SalonOwner.getProfileAllSalon( function (data) {
        res.json(data);
    });
   } catch (error) {
       res.json(error);
   }
    
}
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.params.id;
    var possibility=req.body.possibility;
    try {
        var data = SalonOwner.setPossitiveSalonOwner(id,possibility, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}