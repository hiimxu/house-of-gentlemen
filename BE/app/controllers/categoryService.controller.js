var CategoryService = require('../models/categoryService.model');

exports.addCategoryService = function (req, res, next) {

    var dataCategoryService = req.body;
    try {
        CategoryService.addCategoryService(dataCategoryService, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}

exports.deleteCategoryService = function (req, res, next) {
    var id = req.params.id;
    try {
        CategoryService.deleteCategoryService(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}