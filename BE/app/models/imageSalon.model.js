const db = require('../common/connect');

const ImageSalon = function (img) {
    this.imageId=img.imageId
    this.salonId=img.salonId;
    this.image=img.image;
}
ImageSalon.getAllImage = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.image_salon where salonId='${id}'`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            data = rows;
            result(data)
        }
    });
}


module.exports = ImageSalon;