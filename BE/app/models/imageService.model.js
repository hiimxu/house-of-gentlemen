const db = require('../common/connect');

const ImageService = function (imageService) {
    this.imageId = imageService.imageId;
    this.seviceId = imageService.seviceId;
    this.image = imageService.image;
    
}

module.exports =ImageService;