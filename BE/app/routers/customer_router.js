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
const imageServiceController=require('../controllers/imageSerice.controller');
const {check} = require('express-validator');
const validate = require('../common/valiator');
const imageSalonController= require('../controllers/imageSalon.controller');
const categoryServiceController= require('../controllers/categoryService.controller');
const categoryController=require('../controllers/category.controller');
const auth = require('../middleware/auth');
const statusStaffController= require('../controllers/statusStaff.controller')
const addressController=require('../controllers/address.controller');
const StaffCanlederController=require('../controllers/staffCanledar.controller');

router.get('/',cors(),customerController.getAllCustomer);
router.get('/profile/',cors(),auth,customerController.getCustomerProfile);
router.put('/update/profile/',validate.updateCustomerProfile(),cors(),auth,customerController.updateCustomerProfile);
router.get('/statusRegisterService',cors(),statusRegisterServiceController.getStatusRegisterService);
router.get('/statusRegisterServiceById/:id',validate.checkId(),cors(),statusRegisterServiceController.getStatusRegisterServiceById);
router.put('/cancel/registerservice',validate.cancelBooking(),cors(),auth,registerServiceController.cancelBooking);
router.get('/registerService/:id',validate.checkId(),auth,cors(),registerServiceController.getRegisterServiceById);
router.get('/registerServiceByCustomer/',auth,cors(),registerServiceController.getRegisterServiceByCustomer);
router.post('/create/registerService',cors(),validate.BookingService(),auth,registerServiceController.addRegisterService);
router.post('/create/feedbackByCustomer',validate.addFeedBackByCustomer(),cors(),auth,feedbackController.addFeedBackByCustomer);
router.delete('/delete/feedback/:id',validate.checkId(),cors(),auth,feedbackController.deleteFeedbackByCustomer);
router.put('/update/feedback/:id',validate.updateFeedbackByCustomer(),cors(),auth,feedbackController.updateFeedbackByCustomer);
router.post('/create/feedbackdetailbycustomer',validate.addFeedBackDetailByCustomer(),cors(),auth,feedbackDetailController.addFeedBackDetailByCustomer);
router.delete('/delete/feedbackdetail/:id',validate.checkId(),cors(),auth,feedbackDetailController.deleteFeedbackDetailByFeedbackDetailId);
router.put('/update/feedbackDetail/:id',validate.updateFeedbackDetail(),cors(),auth,feedbackDetailController.updateFeedbackDetailByCustomer);
router.get('/getFeedbackOfSalon/:id',validate.checkId(),cors(),feedbackController.getFeedbackOfSalonByCustomer);
router.get('/getFeedbackDetail/:feedBackId',param('feedBackId').not().isEmpty().isInt().withMessage("is number and not empty"),cors(),feedbackDetailController.getFeedbackDetail);
router.get('/get/AllSalon',cors(),salonOwnerController.getAllSalon);
router.get('/get/AllServicePossible',cors(),serviceController.getAllServicePossible);
router.get('/get/serviceOfSalon/:idSalon',param('idSalon').not().isEmpty().isInt().withMessage("is number and not empty"),cors(),serviceController.getAllServiceSalon);
router.get('/get/staff/:id',validate.checkId(),cors(),staffController.getStaffByCustomer)
router.get('/imageService/:id',validate.checkId(),cors(),imageServiceController.getImageService);
router.get('/imageSalon/:idSalon',param('idSalon').isInt().withMessage("idSalon : number"),cors(),imageSalonController.getImageSalonByCustomer);
router.get('/Service/:idSalon',param('idSalon').isInt().withMessage("idSalon : number"),cors(),serviceController.getServiceOfSalonByCustomer);
router.get('/get/categoryService/:idService',param('idService').isInt().withMessage("idService : number"),cors(),categoryServiceController.getCategoryServiceOfService);
router.get('/get/service/:id',validate.checkId(),cors(),serviceController.getServiceByIdService);
router.get('/get/allCategory',cors(),categoryController.getAllCategory);
router.get('/get/categoryByCategoryId/:id',validate.checkId(),cors(),categoryController.getCategoryByIdCategory);
router.get('/get/allStaffStatus',cors(),statusStaffController.getAllStaffStatus);
router.get('/get/staffStatusById/:id',validate.checkId(),cors(),statusStaffController.getStaffStatusByIdstatusStaff);
router.get('/get/addressSalon/:id',cors(),validate.checkId(),addressController.getAddressOfSalon);
router.post('/searchSalonByDistrict',cors(),validate.searchSalonByDistrict(),addressController.searchSalonByDistrict);
router.post('/staffCanledar',validate.staffCanlederOrderandBusy(),cors(),StaffCanlederController.staffCanlederOrderandBusy);
router.get('/get/favoriteService',auth,cors(),registerServiceController.favorviteService);
router.get('/get/historyBooking',auth,cors(),registerServiceController.historyBooking);
router.get('/get/reservation',auth,cors(),registerServiceController.reservation);
router.post('/searchsalon',validate.searchSalonByName(),cors(),salonOwnerController.searchSalon);
router.get('/get/check/',cors(),registerServiceController.check);
router.post('/get/feedbackByStar',validate.getFeedbackByStarByCustomer(),cors(),auth,feedbackController.getFeedbackByStarByCustomer);
router.post('/get/voteOfSalon',validate.getVoteOfSalonByCustomer(),cors(),auth,feedbackController.getVoteOfSalonByCustomer);
module.exports = router;