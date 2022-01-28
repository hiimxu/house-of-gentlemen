const express = require('express');
const app = express();


const port = 3000;
const route = require('../BE/app/routers')

var home_router= require('./app/routers/home_router');
var account_router= require('./app/routers/account_router');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);







app.listen(port, () => {
    console.log(`connect my sql http://localhost:${port}`);
  
  });