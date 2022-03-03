const { DATETIME } = require('mysql/lib/protocol/constants/types');
const db = require('../common/connect');
const StaffCanleder = function (staffCanleder) {
    this.staffCanlederId = staffCanleder.staffCanlederId;
    this.staffId = staffCanleder.staffId;
    this.hour = staffCanleder.hour;
    this.date = staffCanleder.date;
    this.statusId = staffCanleder.statusId;
    this.timeBusy = staffCanleder.timeBusy;
}
StaffCanleder.addStaffCanderToRegisterService = function(dataStaffCanleder,result){
    console.log(dataStaffCanleder)
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
StaffCanleder.checkCanleder = function (date,date1,staffId,result) {
    
  
    
    // date1=new Date(date1);
    db.query(`SELECT * FROM swp490_g11.staff_canleder WHERE ( date >? and ?>date) and staffId=? `,[date,date1,staffId],(err, rows, res)=>{
        
        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });
   
}

module.exports =StaffCanleder;