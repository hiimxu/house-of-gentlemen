const express = require('express');
const router = express.Router();
const cors =require('cors');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const accountController = require('../controllers/account.controller');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');
const multer = require('multer');
const ServiceController = require('../controllers/service.controller');
const maxSize = 2 * 1024 * 1024;
const util = require("util");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
var uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

var uploadFileMiddleware = util.promisify(uploadFile);

//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
// const upload = multer({ storage: storage,limits: { fileSize: maxSize } }).single("file");
// const uploadFileMiddleware = util.promisify(upload);

router.post('/uploadfile',async (req, res, next) => {
  
  try {
   await uploadFileMiddleware(req, res);
   console.log(req.body)
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
})

router.post('/login',validate.validateLogin(),cors(),accountController.login_account);
router.get('/detail/:id',param('id').not().isEmpty().isInt(),cors(),accountController.get_accountbyid);
router.post('/add/customer',validate.validateCreateAccountCustomer(),cors(),accountController.add_account_customer);
router.post('/add/salon',validate.validateCreateAccountSalon(),cors(),accountController.add_account_salon);
router.delete('/delete/:id',cors(),accountController.delete_accountbyid);
router.post('/changePassword',validate.change_password(),auth,cors(),accountController.change_password);
router.get('/',cors(),accountController.account);
router.put('/forgotPassword',validate.forgotPassword(),cors(),accountController.forgotPassword);
router.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
  
module.exports = router;