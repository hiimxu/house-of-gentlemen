var StatusStaff= require('../models/statusStaff.model')
const { body, validationResult } = require('express-validator');


exports.getAllStaffStatus= function (req, res, next) {
    StatusStaff.getAllStaffStatus( function (data) {

        if (data == null) {
            res.status(400).json({ data: data, message: "get status fail" });
        } else {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "not have status " });
        } else {
            res.json({ data: data, message: "get status success" });
        }
        }
    });
}
exports.getStaffStatusByIdstatusStaff= function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    StatusStaff.getStaffStatusByIdstatusStaff(id, function (data) {

        if (data == null) {
            res.status(400).json({ data: data, message: "get status fail" });
        } else {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "not have status " });
        } else {
            res.json({ data: data, message: "get status success" });
        }
        }
    });
}
