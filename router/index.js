var express = require('express');
var mysql = require('mysql');
var router = express.Router();

require('dotenv').config();

mysql.createConnection({
    host:process.env.DB_HOST
})   //json의 형태로 괄호안에 알려줘야한다.  json형태는 중괄호    

router.get