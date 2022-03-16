const { body, validationResult } = require('express-validator');
var Address= require('../models/address.model');





exports.getAddressOfSalon = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   var id = req.params.id;
    Address.getAddressOfSalon(id, function (data){
        if (data==null) {
            return res.status(400).json({message:"sql"})
        } else if (data.length== 0) {
           return res.status(400).json({message:"not have data"})
        }
         else {
            return res.status(200).json({data,message:"get success"})
        }
    })
}
exports.searchSalonByDistrict= function (req, res, next) {
    var district = req.body.district;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Address.getDataByDistrict(district, function (data){
        if (data.length == 0) {
            res.json({ data: data, message:"not have salon"})
        }else{
            res.json({data,message:"search success"})
        }
    })
}
exports.updateAddressSalon= function (req, res, next) {
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),message:"error validate" });
    }
    var dataAddress={ city:req.body.city, district: req.body.district,detailAddress:req.body.detailAddress}
    Address.updateAddressSalon(salonId,dataAddress, function (data){
        if (data == null) {
            res.status(400).json({ data: data, message:"err mysql"})
        }else{
            res.json({data,message:"update success"})
        }
    })
}