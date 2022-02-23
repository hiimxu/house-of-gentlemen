const express = require('express');
var cors = require('cors');
app.use(cors());
const router = express.Router();
const salonOwnerController = require('../controllers/salon_owner.controller');
const imageSalonController = require('../controllers/imageSalon.controller');
const serviceController = require('../controllers/service.controller');
const categoryServiceController = require('../controllers/categoryService.controller');
const imageServiceController = require('../controllers/imageSerice.controller');
const feedbackController = require('../controllers/feedback.controller');
const feedbackDetailController = require('../controllers/feedbacDetail.controller');
const staffController = require('../controllers/staff.controller');

router.get('/',salonOwnerController.salonOwner);
router.get('/profile/:id',cors,salonOwnerController.getSalonOwnerProfile);
router.put('/update/profile/:id',salonOwnerController.updateSalonOwnerProfile);
router.get('/imageSalon/:idSalon',imageSalonController.getImageSalon);
router.post('/create/imageToImageSalon',imageSalonController.addImageToImageSalon);
router.delete('/delete/imageOfImageSalon/:id',imageSalonController.deleteImageOfImageSalon);
router.post('/create/service',serviceController.addServiceSalon);
router.delete('/delete/service/:idService',serviceController.deleteServiceSalon);
router.get('/Service/:idSalon',serviceController.getServiceOfSalon);
router.put('/update/Service/:idService',serviceController.updateServiceSalon);
router.post('/create/categoryService',categoryServiceController.addCategoryService);
router.delete('/delete/categoryService/:id',categoryServiceController.deleteCategoryService);
router.post('/create/imageService',imageServiceController.addImageService);
router.get('/imageService/:id',imageServiceController.getImageService);
router.delete('/delete/imageService/:id',imageServiceController.deleteImageService);
router.post('/createFeedBackBySalon',feedbackController.addFeedBackBySalon);
router.get('/getFeedbackOfSalon/:id',feedbackController.getFeedbackOfSalon);
router.delete('/delete/feedback/:id',feedbackController.deleteFeedback);
router.put('/update/feedback/:id',feedbackController.updateFeedback);
router.post('/create/feedBackDetailBySalon',feedbackDetailController.addFeedBackDetailBySalon);
router.get('/getFeedbackDetail/:feedBackId',feedbackDetailController.getFeedbackDetail);
router.delete('/delete/feedbackdetail/:id',feedbackDetailController.deleteFeedbackDetailByFeedbackDetailId);
router.put('/update/feedbackdetail/:id',feedbackDetailController.updateFeedbackDetail);
router.get('/staff/:id',staffController.getStaff);
router.post('/create/staff',staffController.addStaff);
router.put('/update/staff/:id',staffController.updateStaff);
router.delete('/delete/staff/:id',staffController.deleteStaff);
module.exports = router;