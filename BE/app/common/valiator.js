const { body,param, validationResult } = require('express-validator');
const { check } = require('express-validator');
const testRole = ["customer", "salon"];
exports.validateCreateAccountCustomer = () => {
    return [
        // check('account_name', 'Invalid does not Empty').not().isEmpty()
        body('account_name').not().isEmpty().withMessage('account_name cannot be empty').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        body('password').not().isEmpty().withMessage('password cannot be empty').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        body('birthday')
            .exists()
            .not()
            .isEmpty()
            .withMessage('birthday cannot be empty')
            .isISO8601('yyyy-mm-dd').withMessage('type of date')
        ,body('nameCustomer').not().isEmpty().isLength({min:3,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('role').not().isEmpty().withMessage("in put role"),
        body('phone').isMobilePhone("vi-VN"),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        

    ];
}
exports.validateLogin = function () {
    return [
        body('account').not().isEmpty().withMessage('account cannot be empty').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        body('password').not().isEmpty().withMessage('password cannot be empty').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        
    ];
}
exports.validateCreateAccountSalon= function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        body('password').not().isEmpty().withMessage('password cannot be empty').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email').isLength({min:3,max:45}).withMessage('min lenght 3,max lenght 45'),
        body('phone').isMobilePhone("vi-VN"),
        body('role').not().isEmpty().isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('city').not().isEmpty().isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('district').not().isEmpty().isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('detailAddress').not().isEmpty().isLength({min:1,max:450}).withMessage('min lenght 1,max lenght 450'),
        body('taxCode').not().isEmpty().isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('nameSalon').not().isEmpty().isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
    ];
}
exports.change_password=function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty').isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('old_password').not().isEmpty().withMessage('old_password cannot be empty').isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('new_password').not().isEmpty().withMessage('new_password cannot be empty').isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
    ];
}
exports.forgotPassword=function(){
    return[
        body('account_name').not().isEmpty().withMessage('account cannot be empty').isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('email').not().isEmpty().withMessage('email cannot be empty').isEmail().withMessage('validate email').isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
    ];
}
exports.checkId=function(){
    return[
        param('id').not().isEmpty().isInt()
    ];
}
exports.updateCustomerProfile=function(){
    
    return[
        body('phone').not().isEmpty().withMessage("please input phone").isMobilePhone("vi-VN").withMessage("are you sure your phone"),
        body('birthday')
            .exists()
            .not()
            .isEmpty()
            .withMessage('birthday cannot be empty')
            .isISO8601('yyyy-mm-dd').withMessage('type of date').isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
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
        body('staffId').not().isEmpty().isInt().withMessage("staffId:number"),
        body('timeUse').not().isEmpty().withMessage("timeUse:is date").isISO8601('yyyy-mm-dd').withMessage('type of date'),
        body('price_original').not().isEmpty().isInt().withMessage("price_original:is number"),
        body('service_time').not().isEmpty().isInt().withMessage("service_time:is number"),
    ];
}
exports.addFeedBackByCustomer=function(){
    return[
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
       
    ];
}
exports.updateFeedback =function(){

    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
    ];
}
exports.updateFeedbackByCustomer=function(){

    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
       
    ];
}
exports.addFeedBackDetailByCustomer=function(){
    return[
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.updateFeedbackDetailBySalon=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
       
    ];
}
exports.updateFeedbackDetail=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
        // body('salonId').not().isEmpty().withMessage("in put content").isInt("salonId:number"),
    ];
}
exports.addImageToImageSalon=function(){
    return[
        body('image').not().isEmpty().withMessage("not empty").isLength({min:1,max:2000}).withMessage('min lenght 1,max lenght 2000'),
    ];
}
exports.addServiceSalon=function(){

    return[
        body('price').not().isEmpty().withMessage("not empty"),
        body('service_time').not().isEmpty().withMessage("not empty"),
        body('promotion').not().isEmpty().withMessage("not empty").isInt().withMessage("input number"),
    ];
}
exports.updateServiceSalon=function(){   
    return[
        body('name').not().isEmpty().withMessage("not empty").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        param('idService').not().isEmpty().isInt().withMessage("idService:number and not empty"),
        body('price').not().isEmpty().withMessage("not empty"),
        body('service_time').not().isEmpty().withMessage("not empty"),
        body('promotion').not().isEmpty().withMessage("not empty").isInt().withMessage("input number"),
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
        body('image').not().isEmpty().withMessage("not empty").isLength({min:1,max:2000}).withMessage('min lenght 1,max lenght 2000'),
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number and not empty"),
    ];
}
exports.addFeedBackBySalon=function(){
    return[
        body('rate').not().isEmpty().withMessage("not empty").isInt("rate : number"),
       
        body('content').not().isEmpty().withMessage("content: not empty").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
    ];
}
exports.addFeedBackDetailBySalon=function(){
    return[
       
        body('content').not().isEmpty().withMessage("in put content").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.addStaff=function(){
     return[
         body('name').not().isEmpty().withMessage("in put content").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
        body('address').not().isEmpty().withMessage("in put address").isLength({min:1,max:450}).withMessage('min lenght 1,max lenght 450'),
    ];
}
exports.validateStaff=function(){
    return[
        body('name').not().isEmpty().withMessage("in put content").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
       body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
       body('address').not().isEmpty().withMessage("in put address").isLength({min:1,max:450}).withMessage('min lenght 1,max lenght 450'),
   ];
}
exports.updateStaff=function(){
    return[
       param('id').not().isEmpty().isInt().withMessage("id:number"),
       body('name').not().isEmpty().withMessage("in put content").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
       body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
   ];
}
exports.updateSalonOwnerProfile=function(){
    return[
       body('nameSalon').not().isEmpty().withMessage("not empty").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
       body('phone').not().isEmpty().withMessage("not empty").isMobilePhone('vi-VN').withMessage("validate phone vi-VN"),
       body('taxCode').not().isEmpty().withMessage("not empty"),
   ];
}
exports.deleteFeedbackDetailByFeedbackDetailIdBySalon=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        
        
    ];
}
exports.deleteFeedbackBySalon=function(){
    return[
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        
    ];
}
exports.updateAddressSalon=function(){
    return[
        body('city').not().isEmpty().withMessage("in put city").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('district').not().isEmpty().withMessage("in put district").isLength({min:1,max:45}).withMessage('min lenght 1,max lenght 45'),
        body('detailAddress').not().isEmpty().withMessage("in put detailAddress").isLength({min:1,max:450}).withMessage('min lenght 1,max lenght 450'),
    ]
}
exports.cancelBookingBySalon=function(){
    return[
        body('registerServiceId').not().isEmpty().withMessage("in put registerServiceId"),
        body('content').not().isEmpty().withMessage("in put content to send customer").isLength({min:1,max:200}).withMessage('min lenght 1,max lenght 200'),
    ]
}