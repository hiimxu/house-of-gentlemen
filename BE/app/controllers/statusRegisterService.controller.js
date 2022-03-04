var StatusRegisterService = require('../models/statusRegisterService.model');
const { body, validationResult } = require('express-validator');
exports.getStatusRegisterService = function (req, res, next) {
    try {
        StatusRegisterService.getAllSatusRegisterService(function (data) {
            if (data== null) {
                res.json({data:data,success:"get status register service fail"});
            } else {
                res.json({data:data,success:"get status register service success"});
            }
        });
    } catch (error) {
        res.json({data:error,success:"get status register service fail"});
    }

}
exports.getStatusRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    try {
        
        StatusRegisterService.getSatusRegisterServiceById(id, function (data) {
            if (data== null) {
                res.json({data:data,success:"get status register service fail"});
            } else {
                if (data.length==0) {
                    res.json({data:data,success:"not have status register service"});
                } else {
                    res.json({data:data,success:"get status register service success"});
                }
            }
        });
    } catch (error) {
        res.json({data:error,success:"get status register service fail"});
    }

}
