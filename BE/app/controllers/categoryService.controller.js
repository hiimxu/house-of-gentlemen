var CategoryService = require('../models/categoryService.model');

exports.addCategoryService = function (req, res, next) {
   
    var dataCategoryService= req.body;
    try {
        CategoryService.addCategoryService(dataCategoryService,function (data) {
           if (data== null) {
            res.json({data:data,message:"add data category service failed"});
           } else {
            res.json({data:data,message:"add data category service success"});
           }
        });
    } catch (error) {
        res.json({data:error,message:"add data category service failed"});
    }
}

exports.deleteCategoryService =function (req, res, next) {
    var id= req.params.id;
    try {
        CategoryService.deleteCategoryService(id,function (data) {

            if (data== null) {
                res.json({data:data,message:"delete data category service failed"});
            } else {
                res.json({data:data,message:"delete data category service success"});
            }
        });
    } catch (error) {
        res.json({data:error,message:"delete data category service success"});
    }
}