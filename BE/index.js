const express = require('express');
const app = express();

// const morgan = require('morgan');
// const mysql = require('mysql2');
const port = 3000;
// const connection =  mysql.createConnection({
//   host:'localhost',
//   database:'swp490_g11',
//   user:'root',
//   password:'123456789'
// });
// connection.connect(function (err) {
//   if (err) {
//     throw err
//   }
//   else{
//     console.log('connected success!!!')
//   }
  
// })
// app.get("/",(req,res,next)=>{
    
//   connection.query("SELECT * FROM swp490_g11.Account",(err,rows,fields)=>{
//       console.log("I think we fetchd account successfully");
//       res.json(rows)
//   })
//   // res.send('hello')
// })

var home_router= require('./app/routers/home_router');
var account_router= require('./app/routers/account_router');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',home_router);
app.use('/',account_router);


app.get("/",(req,res,next)=>{
    
    connection.query("SELECT * FROM swp490_g11.Account",(err,rows,fields)=>{
        console.log("I think we fetchd account successfully");
        res.json(rows)
    })
    // res.send('hello')
})





app.listen(port, () => {
    console.log(`connect my sql http://localhost:${port}`);
    // connection.connect(function (err) {
    //   if (err) {
    //     throw err
    //   }
    //   else{
    //     console.log('connected success!!!')
    //   }
      
    // })
    // console.log(connection)
  });