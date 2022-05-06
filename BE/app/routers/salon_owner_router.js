const express = require('express');
const cors =require('cors');
const router = express.Router();
const salonOwnerController = require('../controllers/salonOwner.controller');
const imageSalonController = require('../controllers/imageSalon.controller');
const serviceController = require('../controllers/service.controller');
const categoryServiceController = require('../controllers/categoryService.controller');
const imageServiceController = require('../controllers/imageSerice.controller');
const feedbackController = require('../controllers/feedback.controller');
const feedbackDetailController = require('../controllers/feedbacDetail.controller');
const staffController = require('../controllers/staff.controller');
const statusRegisterServiceController = require('../controllers/statusRegisterService.controller');
const categoryController = require('../controllers/category.controller');
const statusStaffController = require('../controllers/statusStaff.controller');
const addressSalonController=require('../controllers/address.controller');
const registerServiceController = require('../controllers/registerService.controller');
const staffCanledarController = require('../controllers/staffCanledar.controller');
const galleryController = require('../controllers/gallery.controller');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');
const { impossibleStaff } = require('../models/satff.model');


router.get('/',cors(),salonOwnerController.salonOwner);
router.get('/profile/',cors(),auth,salonOwnerController.getSalonOwnerProfile);
router.put('/update/profile/',validate.updateSalonOwnerProfile(),cors(),auth,salonOwnerController.updateSalonOwnerProfile);
router.get('/imageSalon/',auth,cors(),imageSalonController.getImageSalon);
router.post('/create/imageToImageSalon',validate.addImageToImageSalon(),cors(),auth,imageSalonController.addImageToImageSalon);
router.delete('/delete/imageOfImageSalon/:id',validate.checkId(),cors(),auth,imageSalonController.deleteImageOfImageSalon);
router.post('/create/service',validate.addServiceSalon(),cors(),auth,serviceController.addServiceSalon);
router.delete('/delete/service/:idService',cors(),auth,serviceController.deleteServiceSalon);// khong lam delete service
router.get('/get/Service/',auth,cors(),serviceController.getServiceOfSalon);
router.put('/update/Service/:idService',validate.updateServiceSalon(),cors(),auth,serviceController.updateServiceSalon);
router.post('/create/categoryService',validate.addCategoryService(),cors(),auth,categoryServiceController.addCategoryService);
router.get('/get/categoryService/:idService',param('idService').isInt().withMessage("idService : number"),cors(),categoryServiceController.getCategoryServiceOfService);
router.delete('/delete/categoryService/:id',validate.checkId(),cors(),auth,categoryServiceController.deleteCategoryService);
router.post('/create/imageService',validate.addImageService(),cors(),auth,imageServiceController.addImageService);
router.get('/imageService/:id',validate.checkId(),cors(),imageServiceController.getImageService);
router.delete('/delete/imageService/:id',validate.checkId(),cors(),auth,imageServiceController.deleteImageService);
router.post('/createFeedBackBySalon',validate.addFeedBackBySalon(),auth,cors(),feedbackController.addFeedBackBySalon);
router.get('/getFeedbackOfSalon/',cors(),auth,feedbackController.getFeedbackOfSalon);
router.delete('/delete/feedback/:id',validate.deleteFeedbackBySalon(),auth,cors(),feedbackController.deleteFeedbackBySalon);
router.put('/update/feedback/:id',validate.updateFeedback(),cors(),auth,feedbackController.updateFeedbackBySalon);
router.post('/create/feedBackDetailBySalon',validate.addFeedBackDetailBySalon(),auth,cors(),feedbackDetailController.addFeedBackDetailBySalon);
router.get('/getFeedbackDetail/:feedBackId',param('feedBackId').not().isEmpty().isInt().withMessage("is number"),cors(),feedbackDetailController.getFeedbackDetail);
router.delete('/delete/feedbackdetail/:id',validate.deleteFeedbackDetailByFeedbackDetailIdBySalon(),cors(),auth,feedbackDetailController.deleteFeedbackDetailByFeedbackDetailIdBySalon);
router.put('/update/feedbackdetail/:id',validate.updateFeedbackDetailBySalon(),cors(),auth,feedbackDetailController.updateFeedbackDetailBySalon);
router.get('/staff/',cors(),auth,staffController.getStaff);
router.post('/create/staff',validate.validateStaff(),auth,cors(),staffController.addStaff);
router.put('/update/staff/:id',validate.updateStaff(),auth,cors(),staffController.updateStaff);
router.delete('/delete/staff/:id',validate.checkId(),auth,cors(),staffController.deleteStaff);
router.get('/statusRegisterServiceById/:id',validate.checkId(),cors(),statusRegisterServiceController.getStatusRegisterServiceById);
router.get('/statusRegisterService',cors(),statusRegisterServiceController.getStatusRegisterService);
router.get('/get/allCategory',cors(),categoryController.getAllCategory);
router.get('/get/categoryByCategoryId/:id',validate.checkId(),cors(),categoryController.getCategoryByIdCategory);
router.get('/get/allStaffStatus',cors(),statusStaffController.getAllStaffStatus);
router.get('/get/staffStatusById/:id',cors(),statusStaffController.getStaffStatusByIdstatusStaff);
router.put('/update/address/',validate.updateAddressSalon(),cors(),auth,addressSalonController.updateAddressSalon);
router.get('/get/bookingServiceOfSalon',cors(),auth,registerServiceController.getRegisterServiceOfSalon);
router.put('/cancelBookingServiceBySalon',validate.cancelBookingBySalon(),cors(),auth,registerServiceController.cancelBookingBySalon);
router.put('/update/impossibleService',validate.impossibleService(),cors(),auth,serviceController.impossibleService);
router.get('/get/impossibleService',cors(),auth,serviceController.getImpossibleService);
router.post('/staffCanledar',validate.staffCanlederOrderandBusy(),cors(),staffCanledarController.staffCanlederOrderandBusy);
router.post('/bookingService',validate.bookingServiceForCustomer(),cors(),auth,registerServiceController.bookingServiceForCustomer);
router.post('/current',validate.current(),cors(),auth,registerServiceController.current);
router.post('/ordersHistory',validate.ordersHistory(),cors(),auth,registerServiceController.ordersHistory);
router.put('/update/finshBooking',validate.finshBooking(),cors(),auth,registerServiceController.finshBooking);
router.put('/impossible/staff/',validate.impossibleStaff(),cors(),auth,staffController.impossibleStaff);
router.put('/possible/staff/',validate.possibleStaff(),cors(),auth,staffController.possibleStaff);
router.get('/get/allStaff',cors(),auth,staffController.getAllStaff);
router.post('/get/feedbackByStar',validate.getVoteByStar(),cors(),auth,feedbackController.getFeedbackByStar);
router.get('/get/voteOfSalon',cors(),auth,feedbackController.getVoteOfSalon);
router.put('/update/salonInformationForCustomer/',validate.salonInformationForCustomer(),cors(),auth,salonOwnerController.salonInformationForCustomer);
router.put('/update/salonBusinessInformation/',validate.salonBusinessInformation(),cors(),auth,salonOwnerController.salonBusinessInformation);
router.get('/get/gallery',cors(),auth,galleryController.getGalleryBySalon);
router.post('/add/gallery',cors(),auth,galleryController.addGalleryBySalon);
router.delete('/delete/gallery',validate.deleteImageOfGallery(),cors(),auth,galleryController.deleteImageOfGallery);
module.exports = router;