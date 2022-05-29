var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');
var SalonOwner = require('../models/salonOwner.model');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const util = require("util");







exports.addServiceSalon = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var image = req.body.image;
    var dataService = {
        salonId: req.user.salonId,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        content: req.body.content,
        promotion: req.body.promotion,
        service_time: req.body.service_time,
        possible: 1
    }
    if (parseInt(dataService.promotion) > 100 || parseInt(dataService.promotion) < 0) {
        return res.status(400).json({ message: "0<=promotion<=100" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    ServiceSalon.getAllServiceSalon(salonId, function (data) {
        if (data.length >= 30) {
            return res.status(400).json({ message: "salon của bạn có thể tạo tối đa 30 services", data: [] })
        }
        else {
            try {
                ServiceSalon.addServiceSalon(dataService, function (data) {
                    // res.json({ data: data, message: "add service fail" });
                    if (data == null) {
                        res.status(400).json({ data: data, message: "add service fail" });
                    } else {
                        if (data.length == 0) {
                            res.status(400).json({ data: data, message: "add service failed" });
                        } else {
                            var dataImage = {
                                serviceId: data.id,
                                image: req.body.image
                            };
                            ImageService.addImageService(dataImage, function (data) {

                            })
                            data = { image: image, ...data };
                            res.json({ data: data, message: "add service success" });
                        }
                    }
                });
            } catch (error) {
                res.status(400).json({ data: error, message: "add service fail" });
            }
        }

    })


}
// exports.addServiceSalonImage = async (req, res, next) => {
//     try {
//         var salonId = req.user.salonId;
//         if (salonId == null) {
//             return res.status(400).json({ message: "please login account salon" });
//         }
//         console.log(salonId);
//         await uploadFileMiddleware(req, res);

//         if (req.file == undefined) {
//             return res.status(400).send({ message: "Please upload a image service!" });
//         }
//         var image = req.file.filename;
//     var dataService = {
//         salonId: req.user.salonId,
//         name: req.body.name,
//         price: req.body.price,
//         description: req.body.description,
//         content: req.body.content,
//         promotion: req.body.promotion,
//         service_time: req.body.service_time,
//         possible: 1
//     }
//     if (parseInt(dataService.promotion) > 100 || parseInt(dataService.promotion) < 0) {
//         return res.status(400).json({ message: "0<=promotion<=100" })
//     }
//     ServiceSalon.getAllServiceSalon(salonId, function (data) {
//         if (data.length >= 30) {
//             return res.status(400).json({ message: "salon của bạn có thể tạo tối đa 30 services", data: [] })
//         }
//         else {
//             try {
//                 ServiceSalon.addServiceSalon(dataService, function (data) {
//                     // res.json({ data: data, message: "add service fail" });
//                     if (data == null) {
//                         res.status(400).json({ data: data, message: "add service fail" });
//                     } else {
//                         if (data.length == 0) {
//                             res.status(400).json({ data: data, message: "add service failed" });
//                         } else {
//                             var dataImage = {
//                                 serviceId: data.id,
//                                 image: image
//                             };
//                             ImageService.addImageService(dataImage, function (data) {

//                             })
//                             data = { image: image, ...data };
//                             res.json({ data: data, message: "add service success" });
//                         }
//                     }
//                 });
//             } catch (error) {
//                 res.status(400).json({ data: error, message: "add service fail" });
//             }
//         }

//     })
    
//     } catch (err) {
//         console.log(err);

//         if (err.code == "LIMIT_FILE_SIZE") {
//             return res.status(500).send({
//                 message: "File size cannot be larger than 2MB!",
//             });
//         }

//         res.status(500).send({
//             message: `Could not upload the file: ${req.file}. ${err}`,
//         });
//     }

// }


// van chua xong delete service vi thieu register service
exports.deleteServiceSalon = function (req, res, next) {
    var id = req.params.idService;
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        CategoryService.deleteCategoryServiceByServiceId(id, function (data) {
        });
        ImageService.deleteImageServiceByServiceId(id, function (data) {
        });
        ServiceSalon.deleteServiceSalon(id, function (data) {

            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}

exports.getServiceOfSalon = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    SalonOwner.getProfileSalonBySalonId(salonId, function (dataSalon) {
        ServiceSalon.getAllServiceSalon(salonId, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                if (data.length == 0) {
                    res.status(200).json({ data: data, message: "not have service" });
                } else {

                    res.json({ dataSalon: dataSalon, data: data, message: "get service success" });
                }
            }
        });
    })
}
exports.getServiceOfSalonByAdmin = function (req, res, next) {

    var user = req.user
    if (user.role == null) {
        return res.status(400).json({ message: "Please login admin", data: [] })
    }
    var salonId = req.body.salonId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    SalonOwner.getProfileSalonBySalonId(salonId, function (dataSalon) {
        ServiceSalon.getAllServiceSalon(salonId, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                if (data.length == 0) {
                    res.json({ dataSalon: dataSalon, data: data, message: "not have service" });
                } else {

                    res.json({ dataSalon: dataSalon, data: data, message: "get service success" });
                }
            }
        });
    })
}
exports.getServiceOfSalonByCustomer = function (req, res, next) {
    var id = req.params.idSalon;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ServiceSalon.getServiceOfSalon(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have service " });
                } else {
                    res.json({ data: data, message: "get service success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.getAllServicePossible = function (req, res, next) {

    try {
        ServiceSalon.getAllServicePossible(function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                res.json({ data: data, message: "get service success" });
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.updateServiceSalon = function (req, res, next) {
    var id = req.params.idService;
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var dataUpdate = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        content: req.body.content,
        promotion: req.body.promotion,    // mac dinh de = 0
        service_time: req.body.service_time,

    };
    var image = req.body.image;
    var dataOk = { id, image, ...dataUpdate }
    if (parseInt(dataUpdate.promotion) > 100 || parseInt(dataUpdate.promotion) < 0) {
        return res.status(400).json({ message: "kiểm tra lại thông tin khuyến mãi" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    ServiceSalon.checkPermission(id, salonId, function (data) {
        if (data.length == 0) {
            return res.status(400).json({ data: data, message: "you not have access" });
        } else {
            try {
                ImageService.updateImage(id, image, function (data) {
                    ServiceSalon.updateServiceSalon(id, dataUpdate, function (data) {

                        if (data == null || data.affectedRows == 0) {
                            res.status(400).json({ data: data, message: "cập nhập dịch vụ thất bại" });
                        } else {

                            res.json({ data: dataOk, message: "cập nhập dịch vụ thành công" });
                        }
                    });

                })

            } catch (error) {
                res.status(400).json({ data: error, message: "cập nhập dịch vụ thất bại" });
            }
        }
    });



}
exports.getAllServiceSalon = function (req, res, next) {
    var id = req.params.idSalon;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    try {
        SalonOwner.getProfileSalonBySalonId(id, function (dataSalon) {
            ServiceSalon.getAllServiceSalon(id, function (data) {

                if (data == null) {
                    res.status(400).json({ data: data, message: "get service fail" });
                } else {
                    if (data.length == 0) {
                        res.status(400).json({ data: data, message: "not have service" });
                    } else {

                        res.json({ dataSalon: dataSalon, data: data, message: "get service success" });
                    }
                }
            });
        })

    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.getServiceByIdService = function (req, res, next) {
    var id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ServiceSalon.getServiceByIdService(id, function (data) {

            if (data == null) {
                res.status(400).json({ data: data, message: "get service fail" });
            } else {
                if (data.length == 0) {
                    res.status(400).json({ data: data, message: "not have service " });
                } else {
                    res.json({ data: data, message: "get service success" });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ data: error, message: "get service fail" });
    }
}
exports.impossibleService = function (req, res, next) {
    var serviceId = req.body.serviceId;
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    var dataOk = { serviceId: serviceId }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    ServiceSalon.checkPermission(serviceId, salonId, function (data) {
        if (data == null) {
            res.status(400).json({ data: data, message: "err mysql" })
        } else if (data.length == 0) {
            return res.status(400).json({ message: "you not have access" })
        } else {
            ServiceSalon.impossibleService(serviceId, function (data) {
                if (data == null) {
                    return res.status(400).json({ message: "error sql" })
                } else {
                    return res.status(200).json({ data: dataOk, message: "impossible service" })
                }
            })
        }
    })

}

exports.getImpossibleService = function (req, res, next) {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
    ServiceSalon.getImpossibleService(salonId, function (data) {
        if (data.length == 0) {
            res.status(400).json({ data: data, message: "have not data" })
        } else {
            res.status(400).json({ data: data, message: "get success" })
        }

    })
}
