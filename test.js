var mysql = require('mysql2/promise');
// var fs = require('fs')

var new_con = mysql.createPool({
	host: "192.168.64.2",
	user: "vishnu",
	password: "2020",
	database: "demo"
  });
  
// con.connect(function(err) {
// if (err) throw err;
// console.log("Database Connected!");
// });

new_con.query("SELECT * FROM items", function(err,result,fields){
  if (err){
    console.log(err)
    return
  }
  console.log(result)
  
})










