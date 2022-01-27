let express = require('express');
let app = express();
let server = require('http').Server(app);
// let io = require('socket.io')(server);
//let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');
const fs = require('fs');
var moment = require('moment');
var session = require('express-session')
var functions = require('../trial_vkyc')
const store = require("store2");
var trial = require('../connect/src/try.js')

//app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express());
app.use(express({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());


app.use(session({
	secret: 'ssshhhhh',
	resave: false,
	saveUninitialized: true,
}));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
// MongoClient.connect(url, function (err, client) {
// 	const db = client.db('vKYC');
// 	db.collection('appointment').findOne({}, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		//console.log(result.name);
// 	});
// });

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html');
// });


//io.of('/stream').on('connection', stream);

app.post('/make_appointment', function (req, res) {
	let name = req.body.name;
	let email = req.body.email;
	let time_slot = req.body.time_slot;

	const crypto = require("crypto");
	const meet_id = crypto.randomBytes(10).toString("hex");

	// let meet_link = req.protocol + "://" + req.headers.host + "/meet/" + meet_id
	// console.log(meet_link)

	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("vKYC");
		dbo.collection("appointment").insertOne({ 'name': name, 'email': email, 'time_slot': time_slot, 'meet_id': meet_id }, function (err, result) {
			if (err) throw err;
			console.log(result);
			db.close();
			res.send({ "result": 'Inserted' })
		});
	});



	//res.sendFile(path.join(__dirname, '../public/meet.html'));
});

// app.all('/meet/:slug', function(req, res) {
// 	meet_id = req.params.slug
// 	let name = ''
// 	MongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("vKYC");
// 		dbo.collection("appointment").findOne({'meet_id': meet_id}, function(err, result) {
// 		  if (err) throw err;
// 		  if (result != null) {
// 			name = result.name
// 		  }
// 		  db.close();
// 		  res.render(path.join(__dirname, '../public/final_meet.ejs'), {name: name});
// 		});
// 	  });
// });

// app.all('/employee-meet/:slug', function(req, res) {
// 	meet_id = req.params.slug
// 	user_name = 'Employee'
// 	res.render(path.join(__dirname, '../public/final_meet.ejs'), {name: user_name});
// })

app.all('/meet/:slug', function(req, res) {
	meet_id = req.params.slug
	aadhar_number = '333344445555'
	//let name = meeting(meet_id)
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("vKYC");
		dbo.collection("appointment").findOne({'meet_id': meet_id}, function(err, result) {
		  if (err) throw err;
		  if (result != null) {
			user_name = result.name
		  }
		  db.close();
		  MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("vKYC");
			 dbo.collection("userDetails").updateOne({'aadhar_no': aadhar_number}, {$set: {'flag': '1'}}, function(err, result) {
			if (err) throw err;
			if (result != null) {
					console.log('result: ', result)
			} else {
				console.log('null')
			}
			db.close();
			});
		  });

		  MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("vKYC");
			 dbo.collection("appointment").updateOne({'aadhar_number': aadhar_number}, {$set: {'flag': '1'}}, function(err, result) {
			if (err) throw err;
			if (result != null) {
					console.log('result: ', result)
			} else {
				console.log('null')
			}
			db.close();
			});
		  });
		  res.render(path.join(__dirname, '../public/final_meet.ejs'), {name: user_name});
		});
	  });
});

app.all('/employee-meet/:slug', function(req, res) {
	meet_id = req.params.slug
	user_name = 'Employee'
	res.render(path.join(__dirname, '../public/final_meet.ejs'), {name: user_name});
})

// let meeting = (meet_id) => {
// 	user_name = ''
// 	MongoClient.connect(url, function(err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("vKYC");
// 		dbo.collection("appointment").findOne({'meet_id': meet_id}, function(err, result) {
// 		  if (err) throw err;
// 		  if (result != null) {
// 			user_name = result.name
// 		  }
// 		  db.close();
// 		  console.log(user_name)
// 		  return user_name;
// 		});
// 	  });
// }

