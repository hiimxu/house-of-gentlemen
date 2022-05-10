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
   
    db.query(`with t as (
        SELECT swp490_g11.feedback.feedBackId,swp490_g11.feedback.customerId,swp490_g11.feedback.wsend,swp490_g11.feedback.salonId,swp490_g11.feedback.content,swp490_g11.feedback.rate,swp490_g11.feedback.dateCreate,swp490_g11.feedback.dateUpdate,swp490_g11.customer.nameCustomer FROM swp490_g11.feedback
        left join swp490_g11.customer
        on swp490_g11.feedback.customerId=swp490_g11.customer.customerId
        where salonId='${id}' 
        order by dateCreate desc
        )
        select t.feedbackId,t.customerId,t.wsend,t.salonId,t.content,t.rate,t.dateCreate,t.dateUpdate,t.nameCustomer,swp490_g11.salonowner.nameSalon
        from t
        left join swp490_g11.salonowner
        on t.salonId= swp490_g11.salonowner.salonId`, (err, rows, fields) => {
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
Feedback.getFeedbackByStar = function (id,star,result){
    var rate=star*2;
    var rate2=rate-1;
    
    if (star=='') {
        db.query(`SELECT swp490_g11.feedback.feedBackId,swp490_g11.feedback.customerId,swp490_g11.feedback.salonId,swp490_g11.feedback.content,swp490_g11.feedback.rate,swp490_g11.feedback.wsend,swp490_g11.feedback.dateCreate,swp490_g11.customer.nameCustomer,swp490_g11.customer.phone FROM swp490_g11.feedback
        left join swp490_g11.customer
        on swp490_g11.customer.customerId=swp490_g11.feedback.customerId
        where salonId='${id}'
        order by (swp490_g11.feedback.dateCreate) desc  `, (err, rows, fields) => {
            if (err) {
               
                result(err);
            } else {
                data = rows;
                result(data);
            }
        });
    }
    else{
        db.query(`SELECT swp490_g11.feedback.feedBackId,swp490_g11.feedback.customerId,swp490_g11.feedback.salonId,swp490_g11.feedback.content,swp490_g11.feedback.rate,swp490_g11.feedback.wsend,swp490_g11.feedback.dateCreate,swp490_g11.customer.nameCustomer,swp490_g11.customer.phone FROM swp490_g11.feedback
        left join swp490_g11.customer
        on swp490_g11.customer.customerId=swp490_g11.feedback.customerId
         where salonId='${id}' and (rate='${rate}' or rate='${rate2}')
         order by (swp490_g11.feedback.dateCreate) desc`, (err, rows, fields) => {
            if (err) {
               
                result(err);
            } else {
                data = rows;
                result(data);
            }
        });
    }
    
}
Feedback.getVoteOfSalon = function (id,result){
    db.query(`SELECT avg(rate)/2 as AverangeVote,count(rate) as TotalVote FROM swp490_g11.feedback
    where salonId ='${id}'
    ;`, (err, rows, fields) => {
        if (err) {
           
            result(err);
        } else {
            data = rows;
            result(data);
        }
    });
}

module.exports =Feedback;