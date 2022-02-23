var StatusRegisterService = require('../models/statusRegisterService.model');
exports.getStatusRegisterService = function (req, res, next) {

    try {
        StatusRegisterService.getAllSatusRegisterService(function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }

}
exports.getStatusRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    try {
        StatusRegisterService.getSatusRegisterServiceById(id, function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }

}