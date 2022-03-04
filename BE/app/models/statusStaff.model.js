const db = require('../common/connect');
const StatusStaff = function (statusStaff) {
    this.statusId = statusStaff.statusId;
    this.nameStatus = statusId.nameStatus;
    
}
StatusStaff.getAllStaffStatus=function(result){
    db.query(`SELECT * FROM swp490_g11.status_staff`, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}
StatusStaff.getStaffStatusByIdstatusStaff=function(id,result){
    db.query(`SELECT * FROM swp490_g11.status_staff where statusId=?`,id, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}

module.exports =StatusStaff;