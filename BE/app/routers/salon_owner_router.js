const express = require('express');
const router = express.Router();
const salonOwnerController = require('../controllers/salon_owner.controller');
router.get('/',salonOwnerController.salonOwner);
router.get('/profile/:id',salonOwnerController.getSalonOwnerProfile);
router.put('/update/profile/:id',salonOwnerController.updateSalonOwnerProfile);
router.get('/imageSalon/:idSalon',salonOwnerController.getImageSalon);
router.post('/addImageToImageSalon',salonOwnerController.addImageToImageSalon);
router.post('/createService',salonOwnerController.addServiceSalon);
router.delete('/deleteImageOfImageSalon/:id',salonOwnerController.deleteImageOfImageSalon);
router.delete('/deleteService/:idService',salonOwnerController.deleteServiceSalon);
router.get('/Service/:idSalon',salonOwnerController.getServiceOfSalon);
router.put('/update/Service/:idService',salonOwnerController.updateServiceSalon);
router.post('/createCategoryService',salonOwnerController.addCategoryService);
router.delete('/deleteCategoryService/:id',salonOwnerController.deleteCategoryService);
router.post('/addImageService',salonOwnerController.addImageService);
router.get('/imageService/:id',salonOwnerController.getImageService);
module.exports = router;