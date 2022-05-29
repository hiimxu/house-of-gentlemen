const express = require('express');
const app = express();
// const formData = require('express-form-data');
const multer = require("multer");
const util = require("util");
const auth = require('../BE/app/middleware/auth');
const validate = require('../BE/app/common/valiator');
var ServiceSalon = require('../BE/app/models/service.model');
var ImageService = require('../BE/app/models/imageService.model');
var Account = require('../BE/app/models/account.model');
var SalonOwner = require('../BE/app/models/salonOwner.model');
var ImageSalon = require('../BE/app/models/imageSalon.model')
var Address =  require('../BE/app/models/address.model');
var md5 = require('md5');
const { body, validationResult } = require('express-validator');
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
var account_router = require('./app/routers/account_router');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(formData.parse());
// add a picture
app.post("/api/salonowner/createServiceByFirebase", cors(), auth, async (req, res) => {
    try {
        var salonId = req.user.salonId;
        if (salonId == null) {
            return res.status(400).json({ message: "please login account salon" });
        }
        await uploadFileMiddleware(req, res);
        const file = req.file;
        const nameImage = salonId + '-' + Date.now() + '-' + file.originalname;
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
                    if (item._location.path_ == nameImage) {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                        image = publicUrl;
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
            return res.status(400).json({ message: "kiểm tra lại thông tin khuyến mãi" })
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
                            res.status(400).json({ data: data, message: "tạo dịch vụ thất bại" });
                        } else {
                            if (data.length == 0) {
                                res.status(400).json({ data: data, message: "tạo dịch vụ thất bại" });
                            } else {
                                var dataImage = {
                                    serviceId: data.id,
                                    image: image,
                                };
                                ImageService.addImageService(dataImage, function (data) {

                                })
                                data = { image: image, ...data };
                                res.json({ data: data, message: "tạo dịch vụ thành công" });
                            }
                        }
                    });
                } catch (error) {
                    res.status(400).json({ data: error, message: "tạo dịch vụ thất bại" });
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
app.put("/api/salonowner/editServiceByFirebase/:idService", cors(), auth, async (req, res) => {
    try {
        var salonId = req.user.salonId;
        if (salonId == null) {
            return res.status(400).json({ message: "please login account salon" });
        }
        await uploadFileMiddleware(req, res);
        const file = req.file;
        const nameImage = salonId + '-' + Date.now() + '-' + file.originalname;
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
                    if (item._location.path_ == nameImage) {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                        image = publicUrl;
                        return {
                            url: publicUrl,
                            // name: item._location.path_,
                        };
                    }
                });

            })
            .catch((error) => console.log(error.message));
        var id = req.params.idService;

        var dataUpdate = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            content: req.body.content,
            promotion: req.body.promotion,    // mac dinh de = 0
            service_time: req.body.service_time,

        };

        var dataOk = { id, image, ...dataUpdate }
        if (parseInt(dataUpdate.promotion) > 100 || parseInt(dataUpdate.promotion) < 0) {
            return res.status(400).json({ message: "kiểm tra lại thông tin khuyến mãi" })
        }

        ServiceSalon.checkPermission(id, salonId, function (data) {
            if (data.length == 0) {
                return res.status(400).json({ data: data, message: "you not have access" });
            } else {
                try {
                    ImageService.updateImage(id, image, function (data) {
                        ServiceSalon.updateServiceSalon(id, dataUpdate, function (data) {

                            if (data == null || data.affectedRows == 0) {
                                res.status(400).json({ message: "cập nhập dịch vụ thất bại" });
                            } else {

                                res.json({ data: dataOk, message: "cập nhập dịch vụ thành công" });
                            }
                        });

                    })

                } catch (error) {
                    res.status(400).json({ data: error, message: "cập nhập dịch vụ thất bại" });
                }
            }
        });




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

