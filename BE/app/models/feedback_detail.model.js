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
   
    db.query(`with t as(
        SELECT swp490_g11.feedback_detail.feedBackDetailId,swp490_g11.feedback_detail.feedBackId,swp490_g11.feedback_detail.content,swp490_g11.feedback_detail.customerId,swp490_g11.feedback_detail.salonId,swp490_g11.feedback_detail.wsend,swp490_g11.feedback_detail.dateCreate,swp490_g11.feedback_detail.dateUpdate,swp490_g11.customer.nameCustomer
         FROM swp490_g11.feedback_detail
        left join swp490_g11.customer
        on swp490_g11.feedback_detail.customerId= swp490_g11.customer.customerId
        where swp490_g11.feedback_detail.feedBackId='${id}'
        )
        select t.feedBackDetailId,t.feedBackId,t.content,t.customerId,t.salonId,t.wsend,t.dateCreate,t.dateUpdate,t.nameCustomer,swp490_g11.salonowner.nameSalon
        from t
        left join swp490_g11.salonowner
        on t.salonId=swp490_g11.salonowner.salonId`, (err, rows, fields) => {
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