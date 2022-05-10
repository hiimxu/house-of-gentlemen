const express = require('express');
const router = express.Router();
const cors =require('cors');
const adminController =require('../controllers/admin.controller');
const accountController = require('../controllers/account.controller');
const salonOwnerController = require('../controllers/salonOwner.controller');
const serviceController = require('../controllers/service.controller');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');
const feedbackController = require('../controllers/feedback.controller');

router.get('/getSalonAccount',cors(),auth,accountController.getSalonAccount);
router.get('/getSalon/:id',validate.checkId(),cors(),salonOwnerController.getSalon);
router.put('/update/possibility/salon/',validate.setPossitiveSalonOwner(),auth,cors(),salonOwnerController.setPossitiveSalonOwner);
router.post('/getSalonActive',cors(),auth,accountController.getSalonActive);
router.post('/getSalonRequest',cors(),auth,accountController.getSalonRequest);
router.post('/getSalonDeactive',cors(),auth,accountController.getSalonDeactive);
router.put('/update/deactiveSalon/',validate.checkSalonId(),cors(),auth,cors(),salonOwnerController.setDeactiveSalon);
router.put('/update/activeSalon/',validate.checkSalonId(),cors(),auth,cors(),salonOwnerController.setActiveSalon);
router.put('/delete/accountSalon/',validate.checkSalonId(),cors(),auth,cors(),salonOwnerController.deleteSalon);
router.post('/get/serviceOfSalon',validate.getServiceOfSalonByAdmin(),cors(),auth,serviceController.getServiceOfSalonByAdmin);
router.post('/get/feedbackByStar',validate.getFeedbackByStarByAdmin(),cors(),auth,feedbackController.getFeedbackByStarByAdmin);
router.post('/get/voteOfSalon',validate.getVoteOfSalonByAdmin(),cors(),feedbackController.getVoteOfSalonByAdmin);


module.exports = router;