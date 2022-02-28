const db = require('../common/connect');
const StaffCanleder = function (staffCanleder) {
    this.staffCanlederId = staffCanleder.staffCanlederId;
    this.staffId = staffCanleder.staffId;
    this.hour = staffCanleder.hour;
    this.date = staffCanleder.date;
    this.statusId = staffCanleder.statusId;
}
StaffCanleder.addStaffCanderToRegisterService = function(dataStaffCanleder,result){
    db.query(`INSERT INTO staff_canleder SET?`, dataStaffCanleder, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({staffCanlederId : rows.insertId,...dataStaffCanleder});
        }
    });
    
}
StaffCanleder.cancelBooking= function(id,result){
    db.query(`UPDATE staff_canleder SET statusId='2' where staffCanlederId=?`,id, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result(rows);
        }
    });
    
}
module.exports =StaffCanleder;