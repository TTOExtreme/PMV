var db = require('../app/mysql/db_execute');

var mysql = require('mysql');
var cfg = require('../config/index');

var sql="SELECT id_usr,usr_name,user,matric,cpf,last_login,grp_id FROM PMV_WSPV_B._users LEFT JOIN PMV_WSPV_B.brg_user_group ON `usr_id`=`id_usr`;"


var i = new Date().getTime();

//var result = db(sql);
var result = db1(sql,(ret)=>{

    var j = new Date().getTime();
    console.log((j-i) + " ms");
});


//--------------------------------------------


function db1(sql,ret){
var con=mysql.createConnection(cfg.db);
    con.connect(function(err){
        if(err){console.log(err);}
        console.log("connect");
    })
    con.query(sql, function (err, result) {
        if (err) throw err;
        ret(result)
      });
}