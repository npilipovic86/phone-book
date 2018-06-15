var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var open = require("open");

//STATIC FILES
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

/*MY SQL Connection Info*/
var mysql_pool = mysql.createPool({
	connectionLimit : 100,
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'db_pb',
});

//TEST CONNECTION
mysql_pool.getConnection(function (err, connection) {
	if (!err) {
		console.log("Database is connected ... ");
		connection.release();
	} else {
		console.log("Error connecting database ... ");
	}
	console.log("releasing connection ... ");
});

// This responds a GET request for the /list page.
app.get('/api/list', function (req, res) {
	console.log("GET Request :: /list");
	var data = {
        "error": 1,
        "phonebook": ""
    };
	mysql_pool.getConnection(function (err, connection) {
		connection.query('SELECT * FROM phonebook', function (err, rows, fields) {
			connection.release();
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["phonebook"] = rows;
				res.json(data);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["phonebook"] = [];
				data["status"] = 'No Found..' ;
				res.json(data);
			} else {
				data["phonebook"] = [];
				data["status"] = 'No Found..' ;
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
		});
	
	});
});

//UPDATE record
app.put('/api/update', function (req, res) {
    var id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var number = req.body.number;
    var data = {
        "error": 1,
        "phonebook": ""
    };
	console.log('PUT Request :: /update: ', req.body);
    if (!!id && !!firstName && !!lastName && !!number) {
		mysql_pool.getConnection(function (err, connection) {
			connection.query("UPDATE phonebook SET firstName = ?, lastName = ?, number = ? WHERE id=?",[firstName,  lastName, number, id], function (err, rows, fields) {
				connection.release();
				if (!!err) {
					data["phonebook"] = "Error Updating data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["phonebook"] = "Updated Successfully";
					console.log("Updated: " + [id, firstName, lastName, number]);
				}
				res.json(data);
			});
		});
    } else {
        data["phonebook"] = "Please provide all required data (i.e : id, firstName, lastName, number)";
        res.json(data);
    }
});

 //LIST by lastName
app.get('/api/list/:lastName', function (req, res) {
	var lastName = req.params.lastName;
	var data = {
        "error": 1,
        "phonebook": ""
    };
	console.log("GET request filter :: /list/" + lastName);
	mysql_pool.getConnection(function (err, connection) {
		connection.query('SELECT * from phonebook WHERE lastName = ?', lastName, function (err, rows, fields) {
			connection.release();
			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["phonebook"] = rows;
				res.
				json(data);
			} else {				
				data["phonebook"] = [];
				data["status"] = 'No Found..' ;
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
		});
	});
});

//INSERT new
app.post('/api/insert', function (req, res) {
	var id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var number = req.body.number;
    var data = {
        "error": 1,
        "phonebook": ""
    };
	console.log('POST Request :: /insert: ', req.body);
    if (!!firstName && !!lastName && !!number) {
		mysql_pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO phonebook SET firstName = ?, lastName = ?, number = ?",[firstName,  lastName, number], function (err, rows, fields) {
				connection.release();
				if (!!err) {
					data["phonebook"] = "Error Adding data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["phonebook"] = "Added Successfully";
					console.log("Added: " + [firstName,  lastName, number]);
				}
				res.json(data);
			});
        });
    } else {
        data["phonebook"] = "Please provide all required data (i.e : firstName, lastName, number)";
        res.json(data);
    }
});
//DELETE
app.delete('/api/delete/:id', function (req, res) {
	var id = req.params.id;
    var data = {
        "error": 1,
        "phonebook": ""
    };
	console.log('DELETE Request :: /delete: ' + id);
    if (!!id) {
		mysql_pool.getConnection(function (err, connection) {
			connection.query("DELETE FROM phonebook WHERE id=?",[id],function (err, rows, fields) {
				connection.release();
				if (!!err) {
					data["phonebook"] = "Error deleting data";
					console.log(err);
				} else {
					data["error"] = 0;
					data["phonebook"] = "Delete Successfully";
					console.log("Deleted: " + id);
				}
				res.json(data);
			});
		});
    } else {
        data["phonebook"] = "Please provide all required data (i.e : id ) & must be a integer";
        res.json(data);
	}
});
   
var server = app.listen(8081, function () {
  var port = server.address().port;
  console.log("Server started at: http://localhost:"  + port + "\nOpening browser ...");
  open("http://localhost:" + port);
});
