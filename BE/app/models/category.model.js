const db = require('../common/connect');

const Category = function (category) {
    this.categoryId = category.categoryId;
    this.name = category.name;
    
}

module.exports =Category;