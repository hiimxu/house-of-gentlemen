const db = require('../common/connect');
const Service = function (service) {
    this.seviceId = service.seviceId;
    this.salonId =service.salonId;
    this.name = service.name;
    this.price = service.price;
    this.description = service.description;
    this.content =service.content;
    this.promotion = service.promotion;
    this.service_time = service.service_time;   
}

module.exports =Service;