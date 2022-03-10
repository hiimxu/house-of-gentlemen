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
    this.staffCanlederId=registerServiceId.staffCanlederId;
    this.price_original= registerServiceId.price_original;
}
Register_service.getRegisterServiceById=function (id, result) {
    console.log(id)
    db.query("SELECT * FROM swp490_g11.register_service where registerServiceId =?",id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.getRegisterServiceByCustomer=function (id, result) {
    db.query("SELECT * FROM swp490_g11.register_service where customerId =?",id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.addRegisterService = function(dataRegisterService,result){
    db.query(`INSERT INTO register_service SET?`, dataRegisterService, (err, rows, res) => {
        if (err) {
            result(err);
        } else {
            result({registerServiceId : rows.insertId,...dataRegisterService});
        }
    });
    
}
Register_service.cancelBooking= function(id,result){
    console.log('aaaaa')
    console.log(id+"aaa");
    db.query(`UPDATE register_service SET status_register_id='2' where registerServiceId=?`,id, (err, rows, res) => {
        if (err) {
            result(null,err);
        } else {
            result(rows);
        }
    });
    
}
Register_service.checkCustomer=function (id,customerId, result) {
    db.query("SELECT * FROM swp490_g11.register_service where registerServiceId =? and customerId=?",[id,customerId],(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.getRegisterServiceOfSalon=function (id, result) {
    db.query("SELECT * FROM swp490_g11.register_service where salonId =? ",id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.checkSalon=function(id,salonId,result){
    db.query("SELECT * FROM swp490_g11.register_service where registerServiceId =?and salonId =? ",[id,salonId],(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.getPhone=function(id,result){
    db.query(`SELECT swp490_g11.register_service.customerId,swp490_g11.register_service.registerServiceId,swp490_g11.customer.phone FROM swp490_g11.register_service, swp490_g11.customer
   where swp490_g11.register_service.customerId=swp490_g11.customer.customerId and swp490_g11.register_service.registerServiceId=?`,id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
module.exports =Register_service;