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
            result(err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Feedback.getFeedbackOfSalon = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback where salonId='${id}' order by dateCreate desc`, (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback.deleteFeedback = function (id,result) {
   
    db.query(`delete from feedback where feedBackId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            result("xoa feedback co feedBackId =" + id + " thanh cong");
        }
    });
}
Feedback.updateFeedback =function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.feedback SET ?  WHERE (feedBackId= '${id}');`,dataUpdate,(err, rows, fields) => {
      console.log(dataUpdate.dateUpdate);
        if (err) {
            result( err)
        } else {
            result("updated Feedback success!!!")
        }
    });
}

Feedback.addFeedBackByCustomer = function(data,result){
    db.query(`INSERT INTO feedback SET?`, data, (err, rows, res) => {
        if (err) {
            result(err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}


module.exports =Feedback;