var CategoryService = require('../models/categoryService.model');

exports.addCategoryService = function (req, res, next) {

    var dataCategoryService = {
        categoryId: req.body.categoryId,
        serviceId: req.body.serviceId,
    };
    var check=CategoryService.checkCategoryService(dataCategoryService, function (data){
        if (data.length==0) {
            try {
                CategoryService.addCategoryService(dataCategoryService, function (data) {
                    if (data == null) {
                        res.json({ data: data, message: "add data category service failed" });
                    } else {
                        res.json({ data: data, message: "add data category service success" });
                    }
                });
            } catch (error) {
                res.json({ data: error, message: "add data category service failed" });
            } 
        } else {
            res.json({ data: data, message: "category already exist in service" });
        }
    })
   
    
}

exports.deleteCategoryService = function (req, res, next) {
    var id = req.params.id;
    try {
        CategoryService.deleteCategoryService(id, function (data) {

            if (data == null) {
                res.json({ data: data, message: "delete data category service failed" });
            } else {
                if (data.affectedRows==0) {
                    res.json({ data: data, message: "not have category service to delete" });
                } else {
                    res.json({ data: data, message: "delete data category service success" }); 
                }
               
            }
        });
    } catch (error) {
        res.json({ data: error, message: "delete data category service success" });
    }
}
exports.getCategoryServiceOfService=function (req, res, next) {
    var id = req.params.idService;
    
    CategoryService.getCategoryServiceByService(id, function (data) {
        if (data == null) {
            res.json({ data: data, message: "get category service failed" });
        } else {
            if (data.length==0) {
                res.json({ data: data, message: "not have category service" });
            } else
             {
                res.json({ data: data, message: "get category service success" });
            }
        }
    })
}