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
exports.getAllStaff = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    Staff.getAllStaff(id, function (data) {

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
}
exports.addStaff = function (req, res, next) {

    var dataStaff = {
        salonId: req.user.salonId,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        title: req.body.title,
        license : req.body.license,
        possible: 1
    }
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    Staff.getStaff(dataStaff.salonId, function (data){
        
        if (data.length>=30) {
            res.status(400).json({message:"salon c???a b???n ch??? th??m t???i ??a 30 nh??n vi??n"});
        } else {
            try {
                Staff.addStaff(dataStaff, function (data) {
        
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

    })
    

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
        address: req.body.address,
        title : req.body.title,
        license: req.body.license,
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
                            res.json({ data: dataUpdate, message: 'update success' });
                        }

                    }
                });
            } catch (error) {
                res.status(400).json({ data: error, message: "update failed" });
            }

        }
    })


}
exports.impossibleStaff = function (req, res, next) {
    var id = req.body.id;
    var salonId= req.user.salonId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    Staff.impossibleStaff(id, function (data){
        res.json({message:"impossible staff success!!",data:{id:id}});
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
exports.possibleStaff = function (req, res, next) {
    var id = req.body.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    Staff.possibleStaff(id, function (data){
        res.json({message:"possible staff success!!",data:{id:id}});
    })
}