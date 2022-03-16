const res = require('express/lib/response');
const db = require('../common/connect');

const SalonOwner = function (salon) {
    this.salonId = salon.salonId;
    this.nameSalon=salon.nameSalon;
    this.phone=salon.phone;
    this.possibility=salon.possibility;
    this.accountId=salon.accountId;
}
SalonOwner.getAll = function (result) {
    db.query("SELECT * FROM swp490_g11.salonowner", (err, rows, fields) => {
        if (err) {
           
            result(null,err);
        } else {
            data = rows;
            result(data)
        }
    });
}
SalonOwner.createSalonOwner = function (data, result) {
    db.query(`INSERT INTO salonowner SET?`, data, (err, rows, res) => {
        if (null,err) {
            result(err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
SalonOwner.getProfileSalon =function (id, result) {
    db.query("SELECT * FROM swp490_g11.salonowner where accountId="+id, (err, rows, fields) => {
        if (err) {
           
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}
SalonOwner.getProfileAllSalon =function (result) {
    db.query(`with temp AS(SELECT swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.taxCode,swp490_g11.address.detailAddress,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose
        FROM swp490_g11.salonowner
        LEFT JOIN swp490_g11.address
        on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
        where swp490_g11.salonowner.possibility=1
        )
        select temp.salonId,temp.nameSalon,temp.phone,temp.taxCode,temp.detailAddress,swp490_g11.image_salon.image,temp.timeOpen,temp.timeClose
        from temp
        left join swp490_g11.image_salon
        on temp.salonId=swp490_g11.image_salon.salonId
        group by salonId`, (err, rows, fields) => {
        if (err) {
           
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}
SalonOwner.updateProfileSalon =function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.salonowner SET ?  WHERE (salonId = '${id}');`, dataUpdate,(err, rows, fields) => {
       
        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });
}
SalonOwner.setPossitiveSalonOwner=function (id,possibility, result) {
    db.query(`UPDATE swp490_g11.salonowner SET possibility = '${possibility}' WHERE (salonId = '${id}');`, (err, rows, fields) => {
       
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });
}
SalonOwner.checkTimeSalon=function(id,result){
    db.query("SELECT * FROM swp490_g11.salonowner where salonId="+id, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}
module.exports = SalonOwner;