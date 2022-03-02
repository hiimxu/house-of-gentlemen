const db = require('../common/connect');

const CategoryService = function (categoryService) {
    this.serviceId = categoryService.serviceId;
    this.categoryId = categoryService.categoryId;
    this.category_serviceId=categoryService.category_serviceId;
    
}
CategoryService.addCategoryService = function(dataCategoryService,result){
    console.log(dataCategoryService)
    db.query(`INSERT INTO category_service SET?`, dataCategoryService, (err, rows, res) => {
        if (err) {
            result(null,err)
        } else {
            result({id : rows.insertId,...dataCategoryService});
        }
    });
    
}
CategoryService.deleteCategoryService = function(id,result){
    db.query(`delete from category_service where category_serviceId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });

}
CategoryService.deleteCategoryServiceByServiceId = function(id,result){
    db.query(`delete from category_service where serviceId = ${id}`, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result("xoa category_service co serviceId =" + id + " thanh cong");
        }
    });

}
CategoryService.checkCategoryService= function(dataCategoryService,result){
    db.query(`select* from category_service where serviceId='${dataCategoryService.serviceId}'and categoryId='${dataCategoryService.categoryId}' `, (err, rows, fields) => {
        if (err) {
            result(null, err)
        } else {
            result(rows);
        }
    });

}
CategoryService.getCategoryServiceByService= function(id,result){
    db.query(`select* from category_service where serviceId='${id}'`, (err, rows, fields) => {
        if (err) {
            result(err)
        } else {
            result(rows);
        }
    });

}

module.exports =CategoryService;