var Account = require('../models/account.model')
var SalonOwner = require('../models/salonOwner.model');
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
exports.getSalonAccount = function (req, res, next) {
    try {
        var data = Account.getAllAccountSalon( function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
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

