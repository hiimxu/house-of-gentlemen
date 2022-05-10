const express = require('express');
const router = express.Router();
const cors =require('cors');
const { param,body, validationResult } = require('express-validator');
const {check} = require('express-validator');
const accountController = require('../controllers/account.controller');
const validate = require('../common/valiator');
const auth = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //files khi upload xong sẽ nằm trong thư mục "uploads" này - các bạn có thể tự định nghĩa thư mục này
    cb(null, 'uploads') 
  },
  filename: function (req, file, cb) {
    // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) ;
    cb(null, filename + '-' + file.originalname )
    // if ((file.originalname).toLocaleLowerCase().includes('.png')) {
     
    // }else{
    //   cb(null,'a')
    // }
    
  }
})

//Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
const upload = multer({ storage: storage })

router.post('/uploadfile',upload.single('image'), (req, res, next) => {
  
  //nhận dữ liệu từ form
  const file = req.file;
  // Kiểm tra nếu không phải dạng file thì báo lỗi
  if (!file) {
      const error = new Error('Upload file again!')
      error.httpStatusCode = 400
      return next(error)
    }
    console.log(file.filename)
    console.log(req.body)
   console.log(`${req.file.filename}`)

  // file đã được lưu vào thư mục uploads
  // gọi tên file: req.file.filename và render ra màn hình
  res.json('ok');
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