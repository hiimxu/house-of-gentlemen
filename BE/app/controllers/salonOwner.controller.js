var SalonOwner = require('../models/salonOwner.model');
exports.getSalon = function (req, res, next) {
    var id = req.params.id;
    try {
        var data = SalonOwner.getProfileSalon(id, function (data) {
            if (data == null) {
                res.json({ data: data, message: "get salon 's profile failed" });
            } else {
                res.json({ data: data, message: "get salon 's profile success" });
            }
        });
    } catch (error) {
        res.json({ data: error, message: "get salon 's profile failed" });
    }
}
exports.getAllSalon = function (req, res, next) {
    try {
        var data = SalonOwner.getProfileAllSalon(function (data) {
            if (data == null) { res.json({ data: data, message: "get salon 's profile failed" }); }
            else {
                res.json({ data: data, message: "get salon 's profile success" });
            }
        });
    } catch (error) {
        res.json({ data: data, message: "get salon 's profile failed" });
    }

}
exports.setPossitiveSalonOwner = function (req, res, next) {
    var id = req.params.id;
    var possibility = req.body.possibility;
    try {
        var data = SalonOwner.setPossitiveSalonOwner(id, possibility, function (data) {
            if (data == null) {
                res.json({ data: data, message: "set salon's possitive failed" });
            } else {
                res.json({ data: data, message: "set salon's possitive success" });
            }
        });
    } catch (error) {
        res.json({ data: data, message: "set salon's possitive failed" });
    }
}
exports.salonOwner = function (req, res, next) {
    try {
        SalonOwner.getAll(function (data) {
            if (data == null) { res.json({ data: data, message: "get salonowner failed" }); } else {
                res.json({ data: data, message: "get salonowner success" });
            }
        });
    } catch (error) {
        res.json({ data: error, message: "get salonowner failed" });
    }
}

exports.getSalonOwnerProfile = function (req, res, next) {
    var id = req.params.id;
    try {
        SalonOwner.getProfileSalon(id, function (data) {
            if (data == null) {
                res.json({ data: data, message: "get salon 's profile failed" });
            }
            else {
                res.json({ data: data, message: "get salon 's profile success" });
            }
        });
    } catch (error) {
        res.json({ data: error, message: "get salon 's profile failed" });
    }
}
exports.updateSalonOwnerProfile = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = req.body;
    try {
        SalonOwner.updateProfileSalon(id, dataUpdate, function (data) {
            if (data == null) {
                res.json({ data: data, message: "get salon 's profile failed" });
            }
            else {
                res.json({ data: data, message: "get salon 's profile success" });
            }
        });
    } catch (error) {
        res.json({ data: error, message: "get salon 's profile failed" })
    }

}
