var ImageSalon = require('../models/imageSalon.model');

exports.getImageSalon= function (req, res, next) {
    var id = req.params.idSalon;
    try {
        ImageSalon.getAllImage(id,function (data) {

            if (data== null) {
                res.json({data:data,message:"get image failed"});
            } else {
                if (data.length==0) {
                    res.json({data:data,message:"get image failed"});
                } else {
                    res.json({data:data,message:"get image success"});
                }
            }
        });
    } catch (error) {
        res.json({data:data,message:"get image failed"});
    }
    
    
}

exports.addImageToImageSalon = function (req, res, next) {
    // res.json("wellcome to  addImageToImageSalon");
    var image= req.body.image;
    var salonId= req.body.salonId;
    var dataImage ={image:image,salonId:salonId}
    try {
        ImageSalon.addImageToImageSalon(dataImage,function (data) {
            
            if (data== null) {
                res.json({data:data,message:"add image failed"});
            } else {
                res.json({data:data,message:"add image success"});
            }
        });
    } catch (error) {
        res.json({data:error,message:"add image failed"});
    }
}
exports.deleteImageOfImageSalon =function (req, res, next) {
    var id= req.params.id;
    try {
        ImageSalon.deleteImageOfImageSalon(id,function (data) {
            if (data== null) {
                res.json({data:data,message:"delete image failed"});
            } else {
                if (data.affectedRows==0) {
                    res.json({data:data,message:"not have image to delete"});
                } else {
                    res.json({data:data,message:"delete image success"});
                }
               
            }
        });
    } catch (error) {
        res.json({data:data,message:"delete image failed"});
    }
}