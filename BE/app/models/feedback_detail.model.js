const db = require('../common/connect');

const Feedback_detail = function (feedbackDetail) {
    this.feedBackDetailId = feedbackDetail.feedBackDetailId;
    this.feedBackId = feedbackDetail.feedBackId;
    this.content = feedbackDetail.content;
    this.customerId = feedbackDetail.customerId;
    this.salonId = feedbackDetail.salonId;
    this.wsend = feedbackDetail.wsend;
    
}
Feedback_detail.addFeedBackDetailBySalon = function(data,result){
    db.query(`INSERT INTO feedback_detail SET?`, data, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Feedback_detail.getFeedbackDetail = function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback_detail where feedBackId='${id}' order by dateCreate desc`, (err, rows, fields) => {
        if (err) {
           
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback_detail.deleteFeedbackDetailByFeedbackDetailId= function (id,result) {
   
    db.query(`delete from feedback_detail where feedBackDetailId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            result(rows);
        }
    });
}

Feedback_detail.deleteFeedbackDetailByFeedbackId= function (id,result) {
   
    db.query(`delete from feedback_detail where feedBackId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            result("xoa feedback_detail co feedBacklId =" + id + " thanh cong");
        }
    });
}
Feedback_detail.updateFeedbackDetail=function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.feedback_detail SET ?  WHERE (feedBackDetailId= '${id}');`,dataUpdate,(err, rows, fields) => {
      console.log(dataUpdate.dateUpdate);
        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });
}
Feedback_detail.addFeedBackDetailByCustomer= function(data,result){
    db.query(`INSERT INTO feedback_detail SET?`, data, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Feedback_detail.checkPermissionOfSalon= function (id,idSalon,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback_detail where feedBackDetailId='${id}' and salonId='${idSalon}' and wsend='salon'`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback_detail.checkPermission= function (id,idSalon,wsend,result) {
    db.query(`SELECT * FROM swp490_g11.feedback_detail where feedBackDetailId='${id}' and salonId='${idSalon}' and wsend='${wsend}'`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback_detail.checkPermissionCustomer= function (id,idCustomer,result) {
    db.query(`SELECT * FROM swp490_g11.feedback_detail where feedBackDetailId='${id}' and customerId='${idCustomer}' `, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback_detail.checkEmpty= function (id,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback_detail where feedBackDetailId='${id}'`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Feedback_detail.checkEmptyByCustomer= function (id,customerId,result) {
   
    db.query(`SELECT * FROM swp490_g11.feedback_detail where feedBackDetailId='${id}' and customerId='${customerId}'`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}
module.exports =Feedback_detail;