const { body, param, validationResult } = require('express-validator');
const { check } = require('express-validator');
const testRole = ["customer", "salon"];
var regexHour = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
var regexDateTime=new RegExp(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/);
exports.validateCreateAccountCustomer = () => {
    return [
        // check('account_name', 'Invalid does not Empty').not().isEmpty()
        body('account_name').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage('account:min lenght 3,max lenght 45'),
        body('password').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage('password:min lenght 3,max lenght 45'),
        body('birthday')
            .exists()
            .not()
            .isEmpty()
            .isISO8601('yyyy-mm-dd').withMessage('type of date')
        , body('nameCustomer').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage(`name's customer min lenght 1,max lenght 45`),
        body('role').not().isEmpty().withMessage("in put role"),
        body('phone').not().isEmpty().isMobilePhone("vi-VN"),
        body('email').not().isEmpty().isEmail().withMessage('validate email').isLength({ min: 3, max: 45 }).withMessage('email :min lenght 3,max lenght 45'),


    ];
}
exports.validateLogin = function () {
    return [
        body('account').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage('account :min lenght 3,max lenght 45'),
        body('password').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage('password :min lenght 3,max lenght 45'),

    ];
}
exports.validateCreateAccountSalon = function () {
    return [
        body('account_name').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage('account :min lenght 3,max lenght 45'),
        body('password').not().isEmpty().isLength({ min: 3, max: 45 }).withMessage('password:min lenght 3,max lenght 45'),
        body('email').not().isEmpty().isEmail().withMessage('validate email').isLength({ min: 3, max: 45 }).withMessage('email:min lenght 3,max lenght 45'),
        body('phone').isMobilePhone("vi-VN").withMessage('validate phone'),
        body('role').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('role:min lenght 1,max lenght 45'),
        body('city').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('city:min lenght 1,max lenght 45'),
        body('district').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('district:min lenght 1,max lenght 45'),
        body('detailAddress').not().isEmpty().isLength({ min: 1, max: 450 }).withMessage('address:min lenght 1,max lenght 450'),
        body('taxCode').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('tax code:min lenght 1,max lenght 45'),
        body('nameSalon').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('name of salon :min lenght 1,max lenght 45'),
        body('timeOpen').exists()
        .not()
        .isEmpty().matches(regexHour).withMessage("timeOpen hour hh:mm"),
        body('timeClose').exists()
            .not()
            .isEmpty().matches(regexHour).withMessage("timeEnd: hour hh:mm"),
    ];
}
exports.change_password = function () {
    return [
        body('account_name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('account :min lenght 1,max lenght 45'),
        body('old_password').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('password :min lenght 1,max lenght 45'),
        body('new_password').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('new password:min lenght 1,max lenght 45'),
    ];
}
exports.forgotPassword = function () {
    return [
        body('account_name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('account:min lenght 1,max lenght 45'),
        body('email').not().isEmpty().isEmail().withMessage('validate email').isLength({ min: 1, max: 45 }).withMessage('email:min lenght 1,max lenght 45'),
    ];
}
exports.checkId = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage('id:number')
    ];
}
exports.updateCustomerProfile = function () {

    return [
        body('phone').not().isEmpty().isMobilePhone("vi-VN").withMessage("are you sure your phone"),
        body('birthday')
            .exists()
            .not()
            .isEmpty()

            .isISO8601('yyyy-mm-dd').withMessage('type of date').isLength({ min: 1, max: 45 }).withMessage('min lenght 1,max lenght 45'),
    ];
}
exports.setPossitiveSalonOwner = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('possibility').not().isEmpty().isInt().withMessage("possibility is number")
    ];
}
exports.cancelBooking = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),

    ];
}
exports.BookingService = function () {
    return [
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number"),
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('staffId').not().isEmpty().isInt().withMessage("staffId:number"),
        body('timeUse')
            .exists()
            .not()
            .isEmpty()
            .withMessage('start cannot be empty').matches(regexDateTime).withMessage("time use:yyyy-mm-dd hh:mm:ss"),
        body('price_original').not().isEmpty().isInt().withMessage("price_original:is number"),
        body('service_time').not().isEmpty().isInt().withMessage("service_time:is number"),
    ];
}
exports.addFeedBackByCustomer = function () {
    return [
        body('salonId').not().isEmpty().isInt().withMessage("salonId:number"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),

    ];
}
exports.updateFeedback = function () {

    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),
    ];
}
exports.updateFeedbackByCustomer = function () {

    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('rate').not().isEmpty().isInt().withMessage("rate:number"),

    ];
}
exports.addFeedBackDetailByCustomer = function () {
    return [
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.updateFeedbackDetailBySalon = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),

    ];
}
exports.updateFeedbackDetail = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),

    ];
}
exports.addImageToImageSalon = function () {
    return [
        body('image').not().isEmpty().withMessage("not empty").isLength({ min: 1, max: 450 }).withMessage('image:min lenght 1,max lenght 450'),
    ];
}
exports.addServiceSalon = function () {

    return [
        body('name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('image:min lenght 1,max lenght 45'),
        body('price').not().isEmpty().isInt().withMessage("price : number"),
        body('service_time').not().isEmpty().isInt().withMessage("service_time: number"),
        body('promotion').not().isEmpty().isInt().withMessage("promotion: number"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('description').not().isEmpty().isLength({ min: 1, max: 200 }).withMessage('description:min lenght 1,max lenght 200'),
    ];
}
exports.updateServiceSalon = function () {
    return [
        body('name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('name:min lenght 1,max lenght 45'),
        param('idService').not().isEmpty().isInt().withMessage("idService:number"),
        body('price').not().isEmpty().isInt().withMessage("price : number"),
        body('service_time').not().isEmpty().isInt().withMessage("service_time: number"),
        body('promotion').not().isEmpty().withMessage("not empty").isInt().withMessage("promotion: number"),
        body('content').not().isEmpty().withMessage("content not empty").isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('description').not().isEmpty().withMessage("description not empty").isLength({ min: 1, max: 200 }).withMessage('description:min lenght 1,max lenght 200'),
    ];
}
exports.addCategoryService = function () {
    return [
        body('categoryId').not().isEmpty().isInt().withMessage("categoryId:number and not empty"),
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number and not empty"),
    ];
}
exports.addImageService = function () {
    return [
        body('image').not().isEmpty().isLength({ min: 1, max: 450 }).withMessage('image:min lenght 1,max lenght 450'),
        body('serviceId').not().isEmpty().isInt().withMessage("serviceId:number and not empty"),
    ];
}
exports.addFeedBackBySalon = function () {
    return [
        body('rate').not().isEmpty().isInt("rate : number"),

        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
    ];
}
exports.addFeedBackDetailBySalon = function () {
    return [

        body('content').not().isEmpty().withMessage("in put content").isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
        body('feedbackId').not().isEmpty().isInt().withMessage("feedbackId:number"),
    ];
}
exports.addStaff = function () {
    return [
        body('name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('name:min lenght 1,max lenght 45'),
        body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
        body('address').not().isEmpty().isLength({ min: 1, max: 450 }).withMessage('name:min lenght 1,max lenght 450'),
    ];
}
exports.validateStaff = function () {
    return [
        body('name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('name:min lenght 1,max lenght 45'),
        body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
        body('address').not().isEmpty().isLength({ min: 1, max: 450 }).withMessage('address:min lenght 1,max lenght 450'),
    ];
}
exports.updateStaff = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),
        body('name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('name:min lenght 1,max lenght 45'),
        body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone"),
    ];
}
exports.updateSalonOwnerProfile = function () {
    return [
        body('nameSalon').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('name salon:min lenght 1,max lenght 45'),
        body('phone').not().isEmpty().isMobilePhone('vi-VN').withMessage("validate phone vi-VN"),
        body('taxCode').not().isEmpty().withMessage("not empty").isLength({ min: 1, max: 45 }).withMessage('tax code:min lenght 1,max lenght 45'),
        body('timeOpen').exists()
        .not()
        .isEmpty().matches(regexHour).withMessage("timeOpen hour hh:mm"),
        body('timeClose').exists()
            .not()
            .isEmpty().matches(regexHour).withMessage("timeEnd: hour hh:mm"),
    ];
}
exports.deleteFeedbackDetailByFeedbackDetailIdBySalon = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),


    ];
}
exports.deleteFeedbackBySalon = function () {
    return [
        param('id').not().isEmpty().isInt().withMessage("id:number"),

    ];
}
exports.updateAddressSalon = function () {
    return [
        body('city').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('city:min lenght 1,max lenght 45'),
        body('district').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('district:min lenght 1,max lenght 45'),
        body('detailAddress').not().isEmpty().isLength({ min: 1, max: 450 }).withMessage('address:min lenght 1,max lenght 450'),
    ]
}
exports.cancelBookingBySalon = function () {
    return [
        body('registerServiceId').not().isEmpty().withMessage("in put registerServiceId"),
        body('content').not().isEmpty().isLength({ min: 1, max: 2000 }).withMessage('content:min lenght 1,max lenght 2000'),
    ]
}
exports.impossibleService = function () {
    return [
        body('serviceId').not().isEmpty().withMessage("serviceId not empty"),

    ]
}
exports.staffCanlederOrderandBusy = function () {
    return [
        body('day').not().isEmpty().isDate().withMessage("input day"),
        body('staffId').not().isEmpty().isInt().withMessage("staffId:int"),

    ]
}
exports.searchSalonByDistrict = function () {
    return [
        body('district').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('district:min lenght 1,max lenght 45'),

    ]
}