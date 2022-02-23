var StatusRegisterService = require('../models/statusRegisterService.model');
exports.getStatusRegisterService = function (req, res, next) {

    StatusRegisterService.getAllSatusRegisterService(function (data) {

        res.json(data);
    });

}
exports.getStatusRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    StatusRegisterService.getSatusRegisterServiceById(id, function (data) {

        res.json(data);
    });

}