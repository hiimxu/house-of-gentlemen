var SalonOwner = require('../models/salonOwner.model');
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    var data = SalonOwner.getProfileSalon(id, function (data) {
        res.json({ data });
    });
}
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.params.id;
    var possibility=req.body.possibility;
    var data = SalonOwner.setPossitiveSalonOwner(id,possibility, function (data) {
        res.json({ data });
    });
}