var ImageService = require('../models/imageService.model');
exports.addImageService= function (req, res, next) {
    var dataImage={serviceId:req.body.serviceId,
        image:req.body.image
        };
    try {
        ImageService.addImageService(dataImage,function (data) {

            if (data== null) {
                res.json( {data:data,message:"add image failed"} );
            } else {
                res.json( {data:data,message:"add image success"} );
            }
        });
    } catch (error) {
        res.json( {data:error,message:"add image failed"} );
    }
}
exports.getImageService=function (req, res, next) {
    var id = req.params.id;
    try {
        ImageService.getAllImageServiceByServiceId(id,function (data) {

            if (data== null) {
                res.json( {data:data,message:"get image failed"} );
            } else {
                if (data.length==0) {
                    res.json( {data:data,message:"get image failed"} );
                }else{
                    res.json( {data:data,message:"get image success"} );
                }
               
            }
        });
    } catch (error) {
        res.json(error);
    }
}
exports.deleteImageService=function (req, res, next) {
    var id= req.params.id;
    try {
        ImageService.deleteImageService(id,function (data) {
            if (data== null) {
                res.json( {data:data,message:"delete image failed"} );
            }else{
                if (data.affectedRows) {
                    res.json( {data:data,message:"not have image to delete"} );
                } else {
                    res.json( {data:data,message:"delete image success"} );
                }
               
}
        });
    } catch (error) {
        res.json( {data:error,message:"delete image failed"} );
    }
}