// app.get('/check_login', function (req, res) {
// 	let email = req.body.email;
// 	let password = req.body.password;
// 	var result1 = 'Not Found'
// 	MongoClient.connect(url, function (err, db) {
// 		if (err) throw err;
// 		var dbo = db.db("vKYC");
// 		dbo.collection("employee_login").findOne({ 'email': email, 'password': password }, function (err, result) {
// 			if (err) throw err;
// 			console.log(result);
// 			if (result != null) {
// 				result1 = 'Found'
// 			}
// 			db.close();
// 			res.send({ "result": result1 })
// 		});
// 	});
// });

app.all('/save_recording', function (req, res) {
	//console.log(req.body)
	//console.log(req.body.blob)
	console.log('in server recording')
	// console.log("src cookie: ",JSON.stringify(req.cookies))
	// console.log("src session: ", req.session)
	//console.log(req.body.blob)
	if(req.body.user == 'Employee') {
		return res.json({'status': 'employee'})
	} else {
		var buf = new Buffer.from(req.body.blob, 'base64'); // decode
		mom = moment().unix()
		fs.writeFile(`${__dirname}/temp/${req.body.user}-${mom}-record.webm`, buf, function (err) {
			if (err) {
				console.log("err", err);
			} else {
				filee = __dirname + "\\temp\\" + req.body.user + "-" + mom + "-record.webm"
				console.log(filee)
				functions.addFi(filee).then(resp => {
					console.log("fileee" + resp)
					// decrypt_hash = functions.decrypt(res)
					// req.session.video = decrypt_hash
					// console.log("decrypted hash" + decrypt_hash)
					fs.unlink(filee, (err) => {
						if (err) {
							throw err;
						}

						console.log("File is deleted.");
						aadhar_number = '333344445555'
						MongoClient.connect(url, function(err, db) {
							if (err) throw err;
							var dbo = db.db("vKYC");
							 dbo.collection("userDetails").findOne({'aadhar_no': aadhar_number}, function(err, result) {
							if (err) throw err;
							if (result != null) {
									console.log('result: ', result)
									console.log('aadhar img', functions.decrypt(result.aadhar_img), resp)
									trial.submitt(aadhar_number, result.aadhar_img, result.pan_img, result.user_img,"19.2328589", "72.8498341", "203.194.104.234", resp, "all")
		
									console.log('server success')
							} else {
								console.log('null')
							}
							db.close();
							});


							MongoClient.connect(url, function(err, db) {
								if (err) throw err;
								var dbo = db.db("vKYC");
								 dbo.collection("userDetails").updateOne({'aadhar_no': aadhar_number}, {$set: {'flag': '2'}}, function(err, result) {
								if (err) throw err;
								if (result != null) {
										console.log('result: ', result)
										
										return res.json({ 'status': 'success' });
								} else {
									console.log('null')
								}
								db.close();
								});
							});

							MongoClient.connect(url, function(err, db) {
								if (err) throw err;
								var dbo = db.db("vKYC");
								 dbo.collection("appointment").updateOne({'aadhar_number': aadhar_number}, {$set: {'flag': '2'}}, function(err, result) {
								if (err) throw err;
								if (result != null) {
										console.log('result: ', result)
										
								} else {
									console.log('null')
								}
								db.close();
								});
							});
					});
				})
				//console.log("cooky: ", JSON.stringify(req.cookies))
				

			})
		}
		})
	}
});

app.post('/save-geoloc', function (req, res) {
	console.log(req.body.lat, req.body.lon, req.body.username)
	
	
	req.session.lat = req.body.lat
	req.session.long = req.body.lon
	let user_ip = req.header('x-forwarded-for') || req.connection.remoteAddress
	console.log(user_ip)
	req.session.ip = user_ip
	console.log("session" + req.session.ip)
	user_data={
		"lat":req.body.lat,
		"lon":req.body.lon,
		"ip":user_ip

	}
	console.log(user_data)
	store('user_data', {lat: req.body.lat, lon:req.body.lon, ip: user_ip}); 
	console.log("using store"+JSON.stringify(store.getAll()))

	res.cookie("user_data", user_data)
	console.log("cookies in app",req.cookies)
	res.send({'data': 'done'})
})

app.all('/notif', function (req, res) {
	return res.sendFile(__dirname + '/button.html');
})

//server.listen(4000);

module.exports = { app }
