var StatusRegisterService = require('../models/statusRegisterService.model');
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
    try {
        
        StatusRegisterService.getSatusRegisterServiceById(id, function (data) {
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