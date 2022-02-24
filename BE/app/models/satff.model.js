const db = require('../common/connect');
const Staff = function (saff) {
    this.saffId = staff.saffId;
    this.salonId = staff.salonId;
    this.name = staff.name;
    this.phone = staff.phone;
    this.address = staff.address;
}
Staff.getStaff = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.staff where salonId='${id}'`, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Staff.addStaff= function (data,result) {
   
    db.query(`INSERT INTO staff SET?`,data, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Staff.updateStaff=function (id,data, result) {
    db.query(`UPDATE swp490_g11.staff SET ?  WHERE (saffId"= '${id}');`,data,(err, rows, fields) => {
     
        if (err) {
            result(null, err)
        } else {
            result("updated staff success!!!")
        }
    });
}
Staff.deleteStaff= function (id,result) {
   
    db.query(`delete from staff where saffId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            result("xoa Staff co saffId =" + id + " thanh cong");
        }
    });
}
module.exports =Staff;