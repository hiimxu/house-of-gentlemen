const res = require('express/lib/response');
const db = require('../common/connect');
const Gallery= function (gallery) {
    this.imageId= gallery.imageId;
    this.salonId = gallery.salonId;
    this.image = gallery.image;
}
Gallery.addGalleryBySalon = function (dataImage,result){
    db.query(`INSERT INTO gallery SET?`,dataImage, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Gallery.deleteImageOfGallery = function (imageId,result){
    db.query(`DELETE FROM gallery where imageId = ${imageId}`, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}

Gallery.getGalleryOfSalon = function (id,result){
    db.query(`SELECT * FROM swp490_g11.gallery
    where salonId=${id}`, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}


module.exports = Gallery;