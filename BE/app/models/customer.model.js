const db = require('../common/connect');
const Customer = function (customer) {
    this.customerId = customer.customerId;
    this.nameCustomer=customer.nameCustomer;
    this.phone=customer.phone;
    this.address=customer.address;
    this.birthday=customer.birthday;
    this.accountId=customer.accountId;
}
Customer.createCustomer = function (data, result) {
    db.query(`INSERT INTO customer SET?`, data, (err, rows, res) => {
        if (null,err) {
            result(err)
        } else {
            result({id : rows.insertId,...data});
        }
    });
}
Customer.getCustomerSalon =function (id, result) {
    db.query("SELECT * FROM swp490_g11.customer where accountId="+id, (err, rows, fields) => {
        if (err) {
           
            result(null,err);
        } else {
           var data = rows;
            result(data)
        }
    });
}
Customer.updateProfileCustomer =function (id,dataUpdate, result) {
    db.query(`UPDATE swp490_g11.customer SET ?  WHERE (customerId = '${id}');`,dataUpdate, (err, rows, fields) => {
       
        if (err) {
            result(null, err)
        } else {
            result({dataUpdate})
        }
    });
}
module.exports=Customer;