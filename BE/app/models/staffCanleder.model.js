const { DATETIME } = require('mysql/lib/protocol/constants/types');
const db = require('../common/connect');
const StaffCanleder = function (staffCanleder) {
    this.staffCanlederId = staffCanleder.staffCanlederId;
    this.staffId = staffCanleder.staffId;
    this.hour = staffCanleder.hour;
    this.date = staffCanleder.date;
    this.statusId = staffCanleder.statusId;
    this.timeBusy = staffCanleder.timeBusy;
    this.slotTotal = staffCanleder.slotTotal;
    this.slotBusy = staffCanleder.slotBusy;

}
StaffCanleder.addStaffCanderToRegisterService = function(dataStaffCanleder,result){
    console.log(dataStaffCanleder)
    db.query(`INSERT INTO staffcanledar SET?`, dataStaffCanleder, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({staffCanlederId : rows.insertId,...dataStaffCanleder});
        }
    });
    
}
StaffCanleder.cancelBooking= function(id,result){
    console.log(id)
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
    db.query(`SELECT * FROM swp490_g11.staff_canleder WHERE ( date >? and ?>date) and staffId=? and (statusId=3 or statusId=1) `,[date,date1,staffId],(err, rows, res)=>{
        
        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });
   
}
StaffCanleder.
staffCanlederOrderandBusy=function(staffId,day,result){
    db.query(`SELECT hour(swp490_g11.staff_canleder.date) as hourStart,minute(swp490_g11.staff_canleder.date) as minuteStart, hour(date_add(swp490_g11.staff_canleder.date,INTERVAL 30 minute)) as hourEnd,minute(date_add(swp490_g11.staff_canleder.date,INTERVAL 30 minute)) as minuteEnd,staffId
    from swp490_g11.staff_canleder
    where staffId=? and (swp490_g11.staff_canleder.statusId=1 or swp490_g11.staff_canleder.statusId=3 )and date(swp490_g11.staff_canleder.date)=? ;`,[staffId,day],(err, rows, res)=>{
        
        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });
}
StaffCanleder.checkCanlederStaff=function(day,staffId,result){
    
    db.query(`SELECT * FROM swp490_g11.staffcanledar where date=date(?) and staffId=?`,[day,staffId],(err, rows, res)=>{
        
        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });
}
StaffCanleder.staffCanlederBusy=function(day,staffId,result){
    
    db.query(`SELECT * FROM swp490_g11.staffcanledar where date=date(?) and staffId=?`,[day,staffId],(err, rows, res)=>{
        
        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });
}

module.exports =StaffCanleder;