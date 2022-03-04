var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');
const { body, validationResult } = require('express-validator');
exports.addServiceSalon = function (req, res, next) {
    var dataService = {
        salonId: req.body.salonId,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        content: req.body.content,
        promotion: req.body.promotion,
        service_time: req.body.service_time,
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        ServiceSalon.addServiceSalon(dataService, function (data) {
            // res.json({ data: data, message: "add service fail" });
            if (data == null) {
                res.status(400).json({ data: data, message: "add service fail" });
            } else {
                if (data.length==0) {
                    res.status(400).json({ data: data, message: "add service failed" });
                } else {
                    res.json({ data: data, message: "add service success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "add service fail" });
    }
}

// van chua xong delete service vi thieu register service
exports.deleteServiceSalon = function (req, res, next) {
    var id = req.params.idService;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        CategoryService.deleteCategoryServiceByServiceId(id, function (data) {
        });
        ImageService.deleteImageServiceByServiceId(id, function (data) {
        });
        ServiceSalon.deleteServiceSalon(id, function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}

exports.getServiceOfSalon = function (req, res, next) {
    var id = req.params.idSalon;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ServiceSalon.getServiceOfSalon(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
            if (data.length == 0) {
                res.status(400).json({ data: data, message: "not have service " });
            } else {
                res.json({ data: data, message: "get service success" });
            }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.getAllService = function (req, res, next) {

    try {
        ServiceSalon.getAllService(function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                res.json({ data: data, message: "get service success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.updateServiceSalon = function (req, res, next) {
    var id = req.params.idService;
    var dataUpdate = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        content:req.body.content,
        promotion:req.body.promotion ,    // mac dinh de = 0
        service_time: req.body.service_time,

    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ServiceSalon.updateServiceSalon(id, dataUpdate, function (data) {

            if (data == null|| data.affectedRows==0) {
                res.status(400).json({ data: data, message: "update service fail" });
            } else {
                
                res.json({ data: data, message: "update service success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "update service fail" });
    }

}
exports.getAllServiceSalon = function (req, res, next) {
    var id = req.params.idSalon;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    try {
        ServiceSalon.getAllServiceSalon(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have service" });
                } else {
                    res.json({ data: data, message: "get service success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.getServiceByIdService= function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ServiceSalon.getServiceByIdService(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
            if (data.length == 0) {
                res.status(400).json({ data: data, message: "not have service " });
            } else {
                res.json({ data: data, message: "get service success" });
            }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
