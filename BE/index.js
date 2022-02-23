const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());


const port = 3000;
const route = require('../BE/app/routers');
var account_router= require('./app/routers/account_router');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);

app.listen(port, () => {
    console.log(`connect my sql http://localhost:${port}`);
  
  });