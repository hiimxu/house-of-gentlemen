const { body, validationResult } = require('express-validator');
var StaffCanleder = require('../models/staffCanleder.model');

exports.staffCanlederOrderandBusy = function (req, res, next) {
    var day = req.body.day;
    var staffId=req.body.staffId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    StaffCanleder.staffCanlederOrderandBusy(staffId,day, function (data) {
        if (data.length == 0) {
            return res.status(400).json({message:"staff free",data})
        }
        else{
            return res.status(200).json({message:"staff busy and orderd",data})
        }
    });


}