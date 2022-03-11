const db = require('../common/connect');

const ImageSalon = function (img) {
    this.imageId=img.imageId
    this.salonId=img.salonId;
    this.image=img.image;
}
ImageSalon.getAllImage = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.image_salon where salonId='${id}'`, (err, rows, fields) => {
        if (err) {
            
            result(null,err);
        } else {
            data = rows;
            result(data)
        }
    });
}
ImageSalon.addImageToImageSalon = function(dataImage,result){
    db.query(`INSERT INTO image_salon SET?`, dataImage, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({id : rows.insertId,...dataImage});
        }
    });
}
ImageSalon.deleteImageOfImageSalon = function(id,result){
    db.query(`delete from image_salon where imageId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            
            result(rows);
        }
    });

}
ImageSalon.checkPermission= function (id,salonId,result) {
   
    db.query(`SELECT * FROM swp490_g11.image_salon where salonId='${salonId}' and imageId=?`,id, (err, rows, fields) => {
        if (err) {
            
            result(null,err);
        } else {
            data = rows;
            result(data)
        }
    });
}


module.exports = ImageSalon;