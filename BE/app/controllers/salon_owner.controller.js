var SalonOwner = require('../models/salonOwner.model');
var ImageSalon = require('../models/imageSalon.model');

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