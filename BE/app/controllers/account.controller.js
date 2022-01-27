var Account= require('../models/account.model');

exports.account= function (req,res,next) {
    Account.getAll(function(data) {
        res.json({result:data});
    });
}
exports.get_accountbyid= function (req,res,next) {
    var id= req.params.id;
    var data=Account.getAccountById(id,function(data) {
        res.json({data});
    });
    
    
}
exports.add_account=function (req,res,next) {
    var acc= req.body.account;
    var pass=  req.body.password;
    var rol = req.body.role;
    var data ={account:acc,password:pass,role:rol}
    console.log("acc la:"+acc);
    Account.createAccount(data,function (respon) {
        res.json(respon)
    })
    
  
//    Account.createAccount(data,function (respon) {
//        res.json({result:respon})
//    }) 
}
exports.delete_accountbyid= function (req,res,next) {
    var id= req.params.id;
    Account.removeAccount
    (id,function (response) {
        res.json(response);
    })
}