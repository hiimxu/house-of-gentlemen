const db = require('../common/connect');

const Feedback = function (feedback) {
    this.feedBackId = feedback.feedBackId;
    this.customerId = feedback.customerId;
    this.content = feedback.content;
    this.rate = feedback.rate;
    this.salonId = feedback.salonId;
    this.wsend = feedback.wsend;
    
}
Feedback.addFeedBackBySalon = function(data,result){
    db.query(`INSERT INTO feedback SET?`, data, (err, rows, res) => {
        if (err) {
            result(null,err);
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Feedback.getFeedbackOfSalon = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback where salonId='${id}' order by dateCreate desc`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback.deleteFeedback = function (id,result) {
   
    db.query(`delete from feedback where feedBackId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            result(rows);
        }
    });
}
Feedback.updateFeedback =function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.feedback SET ?  WHERE (feedBackId= '${id}');`,dataUpdate,(err, rows, fields) => {
      console.log(dataUpdate.dateUpdate);
        if (err) {
            result( null,err)
        } else {
            result(rows)
        }
    });
}

Feedback.addFeedBackByCustomer = function(data,result){
    db.query(`INSERT INTO feedback SET?`, data, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Feedback.checkFeedBackofSalon= function (idSalon,idFeedBack,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback where salonId='${idSalon}' and feedBackId='${idFeedBack}'`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });

}
Feedback.checkEmpty=function(idFeedBack,result){
    db.query(`SELECT * FROM swp490_g11.feedback where feedBackId='${idFeedBack}'`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback.checkPermission= function (id,idSalon,wsend,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback where feedBackId='${id}' and salonId='${idSalon}' and wsend='${wsend}'`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback.checkPermissionCustomer= function (id,customerId,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback where feedBackId='${id}' and customerId='${customerId}'`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}

module.exports =Feedback;