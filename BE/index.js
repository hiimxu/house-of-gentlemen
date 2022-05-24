const express = require('express');
const app = express();
// const formData = require('express-form-data');
const multer = require("multer");
const util = require("util");
const auth = require('../BE/app/middleware/auth');
const validate = require('../BE/app/common/valiator');
var ServiceSalon = require('../BE/app/models/service.model');
var ImageService = require('../BE/app/models/imageService.model');
const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
} = require("firebase/storage");
const storage = require("../BE/app/common/firebase");

// multer
const maxSize = 2 * 1024 * 1024;
const memoStorage = multer.memoryStorage();
const upload = multer({
    memoStorage, limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single("image");


var uploadFileMiddleware = util.promisify(upload);
const cookieParser = require('cookie-parser');
require('dotenv').config();
console.log(process.env.TOKEN_KEY);
console.log(process.env.API_KEY);
const port = 8080;
const cors = require('cors');
app.use(express.static('uploads')); 

app.use(cors());
app.options('*', cors());

const route = require('../BE/app/routers');
var account_router= require('./app/routers/account_router');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(formData.parse());
// add a picture
app.post("/api/salonowner/createServiceByFirebase",cors(),auth, async (req, res) => {
  try {
    var salonId = req.user.salonId;
    if (salonId == null) {
        return res.status(400).json({ message: "please login account salon" });
    }
      await uploadFileMiddleware(req, res);
      const file = req.file;
      const nameImage =salonId+'-'+ Date.now()+'-'+ file.originalname;
      const imageRef = ref(storage, nameImage);
      const metatype = { contentType: file.mimetype, name: file.originalname };
      await uploadBytes(imageRef, file.buffer, metatype)
          .then((snapshot) => {
              // res.send("uploaded!");
          })
          .catch((error) => console.log(error.message));
      const listRef = ref(storage);
      var image;
      await listAll(listRef)
          .then((pics) => {
              productPictures = pics.items.map((item) => {
                  if (item._location.path_==nameImage) {
                      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                      image=publicUrl;
                  return {
                      url: publicUrl,
                      // name: item._location.path_,
                  };
                  }
              });
              
          })
          .catch((error) => console.log(error.message));
          var dataService = {
            salonId: req.user.salonId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            content: req.body.content,
            promotion: req.body.promotion,
            service_time: req.body.service_time,
            possible: 1
        }
        if (parseInt(dataService.promotion) > 100 || parseInt(dataService.promotion) < 0) {
            return res.status(400).json({ message: "0<=promotion<=100" })
        }
       
        ServiceSalon.getAllServiceSalon(salonId, function (data) {
          if (data.length >= 30) {
              return res.status(400).json({ message: "salon của bạn có thể tạo tối đa 30 services", data: [] })
          }
          else {
              try {
                  ServiceSalon.addServiceSalon(dataService, function (data) {
                      // res.json({ data: data, message: "add service fail" });
                      if (data == null) {
                          res.status(400).json({ data: data, message: "add service fail" });
                      } else {
                          if (data.length == 0) {
                              res.status(400).json({ data: data, message: "add service failed" });
                          } else {
                              var dataImage = {
                                  serviceId: data.id,
                                  image: image
                              };
                              ImageService.addImageService(dataImage, function (data) {
  
                              })
                              data = { image: image, ...data };
                              res.json({ data: data, message: "add service success" });
                          }
                      }
                  });
              } catch (error) {
                  res.status(400).json({ data: error, message: "add service fail" });
              }
          }
  
      })

  } catch (error) {
      if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(500).json({
              message: "File size cannot be larger than 2MB!",
          });
      }

      res.status(500).json({
          message: `Could not upload the file: ${req.file}. ${error}`,
      });
  }

});


route(app);
let po = process.env.PA;

app.listen(port, () => {
 
    console.log(`connect my sql http://localhost:${port}`);
  
  });