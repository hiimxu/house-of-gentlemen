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
    db.query("SELECT * FROM swp490_g11.salonowner where possibility=1", (err, rows, fields) => {
        if (err) {
           
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}
SalonOwner.updateProfileSalon =function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.salonowner SET nameSalon = '${dataUpdate.nameSalon}', taxCode = '${dataUpdate.taxCode}', phone = '${dataUpdate.phone}'  WHERE (salonId = '${id}');`, (err, rows, fields) => {
       
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

module.exports = SalonOwner;