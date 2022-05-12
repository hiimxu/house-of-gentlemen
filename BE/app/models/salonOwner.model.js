const res = require('express/lib/response');
const db = require('../common/connect');

const SalonOwner = function (salon) {
    this.salonId = salon.salonId;
    this.nameSalon = salon.nameSalon;
    this.phone = salon.phone;
    this.possibility = salon.possibility;
    this.accountId = salon.accountId;
}
SalonOwner.getEmailOfSalon = function (salonId, result) {
    db.query(`SELECT swp490_g11.account.email FROM swp490_g11.salonowner
    left join swp490_g11.account
    on swp490_g11.salonowner.accountId=swp490_g11.account.account_id
     where salonId=?;`, salonId, (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            data = rows;
            result(data)
        }
    });
}
SalonOwner.getAll = function (result) {
    db.query("SELECT * FROM swp490_g11.salonowner", (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            data = rows;
            result(data)
        }
    });
}
SalonOwner.checkSalon = function (salonId, result) {
    db.query("SELECT * FROM swp490_g11.salonowner where salonId=?", salonId, (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            data = rows;
            result(data)
        }
    });
}
SalonOwner.createSalonOwner = function (data, result) {
    db.query(`INSERT INTO salonowner SET?`, data, (err, rows, res) => {
        if (null, err) {
            result(err)
        } else {
            result({ id: rows.insertId, ...data });
        }
    });
}
SalonOwner.getProfileSalon = function (id, result) {
    db.query("SELECT * FROM swp490_g11.salonowner where accountId=" + id, (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            var data = rows;
            result(data)
        }
    });
}
SalonOwner.getProfileSalonBySalonId = function (id, result) {
    db.query(`SELECT swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon
    ,swp490_g11.salonowner.phone
    ,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose
    ,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress
    ,swp490_g11.account.email,swp490_g11.account.account_id,swp490_g11.image_salon.image,swp490_g11.salonowner.description,avg(rate)/2 as AverangeVote,swp490_g11.salonowner.nameOwner
     FROM swp490_g11.salonowner
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.account
    on swp490_g11.salonowner.accountId=swp490_g11.account.account_id
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    left join swp490_g11.feedback
    on swp490_g11.salonowner.salonId=swp490_g11.feedback.salonId
    where swp490_g11.salonowner.salonId='${id}'
    group by swp490_g11.salonowner.salonId
    ;
    ` , (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            var data = rows;
            result(data)
        }
    });
}
SalonOwner.getProfileAllSalon = function (result) {
    db.query(`with temp AS(SELECT swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.taxCode,swp490_g11.address.detailAddress,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description
        ,swp490_g11.salonowner.nameOwner
        FROM swp490_g11.salonowner
        LEFT JOIN swp490_g11.address
        on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
        left join swp490_g11.feedback
        on swp490_g11.salonowner.salonId=swp490_g11.feedback.salonId
        where swp490_g11.salonowner.possibility=1
        )
        select temp.salonId,temp.nameSalon,temp.phone,temp.taxCode,temp.detailAddress,swp490_g11.image_salon.image,temp.timeOpen,temp.timeClose,temp.description,temp.nameOwner,avg(swp490_g11.feedback.rate/2) as star
        from temp
        left join swp490_g11.image_salon
        on temp.salonId=swp490_g11.image_salon.salonId
        left join swp490_g11.feedback
        on temp.salonId = swp490_g11.feedback.salonId
        group by salonId`, (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            var data = rows;
            result(data)
        }
    });
}
SalonOwner.getHomePage = function (index, result) {
    index = (index - 1) * 5;
    console.log(index)
    db.query(`with temp AS(SELECT swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.taxCode,swp490_g11.address.detailAddress,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description
        ,swp490_g11.salonowner.nameOwner
        FROM swp490_g11.salonowner
        LEFT JOIN swp490_g11.address
        on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
        left join swp490_g11.feedback
        on swp490_g11.salonowner.salonId=swp490_g11.feedback.salonId
        where swp490_g11.salonowner.possibility=1
        )
        select temp.salonId,temp.nameSalon,temp.phone,temp.taxCode,temp.detailAddress,swp490_g11.image_salon.image,temp.timeOpen,temp.timeClose,temp.description,temp.nameOwner
        from temp
        left join swp490_g11.image_salon
        on temp.salonId=swp490_g11.image_salon.salonId
        group by salonId
        limit ?,5
        `, index, (err, rows, fields) => {
        if (err) {

            result(null, err);
        } else {
            var data = rows;
            result(data)
        }
    });
}
SalonOwner.updateProfileSalon = function (id, dataUpdate, result) {
    db.query(`UPDATE swp490_g11.salonowner SET ?  WHERE (salonId = '${id}');`, dataUpdate, (err, rows, fields) => {

        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });
}
SalonOwner.setPossitiveSalonOwner = function (id, possibility, result) {
    db.query(`UPDATE swp490_g11.salonowner SET possibility = '${possibility}' WHERE (salonId = '${id}');`, (err, rows, fields) => {

        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });
}
SalonOwner.checkTimeSalon = function (id, result) {
    db.query("SELECT * FROM swp490_g11.salonowner where salonId=" + id, (err, rows, fields) => {
        if (err) {
            result(null, err);
        } else {
            var data = rows;
            result(data)
        }
    });
}
SalonOwner.searchSalon = function (name, result) {
    db.query(`with temp AS(SELECT swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.taxCode,swp490_g11.address.detailAddress,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.address.district,swp490_g11.salonowner.description,swp490_g11.salonowner.nameOwner
        FROM swp490_g11.salonowner
        LEFT JOIN swp490_g11.address
        on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
        where swp490_g11.salonowner.possibility=1 
        )
        select temp.salonId,temp.nameSalon,temp.phone,temp.taxCode,temp.detailAddress,swp490_g11.image_salon.image,temp.timeOpen,temp.timeClose,avg(swp490_g11.feedback.rate/2) as star,temp.description,temp.nameOwner
        from temp
        left join swp490_g11.image_salon
        on temp.salonId=swp490_g11.image_salon.salonId
        left join swp490_g11.feedback
        on temp.salonId=swp490_g11.feedback.salonId
        where temp.nameSalon  LIKE CONCAT('%', CONVERT('${name}', BINARY),'%')
        group by salonId`, name, (err, rows, fields) => {
        if (err) {
            result(err);
        } else {
            var data = rows;
            result(data)
        }
    });
}
SalonOwner.getSalonActive = function (name, result) {
    console.log(name)
    if (name == '') {
        db.query(`SELECT swp490_g11.account.account_id,swp490_g11.account.account_name,swp490_g11.account.email,swp490_g11.salonowner.salonId,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.possibility,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description,
    swp490_g11.salonowner.nameOwner,swp490_g11.account.role,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress,swp490_g11.image_salon.image,avg(rate)/2 as star,swp490_g11.salonowner.requestDate,swp490_g11.salonowner.joinDate
     FROM swp490_g11.salonowner
    left join swp490_g11.feedback
    on swp490_g11.feedback.salonId=swp490_g11.salonowner.salonId
    left join swp490_g11.account
    on swp490_g11.account.account_id=swp490_g11.salonowner.accountId
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    where swp490_g11.salonowner.possibility=1 
    group by swp490_g11.salonowner.salonId
    order by swp490_g11.salonowner.joinDate desc
    ;`, (err, rows, fields) => {
            if (err) {
                result(null, err);
            } else {
                var data = rows;
                result(data)
            }
        });
    } else {
        db.query(`SELECT swp490_g11.account.account_id,swp490_g11.account.account_name,swp490_g11.salonowner.salonId,swp490_g11.account.email,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.possibility,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description,
    swp490_g11.salonowner.nameOwner,swp490_g11.account.role,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress,swp490_g11.image_salon.image,avg(rate)/2 as star,swp490_g11.salonowner.requestDate,swp490_g11.salonowner.joinDate
     FROM swp490_g11.salonowner
    left join swp490_g11.feedback
    on swp490_g11.feedback.salonId=swp490_g11.salonowner.salonId
    left join swp490_g11.account
    on swp490_g11.account.account_id=swp490_g11.salonowner.accountId
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    where swp490_g11.salonowner.possibility=1 and swp490_g11.salonowner.nameSalon like'%${name}%'
    group by swp490_g11.salonowner.salonId
    order by swp490_g11.salonowner.joinDate desc
    ;`, (err, rows, fields) => {
            if (err) {
                result(null, err);
            } else {
                var data = rows;
                result(data)
            }
        });
    }
}
SalonOwner.getSalonRequest = function (name, result) {
    console.log(name)
    if (name == '') {
        db.query(`SELECT swp490_g11.account.account_id,swp490_g11.account.account_name,swp490_g11.salonowner.salonId,swp490_g11.account.email,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.possibility,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description,
    swp490_g11.salonowner.nameOwner,swp490_g11.account.role,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress,swp490_g11.image_salon.image,avg(rate)/2 as star,swp490_g11.salonowner.requestDate,swp490_g11.salonowner.joinDate
     FROM swp490_g11.salonowner
    left join swp490_g11.feedback
    on swp490_g11.feedback.salonId=swp490_g11.salonowner.salonId
    left join swp490_g11.account
    on swp490_g11.account.account_id=swp490_g11.salonowner.accountId
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    where swp490_g11.salonowner.possibility=0 
    group by swp490_g11.salonowner.salonId
    order by swp490_g11.salonowner.requestDate desc
    ;`, (err, rows, fields) => {
            if (err) {
                result(null, err);
            } else {
                var data = rows;
                result(data)
            }
        });
    } else {
        db.query(`SELECT swp490_g11.account.account_id,swp490_g11.account.account_name,swp490_g11.salonowner.salonId,swp490_g11.account.email,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.possibility,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description,
    swp490_g11.salonowner.nameOwner,swp490_g11.account.role,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress,swp490_g11.image_salon.image,avg(rate)/2 as star,swp490_g11.salonowner.requestDate,swp490_g11.salonowner.joinDate
     FROM swp490_g11.salonowner
    left join swp490_g11.feedback
    on swp490_g11.feedback.salonId=swp490_g11.salonowner.salonId
    left join swp490_g11.account
    on swp490_g11.account.account_id=swp490_g11.salonowner.accountId
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    where swp490_g11.salonowner.possibility=0 and swp490_g11.salonowner.nameSalon like'%${name}%'
    group by swp490_g11.salonowner.salonId
    order by swp490_g11.salonowner.requestDate desc
    ;`, (err, rows, fields) => {
            if (err) {
                result(null, err);
            } else {
                var data = rows;
                result(data)
            }
        });
    }
}
SalonOwner.getSalonDeactive = function (name, result) {
    console.log(name)
    if (name == '') {
        db.query(`SELECT swp490_g11.account.account_id,swp490_g11.account.account_name,swp490_g11.salonowner.salonId,swp490_g11.account.email,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.possibility,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description,
    swp490_g11.salonowner.nameOwner,swp490_g11.account.role,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress,swp490_g11.image_salon.image,avg(rate)/2 as star,swp490_g11.salonowner.requestDate,swp490_g11.salonowner.joinDate
     FROM swp490_g11.salonowner
    left join swp490_g11.feedback
    on swp490_g11.feedback.salonId=swp490_g11.salonowner.salonId
    left join swp490_g11.account
    on swp490_g11.account.account_id=swp490_g11.salonowner.accountId
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    where swp490_g11.salonowner.possibility=2 
    group by swp490_g11.salonowner.salonId
    ;`, (err, rows, fields) => {
            if (err) {
                result(null, err);
            } else {
                var data = rows;
                result(data)
            }
        });
    } else {
        db.query(`SELECT swp490_g11.account.account_id,swp490_g11.account.account_name,swp490_g11.salonowner.salonId,swp490_g11.account.email,swp490_g11.salonowner.nameSalon,swp490_g11.salonowner.phone,swp490_g11.salonowner.possibility,swp490_g11.salonowner.taxCode,swp490_g11.salonowner.timeOpen,swp490_g11.salonowner.timeClose,swp490_g11.salonowner.description,
    swp490_g11.salonowner.nameOwner,swp490_g11.account.role,swp490_g11.address.city,swp490_g11.address.district,swp490_g11.address.detailAddress,swp490_g11.image_salon.image,avg(rate)/2 as star,swp490_g11.salonowner.requestDate,swp490_g11.salonowner.joinDate
     FROM swp490_g11.salonowner
    left join swp490_g11.feedback
    on swp490_g11.feedback.salonId=swp490_g11.salonowner.salonId
    left join swp490_g11.account
    on swp490_g11.account.account_id=swp490_g11.salonowner.accountId
    left join swp490_g11.address
    on swp490_g11.salonowner.salonId=swp490_g11.address.salonId
    left join swp490_g11.image_salon
    on swp490_g11.salonowner.salonId=swp490_g11.image_salon.salonId
    where swp490_g11.salonowner.possibility=2 and swp490_g11.salonowner.nameSalon like'%${name}%'
    group by swp490_g11.salonowner.salonId
    ;`, (err, rows, fields) => {
            if (err) {
                result(null, err);
            } else {
                var data = rows;
                result(data)
            }
        });
    }
}
SalonOwner.setDeactiveSalon = function (salonId, result) {
    db.query(`UPDATE swp490_g11.salonowner SET possibility = '2' WHERE (salonId = '${salonId}');`, (err, rows, fields) => {

        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });

}
SalonOwner.setActiveSalon = function (salonId, joinDate, result) {
    console.log(joinDate)
    db.query(`UPDATE swp490_g11.salonowner SET possibility = '1',joinDate=? WHERE (salonId = '${salonId}');`, joinDate, (err, rows, fields) => {

        if (err) {
            console.log(err);
            result(err)
        } else {
            result(rows);
        }
    });

}
SalonOwner.deleteSalon = function (salonId, result) {
    db.query(`UPDATE swp490_g11.salonowner SET possibility = '3' WHERE (salonId = '${salonId}');`, (err, rows, fields) => {

        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });

}
module.exports = SalonOwner;