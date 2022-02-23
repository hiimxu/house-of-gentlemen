var ImageSalon = require('../models/imageSalon.model');

exports.getImageSalon= function (req, res, next) {
    var id = req.params.idSalon;
    
    
    ImageSalon.getAllImage(id,function (data) {

        res.json(data);
    });
}

exports.addImageToImageSalon = function (req, res, next) {
    // res.json("wellcome to  addImageToImageSalon");
    var dataImage= req.body;
    ImageSalon.addImageToImageSalon(dataImage,function (data) {

        res.json(data);
    });
}
exports.deleteImageOfImageSalon =function (req, res, next) {
    var id= req.params.id;
    ImageSalon.deleteImageOfImageSalon(id,function (data) {

        res.json(data);
    });
}