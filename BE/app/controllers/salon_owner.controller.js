var SalonOwner = require('../models/salonOwner.model');
var ImageSalon = require('../models/imageSalon.model');
var ServiceSalon = require('../models/service.model');
var CategoryService = require('../models/categoryService.model');
var ImageService = require('../models/imageService.model');
var FeedBack = require('../models/feedBack.model');
var FeedbackDetail = require('../models/feedback_detail.model');
const Feedback = require('../models/feedBack.model');

exports.salonOwner = function (req, res, next) {
    SalonOwner.getAll(function (data) {
        res.json({ result: data });
    });
}

exports.getSalonOwnerProfile = function (req, res, next) {
    var id = req.params.id;
    SalonOwner.getPrifileSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateSalonOwnerProfile= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    
    SalonOwner.updateProfileSalon(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}
exports.getImageSalon= function (req, res, next) {
    var id = req.params.idSalon;
    
    
    ImageSalon.getAllImage(id,function (data) {

        res.json({ result: data });
    });
}
exports.addImageToImageSalon = function (req, res, next) {
    // res.json("wellcome to  addImageToImageSalon");
    var dataImage= req.body;
    ImageSalon.addImageToImageSalon(dataImage,function (data) {

        res.json({ result: data });
    });
}
exports.deleteImageOfImageSalon =function (req, res, next) {
    var id= req.params.id;
    ImageSalon.deleteImageOfImageSalon(id,function (data) {

        res.json({ result: data });
    });
}

exports.addServiceSalon = function (req, res, next) {
   
    var dataService= req.body;
    console.log(dataService);
    ServiceSalon.addServiceSalon(dataService,function (data) {
        

        res.json({ result: data });
    });
}
// van chua xong delete service vi thieu register service
exports.deleteServiceSalon =function (req, res, next) {
    var id= req.params.idService;
    CategoryService.deleteCategoryServiceByServiceId(id,function (data) {
    });
    ImageService.deleteImageServiceByServiceId(id,function (data) {
    });
    ServiceSalon.deleteServiceSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.getServiceOfSalon = function (req, res, next) {
    var id = req.params.idSalon;
    ServiceSalon.getServiceOfSalon(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateServiceSalon= function (req, res, next) {
    var id = req.params.idService;
    var dataUpdate=req.body;
    
    ServiceSalon.updateServiceSalon(id,dataUpdate,function (data) {
        
        res.json({ result: data });
    });
}
exports.addCategoryService = function (req, res, next) {
   
    var dataCategoryService= req.body;
    CategoryService.addCategoryService(dataCategoryService,function (data) {
        

        res.json({ result: data });
    });
}
exports.deleteCategoryService =function (req, res, next) {
    var id= req.params.id;
    CategoryService.deleteCategoryService(id,function (data) {

        res.json({ result: data });
    });
}
exports.addImageService= function (req, res, next) {
    var dataImage= req.body;
    ImageService.addImageService(dataImage,function (data) {

        res.json({ result: data });
    });
}
exports.getImageService=function (req, res, next) {
    var id = req.params.id;
    ImageService.getAllImageServiceByServiceId(id,function (data) {

        res.json({ result: data });
    });
}
exports.deleteImageService=function (req, res, next) {
    var id= req.params.id;
    ImageService.deleteImageService(id,function (data) {

        res.json({ result: data });
    });
}
exports.addFeedBackBySalon=function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="salon";
    var dateCreate = new Date();
    dataFeedBack={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedBack.addFeedBackBySalon(dataFeedBack,function (data) {
         res.json({ result: data });
    });
}
exports.getFeedbackOfSalon = function (req, res, next) {
    var id = req.params.id;
    FeedBack.getFeedbackOfSalon(id,function (data) {

        res.json({ result: data });
    });
}

exports.deleteFeedback=function (req, res, next) {
    var id= req.params.id;
    // chu y phai xoa feedback_detail truoc
    FeedbackDetail.deleteFeedbackDetailByFeedbackId(id,function (data) {
        FeedBack.deleteFeedback(id,function (data) {

            res.json({ result: data });
        });
    });
    
}
exports.updateFeedback = function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    
    Feedback.updateFeedback(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}
exports.addFeedBackDetailBySalon = function (req, res, next) {
    var dataFeedBack= req.body;
    var wsend="salon";
    var dateCreate = new Date();
    dataFeedBackDetail={wsend:wsend,dateCreate:dateCreate,...dataFeedBack}
    // res.json(dataFeedBack);
    FeedbackDetail.addFeedBackDetailBySalon(dataFeedBackDetail,function (data) {
         res.json({ result: data });
    });
}
exports.getFeedbackDetail = function (req, res, next) {
    var id = req.params.feedBackId;
    FeedbackDetail.getFeedbackDetail(id,function (data) {

        res.json({ result: data });
    });
}
exports.deleteFeedbackDetailByFeedbackDetailId=function (req, res, next) {
    var id= req.params.id;
   
    FeedbackDetail.deleteFeedbackDetailByFeedbackDetailId(id,function (data) {

        res.json({ result: data });
    });
}
exports.updateFeedbackDetail= function (req, res, next) {
    var id = req.params.id;
    var dataUpdate=req.body;
    var dateUpdate=new Date();
    dataUpdate={dateUpdate:dateUpdate,...dataUpdate};
    
    FeedbackDetail.updateFeedbackDetail(id,dataUpdate,function (data) {

        res.json({ result: data });
    });
}