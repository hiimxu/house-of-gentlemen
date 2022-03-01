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
    db.query(`select* from service where salonId like '${id}'`, (err, rows, fields) => {
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
            result("updated profile 's salon success!!!")
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
Service.getAllServiceSalon= function (id,result) {
    db.query(`select* from service where salonId='${id}'`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}

module.exports =Service;