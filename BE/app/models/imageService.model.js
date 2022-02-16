const db = require('../common/connect');

const ImageService = function (imageService) {
    this.imageId = imageService.imageId;
    this.seviceId = imageService.seviceId;
    this.image = imageService.image;
    
}
ImageService.addImageService = function(dataImage,result){
    db.query(`INSERT INTO image_service SET?`, dataImage, (err, rows, res) => {
        if (err) {
            result(err)
        } else {
            result({id : rows.insertId,...dataImage});
        }
    });
}
ImageService.getAllImageServiceByServiceId = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.image_service where serviceId='${id}'`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            data = rows;
            result(data)
        }
    });
}
module.exports =ImageService;