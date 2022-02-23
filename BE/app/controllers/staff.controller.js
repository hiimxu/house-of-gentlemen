var Staff = require('../models/satff.model');
exports.getStaff= function (req, res, next) {
    var id = req.params.id;
    try {
        Staff.getStaff(id,function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
    
}
exports.addStaff= function (req, res, next) {
    var data=req.body
    try {
        Staff.addStaff(data,function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
    
}
exports.updateStaff= function (req, res, next) {
    var id = req.params.id;
    var data=req.body
    try {
        Staff.updateStaff(id,data,function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
    
}
exports.deleteStaff= function (req, res, next) {
    var id = req.params.id;
    try {
        Staff.deleteStaff(id,function (data) {
            res.json( data );
        });
    } catch (error) {
        res.json(error);
    }
    
}