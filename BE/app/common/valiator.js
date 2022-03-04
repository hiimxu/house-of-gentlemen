const { body,param, validationResult } = require('express-validator');
const { check } = require('express-validator');
const testRole = ["customer", "salon"];
exports.validateCreateAccountCustomer = () => {
    return [
        // check('account_name', 'Invalid does not Empty').not().isEmpty()
        body('account_name').not().isEmpty().withMessage('account_name cannot be empty'),
        body('password').not().isEmpty().withMessage('password cannot be empty'),
        body('birthday')
            .exists()
            .not()
            .isEmpty()
            .withMessage('birthday cannot be empty')
            .isISO8601('yyyy-mm-dd').withMessage('type of date')
        , body('nameCustomer').not().isEmpty(),
        body('role').not().isEmpty(),
        body('phone').isMobilePhone("vi-VN"),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email'),
        body('possibility').not().isEmpty()

    ];
}
exports.validateLogin = function () {
    return [
        body('account').not().isEmpty().withMessage('account cannot be empty'),
        body('password').not().isEmpty().withMessage('password cannot be empty'),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email'),
        body('phone').isMobilePhone("vi-VN"),
        body('role').not().isEmpty(),
    ];
}
exports.validateCreateAccountSalon= function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty'),
        body('password').not().isEmpty().withMessage('password cannot be empty'),

    ];
}
exports.change_password=function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty'),
        body('old_password').not().isEmpty().withMessage('old_password cannot be empty'),
        body('new_password').not().isEmpty().withMessage('new_password cannot be empty'),
    ];
}
exports.forgotPassword=function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty'),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email'),
    ];
}
exports.checkId=function(){
    return[
        param('id').not().isEmpty().isInt()
    ];
}
exports.updateCustomerProfile=function(){
    
    return[
        param('id').not().isEmpty().isInt().withMessage('param is number'),
        body('phone').isMobilePhone("vi-VN"),
        body('birthday')
            .exists()
            .not()
            .isEmpty()
            .withMessage('birthday cannot be empty')
            .isISO8601('yyyy-mm-dd').withMessage('type of date')
    ];
}
exports.setPossitiveSalonOwner=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('possibility').not().isEmpty().withMessage("not empty")
    ];
}
exports.cancelBooking=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('staffCanlederId').not().isEmpty().isInt().withMessage("id:number"),
    ];
}
exports.BookingService=function(){
    return[
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number"),
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('customerId').not().isEmpty().isInt().withMessage("customerId:number"),
        body('staffId').not().isEmpty().isInt().withMessage("staffId:number"),
        body('timeUse').not().isEmpty().isDate().withMessage("timeUse:is date"),
        body('price_original').not().isEmpty().isInt().withMessage("price_original:is number"),
        body('service_time').not().isEmpty().isInt().withMessage("service_time:is number"),
    ];
}
exports.addFeedBackByCustomer=function(){
    return[
        body('customerId').not().isEmpty().isInt().withMessage("serviceId:customerId"),
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
       
    ];
}
exports.updateFeedback =function(){

    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
    ];
}
exports.addFeedBackDetailByCustomer=function(){
    return[
        body('customerId').not().isEmpty().isInt().withMessage("customerId:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.updateFeedbackDetail=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content"),
    ];
}

