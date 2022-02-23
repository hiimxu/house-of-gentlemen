var RegisterService = require('../models/register_service.model');
exports.getRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    try {
        RegisterService.getRegisterServiceById(id, function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }

}
exports.getRegisterServiceByCustomer = function (req, res, next) {
    var id = req.params.id;
    try {
        RegisterService.getRegisterServiceByCustomer(id, function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }

}
exports.addRegisterService = function (req, res, next) {
    var staffId = req.body.staffId;
    var date = req.body.timeUse;
    var statusId = 3;
    var timeRegister = new Date();
    var status_register_id = 1;
    var dataStaffCanleder = { staffId: staffId, date: date, statusId: statusId };
    var dataRegisterService = req.body;
    dataRegisterService = { timeRegister, status_register_id, ...dataRegisterService };
    // res.json(dataRegisterService);
    try {
        StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) {
            var staffCanlederId = data.staffCanlederId;
            dataRegisterService = { staffCanlederId, ...dataRegisterService };
            
            RegisterService.addRegisterService(dataRegisterService, function (data) {
               res.json( data); 
                });
            });
    } catch (error) {
        res.json(error);
    }
}