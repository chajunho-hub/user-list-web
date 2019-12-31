var express = require('express');
var app = express();
var path = require('path');
var dot = require('dotenv');
dot.config()
var bodyParser = require('body-parser')

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended:false}));


var port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`서버가 시작되었습니다. http://localhost:${port}`)
})

