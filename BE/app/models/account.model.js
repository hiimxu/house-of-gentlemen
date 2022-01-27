

const res = require('express/lib/response');
const db= require('../common/connect');
const Account=function (acc) {
    this.account_id=acc.account_id;
    this.account=acc.account;
    this.password=acc.password;
    this.role= acc.role;

}
Account.getAll= function(result) {


    db.query("SELECT * FROM swp490_g11.Account",(err,rows,fields)=>{
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
Account.getAccountById= function(id,result) {
    // var data= {account_id:id,account:'admin',password:'123',role:'admin'}
    db.query(`SELECT * FROM swp490_g11.Account where account_id =${id}`,(err,account,fields)=>{
        if (err) {
            console.log(err);
            result(err);
        } else {
         result(account)
        }  
        })
  
    
}
Account.createAccount= function (data,result) {
    db.query(`INSERT INTO swp490_g11.Account SET?`,data,function(err,acc) {
            if (err) {
                result(err);
            } else {
                result({data});
            }
        })
        
   
    
}
Account.removeAccount= function (id,result) {
    result("xoa thanh cong id:"+id)
}
module.exports= Account;