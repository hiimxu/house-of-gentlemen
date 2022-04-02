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
Register_service.favorviteService=function(id,result){
    db.query(`with t as (
        SELECT swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.salonId,swp490_g11.salonowner.phone,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose FROM swp490_g11.register_service
        left join swp490_g11.salonowner
        on swp490_g11.register_service.salonId= swp490_g11.salonowner.salonId
        where swp490_g11.register_service.customerId='${id}'
        order by swp490_g11.register_service.timeUse desc
        )
        select t.nameSalon,t.salonId,t.phone,t.taxCode,t.timeOpen,t.timeClose,swp490_g11.address.detailAddress,swp490_g11.image_salon.image 
        from t
        left join swp490_g11.address
        on t.salonId=swp490_g11.address.salonId
        left join swp490_g11.image_salon
        on t.salonId=swp490_g11.image_salon.salonId
        group by t.salonId
        limit 3
        
        `,id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
module.exports =Register_service;