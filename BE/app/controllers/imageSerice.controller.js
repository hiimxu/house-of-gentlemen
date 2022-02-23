var ImageService = require('../models/imageService.model');
exports.addImageService= function (req, res, next) {
    var dataImage= req.body;
    ImageService.addImageService(dataImage,function (data) {

        res.json( data );
    });
}
exports.getImageService=function (req, res, next) {
    var id = req.params.id;
    ImageService.getAllImageServiceByServiceId(id,function (data) {

        res.json(data);
    });
}
exports.deleteImageService=function (req, res, next) {
    var id= req.params.id;
    ImageService.deleteImageService(id,function (data) {

        res.json(data);
    });
}