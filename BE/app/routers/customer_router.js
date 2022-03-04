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
const auth = require('../middleware/auth');

router.get('/',cors(),customerController.getAllCustomer);
router.get('/profile/:id',cors(),auth,customerController.getCustomerProfile);
router.put('/update/profile/:id',cors(),auth,customerController.updateCustomerProfile);
router.get('/statusRegisterService',cors(),statusRegisterServiceController.getStatusRegisterService);
router.get('/statusRegisterServiceById/:id',cors(),statusRegisterServiceController.getStatusRegisterServiceById);
router.put('/cancel/registerservice/:id',cors(),registerServiceController.cancelBooking);
router.get('/registerService/:id',cors(),registerServiceController.getRegisterServiceById);
router.get('/registerServiceByCustomer/:id',cors(),registerServiceController.getRegisterServiceByCustomer);
router.post('/create/registerService',cors(),registerServiceController.addRegisterService);
router.post('/create/feedbackByCustomer',cors(),feedbackController.addFeedBackByCustomer);
router.post('/delete/feedback/:id',cors(),feedbackController.deleteFeedback);
router.put('/update/feedback/:id',cors(),feedbackController.updateFeedback);
router.post('/create/feedbackdetailbycustomer',cors(),feedbackDetailController.addFeedBackDetailByCustomer);
router.delete('/delete/feedbackdetail/:id',cors(),feedbackDetailController.deleteFeedbackDetailByFeedbackDetailId);
router.put('/update/feedbackDetail/:id',cors(),feedbackDetailController.updateFeedbackDetail);
router.get('/getFeedbackOfSalon/:id',cors(),feedbackController.getFeedbackOfSalon);
router.get('/getFeedbackDetail/:feedBackId',cors(),feedbackDetailController.getFeedbackDetail);
router.get('/get/AllSalon',cors(),salonOwnerController.getAllSalon);
router.get('/get/AllService',cors(),serviceController.getAllService);
router.get('/get/serviceOfSalon/:idSalon',cors(),serviceController.getAllServiceSalon);
router.get('/get/staff/:id',cors(),staffController.getStaff)
module.exports = router;