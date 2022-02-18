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
Register_service.getRegisterServiceById=function (id, result) {
    db.query("SELECT * FROM swp490_g11.register_service where registerServiceId =?",id,(err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.getRegisterServiceByCustomer=function (id, result) {
    db.query("SELECT * FROM swp490_g11.register_service where customerId =?",id,(err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
           var data = rows;
            result(data);
        }
    });
}

module.exports =Register_service;