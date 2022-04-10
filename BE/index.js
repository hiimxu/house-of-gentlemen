const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
console.log(process.env.TOKEN_KEY);
console.log(process.env.API_KEY);
const port = 8080;
const cors = require('cors');
app.use(cors());
app.options('*', cors());

const route = require('../BE/app/routers');
var account_router= require('./app/routers/account_router');
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);
let po = process.env.PA;

app.listen(port, () => {
 
    console.log(`connect my sql http://localhost:${port}`);
  
  });