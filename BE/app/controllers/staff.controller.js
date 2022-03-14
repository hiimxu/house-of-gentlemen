var Staff = require('../models/satff.model');
const { body, validationResult } = require('express-validator');
exports.getStaff = function (req, res, next) {
    var id = req.user.salonId;
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        Staff.getStaff(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, success: "get staff fail" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, success: "not have staff" });
                } else {
                    res.json({ data: data, success: "get staff success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, success: "get staff fail" });
    }

}
exports.getStaffByCustomer = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        Staff.getStaff(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, success: "get staff fail" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, success: "not have staff" });
                } else {
                    res.json({ data: data, success: "get staff success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, success: "get staff fail" });
    }

}
exports.addStaff = function (req, res, next) {

    var data = {
        salonId: req.user.salonId,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address
    }
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        Staff.addStaff(data, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, success: "add staff failed" });
            } else {
                res.json({ data: data, success: "add staff success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, success: "add staff fail" });
    }

}
exports.updateStaff = function (req, res, next) {
    var id = req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }

    var dataUpdate = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    Staff.checkPermission(id, salonId, function (data) {
        if (data == null) {
            return res.status(400).json({ message: "error mysql" })
        } else if (data.length == 0) {
            return res.status(400).json({ message: "you not have access" })
        }
        else {

            try {
                Staff.updateStaff(id, dataUpdate, function (data) {
                    if (data == null) {
                        res.status(400).json({ data: data, message: 'update failed' });
                    } else {
                        if (data.affectedRows == 0) {
                            res.status(400).json({ data: data, message: 'not have to update' });
                        } else {
                            res.json({ data: data, message: 'update success' });
                        }

                    }
                });
            } catch (error) {
                res.status(400).json({ data: error, message: "update failed" });
            }

        }
    })


}
exports.deleteStaff = function (req, res, next) {
    var id = req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    Staff.checkPermission(id, salonId, function (data) {
        if (data[0].salonId == null) {
            return res.status(400).json({ message: "error mysql" })
        } else if (data.length == 0) {
            return res.status(400).json({ message: "you not have access" })
        } else {
            try {
                Staff.deleteStaff(id, function (data) {
                    if (data == null) {
                        res.json({ data: data, message: "delete staff failed" });
                    } else {
                        if (data.affectedRows == 0) {
                            res.json({ data: data, message: "not have staff to delete" });
                        } else {
                            res.json({ data: data, message: "delete staff success" });
                        }
                    }
                });
            } catch (error) {
                res.json(error);
            }
        }

    })


}