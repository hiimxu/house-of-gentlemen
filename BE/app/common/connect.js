const mysql = require('mysql');
const connection =  mysql.createConnection({
    host:'localhost',
    database:'swp490_g11',
    user:'xu',
    password:'28111999'
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