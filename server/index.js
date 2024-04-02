//express server middleware
const express = require('express')
const app  = express()
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require("cors");

// heroku mySQL server config 
const db = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    user:'bff9f5bbfd102a',
    database:'heroku_dbb23f8da62c147',
    password:'f6dba97c',
})

//to use axios api 
app.use(cors());
app.use(bodyParser.urlencoded({entended:true}));

//to get request from client side
app.get('/api/get/:sortBy', (req,res) => {
    var sqlSelect = "";
    var sortOption = req.params.sortBy.split(',')[0];
    var ageOption = req.params.sortBy.split(',')[1];

    if (ageOption!=undefined){
        var ageOption1 = req.params.sortBy.split(',')[1].split('-')[0];
        var ageOption2 = req.params.sortBy.split(',')[1].split('-')[1];
    }

    // to group by age 
    if(ageOption !='' && ageOption!=undefined){
        sqlSelect = `SELECT users.username, users.age, users.userid, pace.distance, pace.total_time, (pace.total_time / (pace.distance/1000)) as 'avg_pace' FROM users INNER JOIN pace ON users.userid=pace.userid where (users.age >= ${ageOption1} && users.age <= ${ageOption2} )   order by ${sortOption} DESC` ;
    }else{
        sqlSelect = `SELECT users.username, users.age, users.userid, pace.distance, pace.total_time, (pace.total_time / (pace.distance/1000)) as 'avg_pace' FROM users INNER JOIN pace ON users.userid=pace.userid order by ${sortOption} DESC` ;
    }
    
    //to send result from mySQL server 
    db.query(sqlSelect,(err,result) =>{
        res.send(result);
    })
})

/
app.listen(3001,() => {
    //just for testing backend  
    console.log('running on ports 3001');
})