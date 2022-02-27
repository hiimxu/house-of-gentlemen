var RegisterService = require('../models/register_service.model');
var StaffCanleder = require('../models/staffCanleder.model');

exports.getRegisterServiceById = function (req, res, next) {
    var id = req.params.id;
    try {
        RegisterService.getRegisterServiceById(id, function (data) {
            if (data== null) {
                res.json({data:data,message:"get booking service failed"});
            } else {
                res.json({data:data,message:"get booking service success"});
            }
        });
    } catch (error) {
        res.json({data:error,message:"get booking service failed"});
    }

}
exports.getRegisterServiceByCustomer = function (req, res, next) {
    var id = req.params.id;
    try {
        RegisterService.getRegisterServiceByCustomer(id, function (data) {

           if (data== null) {
            res.json({data:data,message:"get booking service failed"});
           } else {
            res.json({data:data,message:"get booking service success"});
           }
        });
    } catch (error) {
        res.json({data:error,message:"get booking service failed"});
    }

}
exports.addRegisterService = function (req, res, next) {
    var staffId = req.body.staffId;
    var date = req.body.timeUse;
    var statusId = 3;
    var timeRegister = new Date();
    var status_register_id = 1;
    var dataStaffCanleder = { staffId: staffId, date: date, statusId: statusId };
    var dataRegisterService = req.body;
    dataRegisterService = { timeRegister, status_register_id, ...dataRegisterService };
    // res.json(dataRegisterService);
    try {
        StaffCanleder.addStaffCanderToRegisterService(dataStaffCanleder, function (data) {
            var staffCanlederId = data.staffCanlederId;
            dataRegisterService = { staffCanlederId, ...dataRegisterService };
            if (data== null) {
                res.json({data:data,message:"add staff cander failed"});
            } else {
                RegisterService.addRegisterService(dataRegisterService, function (data) {
                    if (data== null) {
                        res.json( {data:data,message:"booking service failed"}); 
                    } else {
                        res.json( {data:data,message:"booking service success"}); 
                    }
                     }); 
            }
            
            });
    } catch (error) {
        res.json( {data:error,message:"booking service failed"}); 
    }
}
exports.cancelBooking = function (req, res, next) {
   var id = req.params.id;
   var staffCanlederId= req.body.staffCanlederId;
   StaffCanleder.cancelBooking(staffCanlederId,function (data){
    if (data== null) {
        res.json( {data:data,message:"cancel booking failed"}); 
    } else{
        RegisterService.cancelBooking(id,function (data){
            if (data== null) {
                res.json( {data:data,message:"cancel booking failed"}); 
            } else {
                res.json( {data:data,message:"cancel booking success"}); 
            }
             }); 

    } 

   });
   

    

}