const { body, validationResult } = require('express-validator');
var Address= require('../models/address.model');





exports.getAddressOfSalon = function (req, res, next) {
   var id = req.params.id;
    Address.getAddressOfSalon(id, function (data){
        if (data==null) {
            return res.status(400).json({message:"sql"})
        } else if (data.length== 0) {
           return res.status(400).json({message:"not have data"})
        }
         else {
            return res.status(200).json({data})
        }
    })
}
exports.searchSalonByDistrict= function (req, res, next) {
    var district = req.body.district;
    Address.getDataByDistrict(district, function (data){
        if (data.length == 0) {
            res.json({ data: data, message:"not have salon"})
        }else{
            res.json({data})
        }
    })
}