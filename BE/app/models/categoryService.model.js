const db = require('../common/connect');

const CategoryService = function (categoryService) {
    this.serviceId = categoryService.serviceId;
    this.categoryId = categoryService.categoryId;
    
}

module.exports =CategoryService;