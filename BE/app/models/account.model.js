const res = require('express/lib/response');
const db = require('../common/connect');
const Account = function (acc) {
    this.account_id = acc.account_id;
    this.account = acc.account;
    this.password = acc.password;
    this.role = acc.role;
    this.email = acc.email;
    this.token = acc.token;
}
Account.getAll = function (result) {
    db.query("SELECT * FROM swp490_g11.account", (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data)
        }
    });
}
Account.getAllAccountSalon = function (result) {
    db.query("SELECT * FROM swp490_g11.account where role='salon'", (err, rows, fields) => {
        if (err) {
            
            result(null,err);
        } else {
            data = rows;
            result(data)
        }
    });
}
Account.getAccountToLogin = function (acc, pass, result) {
    db.query(`SELECT * FROM swp490_g11.account where account_name like '${acc}' and password like '${pass}' `,(err, rows, fields) => {
        if (err) {
          
            result(null,err);
        } else {
            
            result(rows);
        }
    })
   
}
Account.getAccountById = function (id, result) {
    db.query(`SELECT * FROM swp490_g11.account where account_id =${id}`, (err, account, fields) => {
        if (err) {
            result(null,err);
        } else {
            result(account)
        }
    })
}
Account.createAccount = function( save_data, result) {
    db.query(`INSERT INTO account SET?`, save_data, (err, rows, res) => {
        if (err) {
            result(err)
        } else {
            result({accountId:rows.insertId,...save_data});
        }
    });
}
Account.checkAccount = function (account_name, result) {
    db.query(`select*from account where account_name like '${account_name}'`, (err, rows, fields) => {
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
Account.updatePasswordAccount= function (id,md5_new_pass, result) {
    console.log(md5_new_pass)
    var password='abc'
    db.query(`UPDATE swp490_g11.account SET password = '${md5_new_pass}' where account_id =?`,id,(err, rows, fields) => {
        
        if (err) {
            result(null, err)
        } else {
            result("updated password")
        }
    });
}
Account.updateToken=function (account_name, token,result) {
    console.log(token)
    var password='abc'
    db.query(`UPDATE swp490_g11.account SET token = '${token}' where account_name =?`,account_name,(err, rows, fields) => {
        
        if (err) {
            result(null, err)
        } else {
            result(rows)
        }
    });
}


module.exports = Account;