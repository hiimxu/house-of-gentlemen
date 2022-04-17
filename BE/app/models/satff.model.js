const db = require('../common/connect');
const Staff = function (saff) {
    this.staffId = staff.staffId;
    this.salonId = staff.salonId;
    this.name = staff.name;
    this.phone = staff.phone;
    this.address = staff.address;
    this.possible = staff.possible;
}
Staff.getStaff = function (id, result) {

    db.query(`SELECT * FROM swp490_g11.staff where salonId='${id}' and possible=1 order by possible desc`, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Staff.checkPermission = function (id, salonId, result) {

    db.query(`SELECT * FROM swp490_g11.staff
    where salonId=${salonId} and staffId=${id}`, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Staff.addStaff = function (data, result) {

    db.query(`INSERT INTO staff SET?`, data, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            result({ id: rows.insertId, ...data });
        }
    });
}
Staff.getAllStaff = function (id,result){
    db.query(`SELECT * FROM swp490_g11.staff where salonId='${id}'  order by possible desc`, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Staff.updateStaff = function (id, data, result) {
    db.query(`UPDATE swp490_g11.staff SET ?  WHERE swp490_g11.staff.staffId=${id}`, data, (err, rows, fields) => {

        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });
}
Staff.deleteStaff = function (id, result) {
    db.query(`delete from swp490_g11.staff where staffId=?`, id, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            result(rows);
        }
    });
}
Staff.getTotalSlotSalon = function (id, result) {
    db.query(`select swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.totalSlot from swp490_g11.staff
    left join swp490_g11.salonowner
    on swp490_g11.staff.salonId=swp490_g11.salonowner.salonId
     where possible=1 and staffId=?`, id, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            result(rows);
        }
    });
}
Staff.impossibleStaff = function (id, result) {
    db.query(`UPDATE swp490_g11.staff SET possible=0  WHERE swp490_g11.staff.staffId=${id}`, (err, rows, fields) => {

        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });


}
Staff.possibleStaff = function (id, result) {
    db.query(`UPDATE swp490_g11.staff SET possible=1  WHERE swp490_g11.staff.staffId=${id}`, (err, rows, fields) => {

        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });


}
module.exports = Staff;