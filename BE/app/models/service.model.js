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
    this.possible=thanh.possible;
}
Service.addServiceSalon = function(dataService,result){
    db.query(`INSERT INTO service SET?`, dataService, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({id : rows.insertId,...dataService});
        }
    });
    
}
Service.deleteServiceSalon = function(id,result){
    db.query(`delete from service where serviceId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result("xoa service co seviceId =" + id + " thanh cong");
        }
    });

}
Service.getServiceOfSalon = function (id,result) {
    console.log(id)
    db.query(`select* from service where salonId = '${id}' and possible=1`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
Service.updateServiceSalon =function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.service SET name = '${dataUpdate.name}',price ='${dataUpdate.price}',description ='${dataUpdate.description}',content='${dataUpdate.content}',promotion='${dataUpdate.promotion}',service_time='${dataUpdate.service_time}'  WHERE (serviceId = '${id}');`, (err, rows, fields) => {
        console.log(dataUpdate)
        if (err) {
            result(null,err);
        } else {
            result(rows)
        }
    });
    
}
Service.getAllService= function (result) {
    db.query(`select* from service `, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
Service.checkService = function (id,result) {
    db.query(`select* from service where serviceId='${id}'`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
Service.getAllServiceSalon= function (id,result) {
    db.query(`SELECT swp490_g11.service.serviceId,swp490_g11.service.salonId,swp490_g11.service.name,swp490_g11.service.price,swp490_g11.service.description,swp490_g11.service.content,swp490_g11.service.promotion,swp490_g11.service.service_time,swp490_g11.service.possible,swp490_g11.image_service.image FROM swp490_g11.service
    left join swp490_g11.image_service
    on swp490_g11.service.serviceId=swp490_g11.image_service.serviceId
    where swp490_g11.service.possible=1 and swp490_g11.service.salonId='${id}'
    group by swp490_g11.service.serviceId
    order by swp490_g11.service.serviceId desc
    ;`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
Service.getServiceByIdService= function (id,result) {
    console.log(id)
    db.query(`select* from service where serviceId='${id}' and possible=1`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
Service.checkPermission= function (id,salonId,result) {
    db.query(`select* from service where serviceId='${id}' and salonId=?`,salonId, (err, rows, fields) => {
        if (err) {
            result( null,err)
        } else {
            result(rows);
        }
    });
}
Service.getAllServicePossible= function (result) {
    db.query(`select* from service where possible =1 `, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
Service.impossibleService=function (id, result) {
    db.query(`UPDATE swp490_g11.service SET possible=0  WHERE (serviceId = '${id}');`, (err, rows, fields) => {
     
        if (err) {
            result(null,err);
        } else {
            result(rows)
        }
    });
    
}
Service.getImpossibleService= function (id,result) {
    db.query(`select* from service where salonId='${id}' and possible=0`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}


module.exports =Service;