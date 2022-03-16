var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');
const { body, validationResult } = require('express-validator');
exports.addServiceSalon = function (req, res, next) {
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var dataService = {
        salonId: req.user.salonId,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        content: req.body.content,
        promotion: req.body.promotion,
        service_time: req.body.service_time,
    }
    if (parseInt(dataService.promotion)>100 || parseInt(dataService.promotion)<0) {
        return res.status(400).json({message:"0<=promotion<=100"})
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
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
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
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }

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
exports.getServiceOfSalonByCustomer = function (req, res, next) {
    var id= req.params.idSalon;

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
exports.getAllServicePossible = function (req, res, next) {

    try {
        ServiceSalon.getAllServicePossible(function (data) {

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
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var dataUpdate = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        content:req.body.content,
        promotion:req.body.promotion ,    // mac dinh de = 0
        service_time: req.body.service_time,

    };
    if (parseInt(dataUpdate.promotion)>100 || parseInt(dataUpdate.promotion)<0) {
        return res.status(400).json({message:"0<=promotion<=100"})
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    ServiceSalon.checkPermission(id,salonId,function (data){
        if (data.length == 0) {
            return  res.status(400).json({ data: data, message: "you not have access" });
          } else {
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
    });

    

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
exports.impossibleService=function (req, res, next) {
    var serviceId= req.body.serviceId;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    ServiceSalon.checkPermission(serviceId,salonId, function (data){
        if (data== null) {
            res.status(400).json({ data: data, message: "err mysql"})
        } else if (data.length == 0) {
            return res.status(400).json({message:"you not have access"})
        }else{
            ServiceSalon.impossibleService(serviceId,function (data){
                if (data== null) {
                    return res.status(400).json({message:"error sql"})
                } else {
                    return res.status(200).json({data,message:"impossible service"})
                }
            })
        }
    })
    
}

exports.getImpossibleService=function (req, res, next) {
    var salonId= req.user.salonId;
    if (salonId==null) {
        return res.status(400).json({message:"please login account salon"});
    }
    ServiceSalon.getImpossibleService(salonId,function (data){
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "have not data"})
        } else {
            res.status(400).json({ data: data, message: "get success"})
        }

    })
}
