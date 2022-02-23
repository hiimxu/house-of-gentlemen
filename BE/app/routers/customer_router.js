const express = require('express');
const router = express.Router();
const customerController =require('../controllers/customer.controller');
const statusRegisterServiceController = require('../controllers/statusRegisterService.controller')
const registerServiceController = require('../controllers/registerService.controller');
const feedbackController = require('../controllers/feedback.controller');
const feedbackDetailController = require('../controllers/feedbacDetail.controller');
const salonOwnerController = require('../controllers/salonOwner.controller');

router.get('/',customerController.getAllCustomer);
router.get('/profile/:id',customerController.getCustomerProfile);
router.put('/update/profile/:id',customerController.updateCustomerProfile);
router.get('/statusRegisterService',statusRegisterServiceController.getStatusRegisterService);
router.get('/statusRegisterServiceById/:id',statusRegisterServiceController.getStatusRegisterServiceById);
router.get('/registerService/:id',registerServiceController.getRegisterServiceById);
router.get('/registerServiceByCustomer/:id',registerServiceController.getRegisterServiceByCustomer);
router.post('/create/registerService',registerServiceController.addRegisterService);
router.post('/create/feedbackByCustomer',feedbackController.addFeedBackByCustomer);
router.post('/delete/feedback/:id',feedbackController.deleteFeedback);
router.put('/update/feedback/:id',feedbackController.updateFeedback);
router.post('/create/feedbackdetailbycustomer',feedbackDetailController.addFeedBackDetailByCustomer);
router.delete('/delete/feedbackdetail/:id',feedbackDetailController.deleteFeedbackDetailByFeedbackDetailId);
router.put('/update/feedbackDetail/:id',feedbackDetailController.updateFeedbackDetail);
router.get('/getFeedbackOfSalon/:id',feedbackController.getFeedbackOfSalon);
router.get('/getFeedbackDetail/:feedBackId',feedbackDetailController.getFeedbackDetail);
router.get('/get/AllSalon',salonOwnerController.getAllSalon);
module.exports = router;