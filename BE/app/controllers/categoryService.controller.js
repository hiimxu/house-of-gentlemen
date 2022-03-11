var CategoryService = require('../models/categoryService.model');
var ServiceSalon = require('../models/service.model');
const { body, validationResult } = require('express-validator');

exports.addCategoryService = function (req, res, next) {
    var salonId= req.user.salonId;
    
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var dataCategoryService = {
        categoryId: req.body.categoryId,
        serviceId: req.body.serviceId,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    ServiceSalon.checkPermission(dataCategoryService.serviceId,salonId,function (data){
        if (data.length==0) {
            return res.status(400).json({message:"you not have access"})
        }
        else{
            var check=CategoryService.checkCategoryService(dataCategoryService, function (data){
                if (data.length==0) {
                    try {
                        CategoryService.addCategoryService(dataCategoryService, function (data) {
                            if (data == null) {
                                res.status(400).json({ data: data, message: "add data category service failed" });
                            } else {
                                res.json({ data: data, message: "add data category service success" });
                            }
                        });
                    } catch (error) {
                        res.status(400).json({ data: error, message: "add data category service failed" });
                    } 
                } else {
                    res.status(400).json({ data: data, message: "category already exist in service" });
                }
            })
        }
    })
    
   
    
}

exports.deleteCategoryService = function (req, res, next) {
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
        CategoryService.deleteCategoryService(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "delete data category service failed" });
            } else {
                if (data.affectedRows==0) {
                    res.status(400).json({ data: data, message: "not have category service to delete" });
                } else {
                    res.json({ data: data, message: "delete data category service success" }); 
                }
               
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "delete data category service success" });
    }
}
exports.getCategoryServiceOfService=function (req, res, next) {
    var id = req.params.idService;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    CategoryService.getCategoryServiceByService(id, function (data) {
        if (data == null) {
            res.status(400).json({ data: data, message: "get category service failed" });
        } else {
            if (data.length==0) {
                res.status(400).json({ data: data, message: "not have category service" });
            } else
             {
                res.json({ data: data, message: "get category service success" });
            }
        }
    })
}