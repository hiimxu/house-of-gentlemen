var Staff = require('../models/satff.model');
exports.getStaff= function (req, res, next) {
    var id = req.params.id;
    
    Staff.getStaff(id,function (data) {

        res.json(data);
    });
}
exports.addStaff= function (req, res, next) {
    var data=req.body
    
    Staff.addStaff(data,function (data) {

        res.json(data);
    });
}
exports.updateStaff= function (req, res, next) {
    var id = req.params.id;
    var data=req.body
    
    Staff.updateStaff(id,data,function (data) {
        res.json(data);
    });
}
exports.deleteStaff= function (req, res, next) {
    var id = req.params.id;
    
    Staff.deleteStaff(id,function (data) {
        res.json( data );
    });
}