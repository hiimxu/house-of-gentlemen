var Gallery = require('../models/gallery.model')
const { body, validationResult } = require('express-validator');
exports.getGalleryBySalon = function (req, res, next) {
    var id = req.user.salonId;
    console.log(id)
    if (id == null) {
        return res.status(400).json({ data: [], message: "please login account salon" })
    }
    // console.log(req.user)
    Gallery.getGalleryOfSalon(id, function (data) {
        res.json({ data, message: "get gallery success" })

    })
}
exports.deleteImageOfGallery = function (req, res, next) {
    var id = req.user.salonId;
    console.log(id)
    if (id == null) {
        return res.status(400).json({ data: [], message: "please login account salon" })
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    imageId = req.body.imageId;
    Gallery.deleteImageOfGallery(imageId, function (data) {
        res.json({ data: { imageId: imageId }, message: "delete image success" })
    })
}

exports.addGalleryBySalon = function (req, res, next) {
    var id = req.user.salonId;
    if (id == null) {
        return res.status(400).json({ data: [], message: "please login account salon" })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: "error validate" });
    }
    image = req.body.image;

    if (Array.isArray(image)) {
        regexImage = new RegExp(/^gif|jpe?g|bmp|png$/)
        for (let i = 0; i < image.length; i++) {
            if (!regexImage.test(image[i])) {
                return res.status(400).json({ message: "input image link" })
            }
           if (image[i].length>450) {
               console.log(image[i].length)
            return res.status(400).json({ message: "length image <=450" })
           }
        }
        image.forEach(img => {
            console.log(img.length)
            dataImage = { salonId: id, image: img };
            Gallery.addGalleryBySalon(dataImage, function (data) {

            })

        });
        res.json({ data: image, message: "add image success" })
    }
    else {
        regexImage = new RegExp(/^gif|jpe?g|bmp|png$/)
        dataImage = { salonId: id, image: image };
        if (!regexImage.test(image)) {
            return res.status(400).json({ message: "input image link" })
        }
       if (image.length>450) {
        return res.status(400).json({ message: "length image <=450" })
       }
        Gallery.addGalleryBySalon(dataImage, function (data) {

        })
        res.json({ data: image, message: "add image success" })
    }



}