const express = require('express');
const cors =require('cors');
const router = express.Router();
const customerController =require('../controllers/customer.controller');
const statusRegisterServiceController = require('../controllers/statusRegisterService.controller')
const registerServiceController = require('../controllers/registerService.controller');
const feedbackController = require('../controllers/feedback.controller');
const feedbackDetailController = require('../controllers/feedbacDetail.controller');
const salonOwnerController = require('../controllers/salonOwner.controller');
const serviceController = require('../controllers/service.controller');
const staffController = require('../controllers/staff.controller');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');

router.get('/',cors(),customerController.getAllCustomer);
router.get('/profile/:id',validate.checkId(),cors(),auth,customerController.getCustomerProfile);
router.put('/update/profile/:id',validate.updateCustomerProfile(),cors(),auth,customerController.updateCustomerProfile);
router.get('/statusRegisterService',cors(),statusRegisterServiceController.getStatusRegisterService);
router.get('/statusRegisterServiceById/:id',validate.checkId(),cors(),statusRegisterServiceController.getStatusRegisterServiceById);
router.put('/cancel/registerservice/:id',validate.cancelBooking(),cors(),registerServiceController.cancelBooking);
router.get('/registerService/:id',validate.checkId(),cors(),registerServiceController.getRegisterServiceById);
router.get('/registerServiceByCustomer/:id',validate.checkId(),cors(),registerServiceController.getRegisterServiceByCustomer);
router.post('/create/registerService',cors(),validate.BookingService(),registerServiceController.addRegisterService);
router.post('/create/feedbackByCustomer',validate.addFeedBackByCustomer(),cors(),feedbackController.addFeedBackByCustomer);
router.post('/delete/feedback/:id',validate.checkId(),cors(),feedbackController.deleteFeedback);
router.put('/update/feedback/:id',validate.updateFeedback(),cors(),feedbackController.updateFeedback);
router.post('/create/feedbackdetailbycustomer',validate.addFeedBackDetailByCustomer(),cors(),feedbackDetailController.addFeedBackDetailByCustomer);
router.delete('/delete/feedbackdetail/:id',validate.checkId(),cors(),feedbackDetailController.deleteFeedbackDetailByFeedbackDetailId);
router.put('/update/feedbackDetail/:id',validate.updateFeedbackDetail(),cors(),feedbackDetailController.updateFeedbackDetail);
router.get('/getFeedbackOfSalon/:id',validate.checkId(),cors(),feedbackController.getFeedbackOfSalon);
router.get('/getFeedbackDetail/:feedBackId',param('feedBackId').not().isEmpty().isInt().withMessage("is number and not empty"),cors(),feedbackDetailController.getFeedbackDetail);
router.get('/get/AllSalon',cors(),salonOwnerController.getAllSalon);
router.get('/get/AllService',cors(),serviceController.getAllService);
router.get('/get/serviceOfSalon/:idSalon',param('idSalon').not().isEmpty().isInt().withMessage("is number and not empty"),cors(),serviceController.getAllServiceSalon);
router.get('/get/staff/:id',validate.checkId(),cors(),staffController.getStaff)
module.exports = router;