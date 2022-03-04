var Category= require('../models/category.model');
const { body, validationResult } = require('express-validator');




exports.getAllCategory= function (req, res, next) {
    Category.getAllCategory( function (data) {

        if (data == null) {
            res.status(400).json({ data: data, message: "get Category fail" });
        } else {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "not have Category " });
        } else {
            res.json({ data: data, message: "get Category success" });
        }
        }
    });
}
exports.getCategoryByIdCategory= function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    Category.getCategoryByIdCategory(id, function (data) {

        if (data == null) {
            res.status(400).json({ data: data, message: "get Category fail" });
        } else {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "not have Category " });
        } else {
            res.json({ data: data, message: "get Category success" });
        }
        }
    });
}