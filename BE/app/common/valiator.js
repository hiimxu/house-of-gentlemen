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
        body('phone').isMobilePhone("vi-VN")

    ];
}
exports.validateLogin = function () {
    return [
        body('account').not().isEmpty().withMessage('account_name cannot be empty'),
        body('password').not().isEmpty().withMessage('password cannot be empty'),
    ];
}


