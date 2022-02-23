var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');

exports.addServiceSalon = function (req, res, next) {
    var dataService= req.body;
    console.log(dataService);
    ServiceSalon.addServiceSalon(dataService,function (data) {
       res.json(data);
    });
}

// van chua xong delete service vi thieu register service
exports.deleteServiceSalon =function (req, res, next) {
    var id= req.params.idService;
    CategoryService.deleteCategoryServiceByServiceId(id,function (data) {
    });
    ImageService.deleteImageServiceByServiceId(id,function (data) {
    });
    ServiceSalon.deleteServiceSalon(id,function (data) {

        res.json(data);
    });
}

exports.getServiceOfSalon = function (req, res, next) {
    var id = req.params.idSalon;
    ServiceSalon.getServiceOfSalon(id,function (data) {

        res.json(data);
    });
}
exports.updateServiceSalon= function (req, res, next) {
    var id = req.params.idService;
    var dataUpdate=req.body;
    
    ServiceSalon.updateServiceSalon(id,dataUpdate,function (data) {
        
        res.json(data);
    });
}
