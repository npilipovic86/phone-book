var mysql = require('mysql');
var npm = require('npm');
/*MY SQL Connection Info*/
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
  password: "root",
  database: "db_pb" | ""
  });
  
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	con.query("CREATE DATABASE IF NOT EXISTS db_pb;", function (err, result) {
	  if (err) throw err;
	  console.log("Database created");
	});
	con.query("use db_pb;", function (err, result) {
		if (err) throw err;
      }); 
	var sql = "CREATE TABLE phonebook (id integer auto_increment, firstName varchar(30), lastName varchar(30), number varchar(30), primary key (id));";
  con.query(sql, function (err, result) {
		if (err) throw err;
        console.log("Table created");
        con.destroy();
      });
  });
  npm.load({}, function (er) {
    if (er) { return; }
    npm.commands.run(['start']);
  });