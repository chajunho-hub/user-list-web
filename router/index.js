var express = require('express');
var mysql = require('mysql');
var router = express.Router();

require('dotenv').config();

var db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_NAME
})   //json의 형태로 괄호안에 알려줘야한다.  json형태는 중괄호    

router.get('/topic/add', (req, res)=>{
    var sql = 'SELECT * FROM topic'     // topic테이블에 있는것 다 가져와라는 쿼리문
    db.query(sql, (err, result)=>{
        if(!err){
            console.log(result)
            res.render('add',{topics:result})   //add.ejs를 랜더(불러오는것)하는것
        } else {
            console.log(err)
        }

      console.log(result)

    })   //쿼리문이 날라가서 쿼리를 db에서 날린다음에 조회한 데이터를 갖고있다가 어디다가(콜백함수의 인자로) 살짝 넘겨준다. 받는것은 콜백함수로 받는다. 에러가나면 앞에인자값에(err) 넘겨주고, 안나면 뒤에넘긴다.

}) // 로컬호스트/topic/add 에 요청하면 들어온다.


router.post('/topic/add', (req,res)=>{//
    console.log(req.body);
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)'
    var params = [title, description, author]
    db.query(sql, params, (err, result)=>{
        if(!err){
            console.log("성공적으로 저장되었습니다.")
            res.redirect('/topic/add')

        } else {
            console.log(err)
        }
    } )
}) // topic에add로 들어오면 콜백함수의 행동을 취한다.

router.get('/topic/:id', (req,res)=>{   // :을 붙이면 params 로 인식?
    console.log(req.params.id);
    var id = req.params.id
    var sql = 'SELECT * FROM topic WHERE id=?';
    db.query(sql,[id], (err, result)=>{
        if(!err){

            res.render('test', {topics:result})

        } else {
            console.log(err)
        }
    })
})

module.exports = router;