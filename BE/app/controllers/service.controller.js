var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');

exports.addServiceSalon = function (req, res, next) {
    var dataService= req.body;
    console.log(dataService);
    try {
        ServiceSalon.addServiceSalon(dataService,function (data) {
           if (data== null) {
            res.json({data:data,success:"add service fail"});
           } else {
            res.json({data:data,success:"add service success"});
           }
         });
    } catch (error) {
        res.json({data:error,success:"add service fail"});
    }
}

// van chua xong delete service vi thieu register service
exports.deleteServiceSalon =function (req, res, next) {
    var id= req.params.idService;
    try {
        CategoryService.deleteCategoryServiceByServiceId(id,function (data) {
        });
        ImageService.deleteImageServiceByServiceId(id,function (data) {
        });
        ServiceSalon.deleteServiceSalon(id,function (data) {
    
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}

exports.getServiceOfSalon = function (req, res, next) {
    var id = req.params.idSalon;
    try {
        ServiceSalon.getServiceOfSalon(id,function (data) {

            if (data== null) {
                res.json({data:data,success:"get service fail"});
               } else {
                res.json({data:data,success:"get service success"});
               }
        });
    } catch (error) {
        res.json({data:error,success:"get service fail"});
    }
}
exports.updateServiceSalon= function (req, res, next) {
    var id = req.params.idService;
    var dataUpdate=req.body;
    try {
        ServiceSalon.updateServiceSalon(id,dataUpdate,function (data) {
        
            if (data== null) {
                res.json({data:data,success:"update service fail"});
               } else {
                res.json({data:data,success:"update service success"});
               }
        });
    } catch (error) {
        res.json({data:error,success:"update service fail"});
    }
    
}
