const express = require('express');
const app = express();
require('dotenv').config();
console.log(process.env.TOKEN_KEY);
console.log(process.env.API_KEY);
const port = 8080;

const route = require('../BE/app/routers');
var account_router= require('./app/routers/account_router');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);
let po = process.env.PA;

app.listen(port, () => {
 
    console.log(`connect my sql http://localhost:${port}`);
  
  });