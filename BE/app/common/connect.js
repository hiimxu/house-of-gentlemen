const mysql = require('mysql');
const connection =  mysql.createConnection({
    host:'localhost',
    database:'swp490_g11',
<<<<<<< HEAD
    user:'root',
    password:'123456789',
=======
    user:'xu',
    password:'28111999'
>>>>>>> 0d5335105703eed7ab96af0a1dee3faed7e3a276
  });
  connection.connect(function (err) {
    if (err) {
      throw err
    }
    else{
      console.log('connected success!!!');
    }
    })
  module.exports = connection;