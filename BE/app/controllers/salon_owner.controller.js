var SalonOwner = require('../models/salonOwner.model');
var ImageSalon = require('../models/imageSalon.model');
var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');

exports.salonOwner = function (req, res, next) {
    SalonOwner.getAll(function (data) {
        res.json({ result: data });
    });
}

exports.getSalonOwnerProfile = function (req, res, next) {
    var id = req.params.id;
    SalonOwner.getPrifileSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateSalonOwnerProfile= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    
    SalonOwner.updateProfileSalon(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}
exports.getImageSalon= function (req, res, next) {
    var id = req.params.idSalon;
    
    
    ImageSalon.getAllImage(id,function (data) {

        res.json({ result: data });
    });
}
exports.addImageToImageSalon = function (req, res, next) {
    // res.json("wellcome to  addImageToImageSalon");
    var dataImage= req.body;
    ImageSalon.addImageToImageSalon(dataImage,function (data) {

        res.json({ result: data });
    });
}
exports.deleteImageOfImageSalon =function (req, res, next) {
    var id= req.params.id;
    ImageSalon.deleteImageOfImageSalon(id,function (data) {

        res.json({ result: data });
    });
}

exports.addServiceSalon = function (req, res, next) {
   
    var dataService= req.body;
    console.log(dataService);
    ServiceSalon.addServiceSalon(dataService,function (data) {
        

        res.json({ result: data });
    });
}
exports.deleteServiceSalon =function (req, res, next) {
    var id= req.params.idService;
    ServiceSalon.deleteServiceSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.getServiceOfSalon = function (req, res, next) {
    var id = req.params.idSalon;
    ServiceSalon.getServiceOfSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateServiceSalon= function (req, res, next) {
    var id = req.params.idService;
    var dataUpdate=req.body;
    
    ServiceSalon.updateServiceSalon(id,dataUpdate,function (data) {
        
        res.json({ result: data });
    });
}
exports.addCategoryService = function (req, res, next) {
   
    var dataCategoryService= req.body;
    CategoryService.addCategoryService(dataCategoryService,function (data) {
        

        res.json({ result: data });
    });
}
exports.deleteCategoryService =function (req, res, next) {
    var id= req.params.id;
    CategoryService.deleteCategoryService(id,function (data) {

        res.json({ result: data });
    });
}
exports.addImageService= function (req, res, next) {
    var dataImage= req.body;
    ImageService.addImageService(dataImage,function (data) {

        res.json({ result: data });
    });
}
exports.getImageService=function (req, res, next) {
    var id = req.params.id;
    ImageService.getAllImageServiceByServiceId(id,function (data) {

        res.json({ result: data });
    });
}