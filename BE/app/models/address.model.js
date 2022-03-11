const db = require('../common/connect');

const Address = function (address) {
    this.addressId = address.addressId;
    this.city=address.city;
    this.district=address.district;
    this.detailAddress=address.detailAddress;
    this.salonId=add.salonId;
}

Address.getAddressOfSalon= function (id,result){
    
    db.query(`SELECT * FROM swp490_g11.address where salonId=?`,id, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data)
        }
    });
}
Address.getDataByDistrict=function(district,result){
    db.query(`SELECT swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.taxCode,swp490_g11.address.detailAddress
    FROM swp490_g11.address,swp490_g11.salonowner
    where swp490_g11.address.salonId=swp490_g11.salonowner.salonId and swp490_g11.address.district like ?`,district, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            data = rows;
            result(data)
        }
    });
}
Address.addAddress=function(data,result){
    db.query(`INSERT INTO swp490_g11.address (city, district, detailAddress, salonId) VALUES (?,?, ?, ?);`,[data.city,data.district,data.detailAddress,data.salonId], (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Address.updateAddressSalon=function(id,data,result){
    db.query(`UPDATE swp490_g11.address SET ?  WHERE salonId=${id}`,data,(err, rows, fields) => {
     
        if (err) {
            result(err)
        } else {
            result(rows)
        }
    });
}

module.exports =Address;