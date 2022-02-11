var SalonOwner = require('../models/salonOwner.model')

exports.salonOwner = function (req, res, next) {
    SalonOwner.getAll(function (data) {
        res.json({ result: data });
    });
}