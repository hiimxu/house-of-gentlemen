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
        

    ];
}
exports.validateLogin = function () {
    return [
        body('account').not().isEmpty().withMessage('account cannot be empty'),
        body('password').not().isEmpty().withMessage('password cannot be empty'),
        
    ];
}
exports.validateCreateAccountSalon= function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty'),
        body('password').not().isEmpty().withMessage('password cannot be empty'),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email'),
        body('phone').isMobilePhone("vi-VN"),
        body('role').not().isEmpty(),
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
       
    ];
}
exports.BookingService=function(){
    return[
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number"),
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('customerId').not().isEmpty().isInt().withMessage("customerId:number"),
        body('staffId').not().isEmpty().isInt().withMessage("staffId:number"),
        body('timeUse').not().isEmpty().withMessage("timeUse:is date"),
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
        body('salonId').not().isEmpty().withMessage("not empty").isInt().withMessage("salonId:number")
    ];
}
exports.updateFeedbackByCustomer=function(){

    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
       
    ];
}
exports.addFeedBackDetailByCustomer=function(){
    return[
        body('content').not().isEmpty().withMessage("in put content"),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.updateFeedbackDetailBySalon=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        body('salonId').not().isEmpty().withMessage("in put content").isInt("salonId:number"),
    ];
}
exports.updateFeedbackDetail=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        // body('salonId').not().isEmpty().withMessage("in put content").isInt("salonId:number"),
    ];
}
exports.addImageToImageSalon=function(){
    return[
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number and not empty"),
        body('image').not().isEmpty().withMessage("not empty"),
    ];
}
exports.addServiceSalon=function(){

    return[
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number and not empty"),
        body('price').not().isEmpty().withMessage("not empty"),
        body('service_time').not().isEmpty().withMessage("not empty"),
        body('promotion').not().isEmpty().withMessage("not empty"),
    ];
}
exports.updateServiceSalon=function(){   
    return[
        body('name').not().isEmpty().withMessage("not empty"),
        param('idService').not().isEmpty().isInt().withMessage("idService:number and not empty"),
        body('price').not().isEmpty().withMessage("not empty"),
        body('service_time').not().isEmpty().withMessage("not empty"),
        body('promotion').not().isEmpty().withMessage("not empty"),
    ];
}
exports.addCategoryService=function(){ 
       return[
        body('categoryId').not().isEmpty().isInt().withMessage("categoryId:number and not empty"),
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number and not empty"),
    ];
}
exports.addImageService=function(){
    return[
        body('image').not().isEmpty().withMessage("not empty"),
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number and not empty"),
    ];
}
exports.addFeedBackBySalon=function(){
    return[
        body('rate').not().isEmpty().withMessage("not empty").isInt("rate : number"),
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number and not empty"),
        body('content').not().isEmpty().withMessage("content: not empty"),
    ];
}
exports.addFeedBackDetailBySalon=function(){
    return[
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('content').not().isEmpty().withMessage("in put content"),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.addStaff=function(){
     return[
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('name').not().isEmpty().withMessage("in put content"),
        body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
    ];
}
exports.updateStaff=function(){
    return[
       param('id').not().isEmpty().isInt().withMessage("id:number"),
       body('name').not().isEmpty().withMessage("in put content"),
       body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
   ];
}
exports.updateSalonOwnerProfile=function(){
    return[
       param('id').not().isEmpty().isInt().withMessage("id:number"),
       body('nameSalon').not().isEmpty().withMessage("not empty"),
       body('phone').not().isEmpty().withMessage("not empty").isMobilePhone('vi-VN').withMessage("validate phone vi-VN"),
       body('taxCode').not().isEmpty().withMessage("not empty"),
   ];
}
exports.deleteFeedbackDetailByFeedbackDetailIdBySalon=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('salonId').not().isEmpty().withMessage("not empty").isInt().withMessage("salonId:int"),
        
    ];
}
exports.deleteFeedbackBySalon=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('salonId').not().isEmpty().withMessage("not empty").isInt().withMessage("salonId:int"),
        
    ];
}