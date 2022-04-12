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
    this.service_time= registerServiceId.service_time;
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
Register_service.historyBooking=function(id,result){
    db.query(`with t as (
        select swp490_g11.register_service.registerServiceId,swp490_g11.register_service.serviceId,swp490_g11.register_service.salonId,swp490_g11.register_service.timeRegister,swp490_g11.register_service.timeUse,swp490_g11.register_service.price_original,
        swp490_g11.status_register_service.name as 'nameStatus',swp490_g11.staff.name as 'nameStaff',swp490_g11.register_service.staffId,swp490_g11.salonowner.nameSalon,swp490_g11.service.name as 'nameService',swp490_g11.service.service_time,
        swp490_g11.salonowner.phone as 'phoneSalon',swp490_g11.address.detailAddress
        from swp490_g11.register_service
        left join swp490_g11.status_register_service
        on swp490_g11.register_service.status_register_id=swp490_g11.status_register_service.status_register_id
        left join swp490_g11.staff
        on swp490_g11.register_service.staffId=swp490_g11.staff.staffId
        left join swp490_g11.salonowner
        on swp490_g11.salonowner.salonId=swp490_g11.register_service.salonId
        left join swp490_g11.service
        on swp490_g11.register_service.serviceId=swp490_g11.service.serviceId
        left join swp490_g11.address
        on swp490_g11.address.salonId=swp490_g11.salonowner.salonId
        where customerId='${id}'
        )
        select t.registerServiceId,t.serviceId,t.salonId,t.timeRegister,t.timeUse,t.price_original,
        t.nameStatus,t.nameStaff,t.staffId,t.nameSalon,t.nameService,swp490_g11.image_service.image,t.service_time,
        t.phoneSalon,t.detailAddress
        from t
        left join swp490_g11.image_service
        on t.serviceId=swp490_g11.image_service.serviceId
       where t.nameStatus like 'cancelled' or t.nameStatus like 'finished'
        group by t.registerServiceId
        order by t.timeUse desc;
        `,id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.reservation=function (id,result) {
    var d=new Date();
    db.query(`with t as (
        select swp490_g11.register_service.registerServiceId,swp490_g11.register_service.serviceId,swp490_g11.register_service.salonId,swp490_g11.register_service.timeRegister,swp490_g11.register_service.timeUse,swp490_g11.register_service.price_original,
        swp490_g11.status_register_service.name as 'nameStatus',swp490_g11.staff.name as 'nameStaff',swp490_g11.register_service.staffId,swp490_g11.salonowner.nameSalon,swp490_g11.service.name as 'nameService',swp490_g11.service.service_time,swp490_g11.customer.nameCustomer,swp490_g11.customer.phone,
        swp490_g11.salonowner.phone as 'phoneSalon',swp490_g11.address.detailAddress
        from swp490_g11.register_service
        left join swp490_g11.status_register_service
        on swp490_g11.register_service.status_register_id=swp490_g11.status_register_service.status_register_id
        left join swp490_g11.staff
        on swp490_g11.register_service.staffId=swp490_g11.staff.staffId
        left join swp490_g11.salonowner
        on swp490_g11.salonowner.salonId=swp490_g11.register_service.salonId
        left join swp490_g11.service
        on swp490_g11.register_service.serviceId=swp490_g11.service.serviceId
        left join swp490_g11.customer
        on swp490_g11.customer.customerId=swp490_g11.register_service.customerId
        left join swp490_g11.address
        on swp490_g11.address.salonId=swp490_g11.salonowner.salonId
        where swp490_g11.register_service.customerId=? and timeUse>=?
        )
        select t.registerServiceId,t.serviceId,t.salonId,t.timeRegister,t.timeUse,t.price_original,
        t.nameStatus,t.nameStaff,t.staffId,t.nameSalon,t.nameService,swp490_g11.image_service.image,t.service_time,
        t.nameCustomer,t.phone,t.phoneSalon,t.detailAddress
        from t
        left join swp490_g11.image_service
        on t.serviceId=swp490_g11.image_service.serviceId
        where t.nameStatus like 'booked'
        group by t.registerServiceId
        order by t.timeUse desc`,[id,d],(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
    
}
Register_service.checkStaffCanledarId=function(id,result){
    db.query(`SELECT * FROM swp490_g11.register_service
    where registerServiceId='${id}';`,id,(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.current= function (id,day,result){
    db.query(`with t as (
        select swp490_g11.register_service.registerServiceId,swp490_g11.register_service.serviceId,swp490_g11.register_service.salonId,swp490_g11.register_service.timeRegister,swp490_g11.register_service.timeUse,swp490_g11.register_service.price_original,
        swp490_g11.status_register_service.name as 'nameStatus',swp490_g11.staff.name as 'nameStaff',swp490_g11.register_service.staffId,swp490_g11.salonowner.nameSalon,swp490_g11.service.name as 'nameService',swp490_g11.service.service_time,swp490_g11.customer.nameCustomer,swp490_g11.customer.phone,
        swp490_g11.salonowner.phone as 'phoneSalon',swp490_g11.address.detailAddress
        from swp490_g11.register_service
        left join swp490_g11.status_register_service
        on swp490_g11.register_service.status_register_id=swp490_g11.status_register_service.status_register_id
        left join swp490_g11.staff
        on swp490_g11.register_service.staffId=swp490_g11.staff.staffId
        left join swp490_g11.salonowner
        on swp490_g11.salonowner.salonId=swp490_g11.register_service.salonId
        left join swp490_g11.service
        on swp490_g11.register_service.serviceId=swp490_g11.service.serviceId
        left join swp490_g11.customer
        on swp490_g11.customer.customerId=swp490_g11.register_service.customerId
        left join swp490_g11.address
        on swp490_g11.address.salonId=swp490_g11.salonowner.salonId
        where date(timeUse)=?
        )
        select t.registerServiceId,t.serviceId,t.salonId,t.timeRegister,t.timeUse,t.price_original,
        t.nameStatus,t.nameStaff,t.staffId,t.nameSalon,t.nameService,swp490_g11.image_service.image,t.service_time,t.nameCustomer,t.phone,t.phoneSalon,t.detailAddress
        from t
        left join swp490_g11.image_service
        on t.serviceId=swp490_g11.image_service.serviceId
        where t.nameStatus like 'booked' and t.salonId='${id}'
        group by t.registerServiceId
        order by t.timeUse desc`,[day],(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    });
}
Register_service.ordersHistory = function (id,day,nameStaff,result){
    db.query(`with t as (
        select swp490_g11.register_service.registerServiceId,swp490_g11.register_service.serviceId,swp490_g11.register_service.salonId,swp490_g11.register_service.timeRegister,swp490_g11.register_service.timeUse,swp490_g11.register_service.price_original,
        swp490_g11.status_register_service.name as 'nameStatus',swp490_g11.staff.name as 'nameStaff',swp490_g11.register_service.staffId,swp490_g11.salonowner.nameSalon,swp490_g11.service.name as 'nameService',swp490_g11.service.service_time,swp490_g11.customer.nameCustomer,swp490_g11.customer.phone,swp490_g11.salonowner.phone as 'phoneSalon',swp490_g11.address.detailAddress
        from swp490_g11.register_service
        left join swp490_g11.status_register_service
        on swp490_g11.register_service.status_register_id=swp490_g11.status_register_service.status_register_id
        left join swp490_g11.staff
        on swp490_g11.register_service.staffId=swp490_g11.staff.staffId
        left join swp490_g11.salonowner
        on swp490_g11.salonowner.salonId=swp490_g11.register_service.salonId
        left join swp490_g11.service
        on swp490_g11.register_service.serviceId=swp490_g11.service.serviceId
        left join swp490_g11.customer
        on swp490_g11.customer.customerId=swp490_g11.register_service.customerId
        left join swp490_g11.address
        on swp490_g11.address.salonId=swp490_g11.salonowner.salonId
        where swp490_g11.register_service.salonId='${id}' and date(timeUse)=? and swp490_g11.staff.name like '%${nameStaff}%'
        )
        select t.registerServiceId,t.serviceId,t.salonId,t.timeRegister,t.timeUse,t.price_original,
        t.nameStatus,t.nameStaff,t.staffId,t.nameSalon,t.nameService,swp490_g11.image_service.image,t.service_time,t.nameCustomer,t.phone,t.phoneSalon,t.detailAddress
        from t
        left join swp490_g11.image_service
        on t.serviceId=swp490_g11.image_service.serviceId
        where t.nameStatus like 'cancelled' or t.nameStatus like 'finished'
        group by t.registerServiceId
        order by t.timeUse desc;
        `,[day,nameStaff],(err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data);
        }
    }); 
}
Register_service.finshBooking=function (id,result){
    db.query(`UPDATE register_service SET status_register_id='3' where registerServiceId=?`,id, (err, rows, res) => {
        if (err) {
            result(null,err);
        } else {
            result(rows);
        }
    });
}
Register_service.dataBooking = function (id,result){
    db.query(`with t as (
        select swp490_g11.register_service.registerServiceId,swp490_g11.register_service.serviceId,swp490_g11.register_service.salonId,swp490_g11.register_service.timeRegister,swp490_g11.register_service.timeUse,swp490_g11.register_service.price_original,
        swp490_g11.status_register_service.name as 'nameStatus',swp490_g11.staff.name as 'nameStaff',swp490_g11.register_service.staffId,swp490_g11.salonowner.nameSalon,swp490_g11.service.name as 'nameService',swp490_g11.service.service_time,
        swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.customer.nameCustomer,swp490_g11.customer.phone,swp490_g11.salonowner.phone as 'phoneSalon',swp490_g11.address.detailAddress
        from swp490_g11.register_service
        left join swp490_g11.status_register_service
        on swp490_g11.register_service.status_register_id=swp490_g11.status_register_service.status_register_id
        left join swp490_g11.staff
        on swp490_g11.register_service.staffId=swp490_g11.staff.staffId
        left join swp490_g11.salonowner
        on swp490_g11.salonowner.salonId=swp490_g11.register_service.salonId
        left join swp490_g11.service
        on swp490_g11.register_service.serviceId=swp490_g11.service.serviceId
        left join swp490_g11.customer
        on swp490_g11.customer.customerId=swp490_g11.register_service.customerId
        left join swp490_g11.address
        on swp490_g11.address.salonId=swp490_g11.salonowner.salonId
        where swp490_g11.register_service.registerServiceId='${id}'
        )
        select t.registerServiceId,t.serviceId,t.salonId,t.timeRegister,t.timeUse,t.price_original,
        t.nameStatus,t.nameStaff,t.staffId,t.nameSalon,t.nameService,swp490_g11.image_service.image,t.service_time,
        t.timeOpen,t.timeClose,t.nameCustomer,t.phone,t.phoneSalon,t.detailAddress
        from t
        left join swp490_g11.image_service
        on t.serviceId=swp490_g11.image_service.serviceId
        group by t.registerServiceId
        order by t.timeUse desc;
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