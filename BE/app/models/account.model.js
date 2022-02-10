

const res = require('express/lib/response');
const db = require('../common/connect');
const Account = function (acc) {
    this.account_id = acc.account_id;
    this.account = acc.account;
    this.password = acc.password;
    this.role = acc.role;

}
Account.getAll = function (result) {


    db.query("SELECT * FROM swp490_g11.Account", (err, rows, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            data = rows;
            // console.log(data);
            result(data)
        }


    })


}

Account.getAccountToLogin = function (acc, pass, result) {
    db.query(`SELECT * FROM swp490_g11.Account where account_name like '${acc}' and password like '${pass}' `, (err, account, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(account)
        }
    })

}
Account.getAccountById = function (id, result) {
    // var data= {account_id:id,account:'admin',password:'123',role:'admin'}
    db.query(`SELECT * FROM swp490_g11.Account where account_id =${id}`, (err, account, fields) => {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(account)
        }
    })


}
Account.createAccount = function (data, result) {

    db.query(`INSERT INTO account SET?`, data, (err, rows, res) => {
        if (err) {
            result(err)
        } else {
            result(rows.insertId);
        }
    });

}
Account.checkAccount = function (data, result) {
    db.query(`select*from account where account_name like '${data.account_name}'`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows)
        }

    });


};
Account.checkPassword = function (acc,pass, result) {
    db.query(`select*from account where account_name like '${acc}' and password like '${pass}'`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows)
        }

    });


};
Account.removeAccount = function (id, result) {
    db.query(`delete from account where account_id = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result("xoa account co account_id =" + id + " thanh cong");
        }

    });
}
Account.updatePasswordAccount= function (id,new_pass, result) {
    
    db.query(`update account set password=${new_pass} WHERE (account_id = '${id}')`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result("updated password")
        }

    });
}

module.exports = Account;