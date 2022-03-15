var ImageSalon = require('../models/imageSalon.model');
const { body, validationResult } = require('express-validator');
exports.getImageSalon= function (req, res, next) {
    var id = req.user.salonId;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    console.log(req.user)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ImageSalon.getAllImage(id,function (data) {

            if (data== null) {
                res.status(400).json({data:data,message:"get image failed"});
            } else {
                if (data.length==0) {
                    res.status(400).json({data:data,message:"not have image"});
                } else {
                    res.json({data:data,message:"get image success"});
                }
            }
        });
    } catch (error) {
        res.status(400).json({data:data,message:"get image failed"});
    }
    
    
}
exports.getImageSalonByCustomer= function (req, res, next) {
    var id = req.params.idSalon;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ImageSalon.getAllImage(id,function (data) {

            if (data== null) {
                res.status(400).json({data:data,message:"get image failed"});
            } else {
                if (data.length==0) {
                    res.status(400).json({data:data,message:"not have image"});
                } else {
                    res.json({data:data,message:"get image success"});
                }
            }
        });
    } catch (error) {
        res.status(400).json({data:data,message:"get image failed"});
    }
    
    
}


exports.addImageToImageSalon = function (req, res, next) {
    // res.json("wellcome to  addImageToImageSalon");
    var image= req.body.image;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    var dataImage ={image:image,salonId:salonId}
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        ImageSalon.addImageToImageSalon(dataImage,function (data) {
            
            if (data== null) {
                res.status(400).json({data:data,message:"add image failed"});
            } else {
               if (data.length==0) {
                res.status(400).json({data:data,message:"add image failed"});
               } else {
                res.json({data:data,message:"add image success"});
               }
            }
        });
    } catch (error) {
        res.status(400).json({data:error,message:"add image failed"});
    }
}
exports.deleteImageOfImageSalon =function (req, res, next) {
    var id= req.params.id;
    var salonId= req.user.salonId;
    if (salonId==null) {
       return res.status(400).json({message:"please login account salon"});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    ImageSalon.checkPermission(id,salonId, function (data){
        if (data.length==0) {
           return res.status(400).json({data:data,message:"you not have access"})
        } else {
            try {
                ImageSalon.deleteImageOfImageSalon(id,function (data) {
                    if (data== null) {
                        res.status(400).json({data:data,message:"delete image failed"});
                    } else {
                        if (data.affectedRows==0) {
                            res.status(400).json({data:data,message:"not have image to delete"});
                        } else {
                            res.json({data:data,message:"delete image success"});
                        }
                       
                    }
                });
            } catch (error) {
                res.status(400).json({data:data,message:"delete image failed"});
            }
        }
    });
    
}