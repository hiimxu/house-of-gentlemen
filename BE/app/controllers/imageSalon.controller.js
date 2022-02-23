var ImageSalon = require('../models/imageSalon.model');

exports.getImageSalon= function (req, res, next) {
    var id = req.params.idSalon;
    try {
        ImageSalon.getAllImage(id,function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}

exports.addImageToImageSalon = function (req, res, next) {
    // res.json("wellcome to  addImageToImageSalon");
    var dataImage= req.body;
    try {
        ImageSalon.addImageToImageSalon(dataImage,function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.deleteImageOfImageSalon =function (req, res, next) {
    var id= req.params.id;
    try {
        ImageSalon.deleteImageOfImageSalon(id,function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}