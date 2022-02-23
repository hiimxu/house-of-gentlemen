var ImageService = require('../models/imageService.model');
exports.addImageService = function (req, res, next) {
    var dataImage = req.body;
    try {
        ImageService.addImageService(dataImage, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.getImageService = function (req, res, next) {
    var id = req.params.id;
    try {
        ImageService.getAllImageServiceByServiceId(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.deleteImageService = function (req, res, next) {
    var id = req.params.id;
    try {
        ImageService.deleteImageService(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}