app.post("/api/account/register/salon", cors(), async (req, res) => {
    try {

        await uploadFileMiddleware(req, res);
        const file = req.file;
        const nameImage = 'account' + Math.random(10) + '-' + Date.now() + '-' + file.originalname;
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
                    if (item._location.path_ == nameImage) {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                        image = publicUrl;
                        return {
                            url: publicUrl,
                            // name: item._location.path_,
                        };
                    }
                });

            })
            .catch((error) => console.log(error.message));

        var acc = req.body.account_name;
        var pass = req.body.password;
        var rol = req.body.role;
        var email = req.body.email;
        var possibility = 0;
        var dataAddress = {
            city: req.body.city,
            district: req.body.district,
            detailAddress: req.body.detailAddress
        }
        var checkTimeOpen = new Date("01-01-2017 " + req.body.timeOpen + ":00");
        var checkTimeClose = new Date("01-01-2017 " + req.body.timeClose + ":00");
        if (checkTimeOpen.getHours() > checkTimeClose.getHours() || (checkTimeOpen.getHours() == checkTimeClose.getHours() && checkTimeOpen.getMinutes() > checkTimeClose.getMinutes())) {
            return res.status(400).json({ message: "kiểm tra thời gian mở cửa và thời gian đóng cửa" });
        }
        var dtime = checkTimeClose - checkTimeOpen;
        var totalSlot = dtime / (60000 * 15);



        var md5_pass = md5(pass);
        var save_data = { account_name: acc, password: md5_pass, role: rol, email: email }
        try {
            var check = Account.checkAccount(acc, function (data) {
                if (data.length == 1) {
                    res.status(400).json({  message: "Tài khoản đã tồn tại" });
                }
                else {
                    if (rol == 'salon') {
                        data = Account.createAccount(save_data, function (data_account) {
                            var nameSalon = req.body.nameSalon;
                            var phone = req.body.phone;
                            var taxCode = req.body.taxCode;
                            var timeOpen = req.body.timeOpen;
                            var timeClose = req.body.timeClose;
                            var description = req.body.description;
                            var requestDate = new Date();
                            var save_salonOwner = { accountId: data_account.accountId, nameSalon: nameSalon, phone: phone, possibility: possibility, taxCode: taxCode, timeOpen: timeOpen, timeClose: timeClose, totalSlot: totalSlot, description: description, nameOwner: req.body.nameOwner, requestDate: requestDate };
                            data = SalonOwner.createSalonOwner(save_salonOwner, function (data) {
                                var dataSalon = data;
                                if (data == null) {
                                    res.status(400).json({ data: data, message: "Create account salon failed" });
                                } else {
                                    var dataImage = { image: image, salonId: dataSalon.id }
                                    ImageSalon.addImageToImageSalon(dataImage, function (data) {
    
                                    })
                                    dataSalon = { image: image, ...dataSalon }
    
    
                                    dataAddress = { salonId: dataSalon.id, ...dataAddress }
                                    Address.addAddress(dataAddress, function (data) {
                                        if (data == null) {
                                            return res.status(400).json({ message: "mysql error" })
                                        } else {
                                            res.json({ data_account: data_account, dataSalon: dataSalon, dataAddress: data, message: "Đăng kí thành công" });
                                        }
                                    })
    
                                }
                            });
                        });
                    } else {
                        res.status(400).json({ message: "Đăng kí thất bại" })
                    }
                }
            });
        } catch (error) {
            res.status(400).json({ data: error, message: "Đăng kí thất bại" });
        }








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

app.put("/api/salonowner/update/salonBusinessInformationByFireBase/", cors(), auth, async (req, res) => {
    try {
        var salonId = req.user.salonId;
        if (salonId == null) {
            return res.status(400).json({ message: "please login account salon" });
        }
        await uploadFileMiddleware(req, res);
        const file = req.file;
        const nameImage = salonId + '-' + Date.now() + '-' + file.originalname;
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
                    if (item._location.path_ == nameImage) {
                        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                        image = publicUrl;
                        return {
                            url: publicUrl,
                            // name: item._location.path_,
                        };
                    }
                });

            })
            .catch((error) => console.log(error.message));
            var checkTimeOpen = new Date("01-01-2017 " + req.body.timeOpen + ":00");
            var checkTimeClose = new Date("01-01-2017 " + req.body.timeClose + ":00");
            if (checkTimeOpen.getHours() > checkTimeClose.getHours() || (checkTimeOpen.getHours() == checkTimeClose.getHours() && checkTimeOpen.getMinutes() > checkTimeClose.getMinutes())) {
                return res.status(400).json({ message: "time open <time close" });
            }
            var accountId = req.user.account_id;
            var dataUpdate = {
                nameSalon: req.body.nameSalon,
                phone: req.body.phone,
                taxCode: req.body.taxCode,
                timeOpen: req.body.timeOpen,
                timeClose: req.body.timeClose,
                nameOwner: req.body.nameOwner,
            };
            var addressUpdate = {
                city: req.body.city,
                district: req.body.district,
                detailAddress: req.body.detailAddress,
            }
           
            var email = req.body.email;
            var dataOk = { ...dataUpdate, ...addressUpdate, image, email }

            Account.updateEmail(accountId, email, function (data) {
                Address.updateAddressSalon(salonId, addressUpdate, function (data) {
                    ImageSalon.updateImage(salonId, image, function (data) {
        
                        SalonOwner.updateProfileSalon(salonId, dataUpdate, function (data) {
        
                            if (data == null) {
                                res.status(400).json({ data: data, message: "update salon 's profile failed" });
                            }
                            else {
                                if (data.affectedRows == 0) {
                                    res.status(200).json({ data: data, message: "not have salon 's profile to update" });
                                } else {
                                    res.json({ data: dataOk, message: "update salon 's profile success" });
                                }
                            }
                        });
        
                    })
        
                })
        
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