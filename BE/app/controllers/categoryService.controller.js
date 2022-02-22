var CategoryService = require('../models/categoryService.model');

exports.addCategoryService = function (req, res, next) {
   
    var dataCategoryService= req.body;
    CategoryService.addCategoryService(dataCategoryService,function (data) {
        

        res.json({ result: data });
    });
}

exports.deleteCategoryService =function (req, res, next) {
    var id= req.params.id;
    CategoryService.deleteCategoryService(id,function (data) {

        res.json({ result: data });
    });
}