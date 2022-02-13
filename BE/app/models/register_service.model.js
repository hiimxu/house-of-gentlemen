const db = require('../common/connect');
const Register_service = function (registerService) {
    this.registerServiceId = registerService.registerServiceId;
    this.serviceId = registerService.serviceId;
    this.customerId = registerService.customerId;
    this.salonId = registerService.salonId;
    this.timeRegister = registerService.timeRegister;
    this.timeUse = registerService.timeUse;
    this.status_register_id = registerService.status_register_id;
    this.promotionSpical = registerService.promotionSpical;
    this.staffId = registerService.staffId;
}

module.exports =Register_service;