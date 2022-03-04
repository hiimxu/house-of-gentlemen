const { body, validationResult } = require('express-validator');
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

