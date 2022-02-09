const res = require('express/lib/response');
const db = require('../common/connect');

const SalonOwner = function (salon) {
    this.salonId = salon.salonId;
    this.nameSalon=salon.nameSalon;
    this.phone=salon.phone;
    this.addressId=salon.addressId;
    this.possibility=salon.possibility;
    this.accountId=salon.accountId;

}
SalonOwner.getAll = function (result) {


    db.query("SELECT * FROM swp490_g11.salonowner", (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            data = rows;
            // console.log(data);
            result(data)
        }


    })


}
module.exports = SalonOwner;