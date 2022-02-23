var Account = require('../models/account.model')
var SalonOwner = require('../models/salonOwner.model');
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.params.id;
    var possibility=req.body.possibility;
    var data = SalonOwner.setPossitiveSalonOwner(id,possibility, function (data) {
        res.json(data);
    });
}
exports.getSalonAccount = function (req, res, next) {
    var data = Account.getAllAccountSalon( function (data) {
        res.json(data);
    });
}
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    var data = SalonOwner.getProfileSalon(id, function (data) {
        res.json(data);
    });
}

