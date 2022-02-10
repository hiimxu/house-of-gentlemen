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
        if (err) {
            result(err)
        } else {
            result("updated success customer!!!");
        }
    });

}
module.exports=Customer;