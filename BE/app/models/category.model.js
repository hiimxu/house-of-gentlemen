const db = require('../common/connect');

const Category = function (category) {
    this.categoryId = category.categoryId;
    this.name = category.name;
    
}
Category.getAllCategory=function(result){
    db.query(`SELECT * FROM swp490_g11.category`, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}
Category.getCategoryByIdCategory=function(id,result){
    db.query(`SELECT * FROM swp490_g11.category where categoryId=? `,id, (err, rows, fields) => {
        if (err) {
            result(null,err);
        } else {
            data = rows;
            result(data);
        }
    });
}

module.exports =Category;