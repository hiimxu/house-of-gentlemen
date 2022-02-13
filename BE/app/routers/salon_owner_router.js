const express = require('express');
const router = express.Router();
const salonOwnerController = require('../controllers/salon_owner.controller');
router.get('/',salonOwnerController.salonOwner);
router.get('/profile/:id',salonOwnerController.getSalonOwnerProfile);
router.put('/update/profile/:id',salonOwnerController.updateSalonOwnerProfile);
router.get('/imageSalon/:idSalon',salonOwnerController.getImageSalon);
router.post('/addImageToImageSalon',salonOwnerController.addImageToImageSalon);
router.delete('/deleteImageOfImageSalon/:id',salonOwnerController.deleteImageOfImageSalon);
module.exports = router;