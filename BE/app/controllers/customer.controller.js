var Customer = require('../models/customer.model');
var FeedBack = require('../models/feedBack.model');



exports.getCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    try {
        Customer.getCustomerSalon(id, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}
exports.updateCustomerProfile = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = req.body;
    try {
        Customer.updateProfileCustomer(id, dataUpdate, function (data) {
            res.json(data);
        });
    } catch (error) {
        res.json(error);
    }
}







exports.updateFeedback = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate = req.body;
    var dateUpdate = new Date();
    dataUpdate = { dateUpdate: dateUpdate, ...dataUpdate };

    FeedBack.updateFeedback(id, dataUpdate, function (data) {

        res.json({ result: data });
    });
}



