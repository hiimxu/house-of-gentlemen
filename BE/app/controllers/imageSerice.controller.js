var ImageService = require('../models/imageService.model');
const { body, validationResult } = require('express-validator');
exports.addImageService = function (req, res, next) {
    var dataImage = {
        serviceId: req.body.serviceId,
        image: req.body.image
    };
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ImageService.addImageService(dataImage, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "add image failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "add image failed" });
                } else {
                    res.json({ data: data, message: "add image success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "add image failed" });
    }
}
exports.getImageService = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ImageService.getAllImageServiceByServiceId(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get image failed" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "get image failed" });
                } else {
                    res.json({ data: data, message: "get image success" });
                }

            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get image failed" });
    }
}
exports.deleteImageService = function (req, res, next) {
    var id = req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ImageService.deleteImageService(id, function (data) {
            if (data == null) {
                res.status(400).json({ data: data, message: "delete image failed" });
            } else {
                if (data.affectedRows==0) {
                    res.status(400).json({ data: data, message: "not have image to delete" });
                } else {
                    res.json({ data: data, message: "delete image success" });
                }

            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "delete image failed" });
    }
}