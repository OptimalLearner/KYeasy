let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let stream = require('./ws/stream');
let path = require('path');
let favicon = require('serve-favicon');
const fs = require('fs');
var moment = require('moment');
var session = require('express-session')
var functions = require('../../trial_vkyc')

//app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express());
app.use(express({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(session({
	secret: 'ssshhhhh',
	resave: false,
	saveUninitialized: true,
}));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
MongoClient.connect(url, function (err, client) {
	const db = client.db('vKYC');
	db.collection('appointment').findOne({}, (err, result) => {
		if (err) {
			throw err;
		}
		//console.log(result.name);
	});
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


io.of('/stream').on('connection', stream);

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

app.all('/meet/:slug', function (req, res) {
	res.render(path.join(__dirname, '../public/final_meet.ejs'), { name: 'abcd' });
});

app.get('/check_login', function (req, res) {
	let email = req.body.email;
	let password = req.body.password;
	var result1 = 'Not Found'
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("vKYC");
		dbo.collection("employee_login").findOne({ 'email': email, 'password': password }, function (err, result) {
			if (err) throw err;
			console.log(result);
			if (result != null) {
				result1 = 'Found'
			}
			db.close();
			res.send({ "result": result1 })
		});
	});
});

app.all('/save_recording', function (req, res) {
	//console.log(req.body)
	//console.log(req.body.blob)
	console.log('in server recording')
	var buf = new Buffer.from(req.body.blob, 'base64'); // decode
	mom = moment().unix()
	fs.writeFile(`${__dirname}/temp/${req.body.user}-${mom}-record.webm`, buf, function (err) {
		if (err) {
			console.log("err", err);
		} else {
			filee = __dirname + "\\temp\\" + req.body.user + "-" + mom + "-record.webm"
			console.log(filee)
			functions.addFi(filee).then(res => {
				console.log("fileee" + res)
				decrypt_hash = functions.decrypt(res)
				req.session.video = decrypt_hash
				console.log("decrypted hash" + decrypt_hash)
				fs.unlink(filee, (err) => {
					if (err) {
						throw err;
					}

					console.log("File is deleted.");
				});
			})

			console.log('server success')
			return res.json({ 'status': 'success' });

		}
	});

});

app.post('/save-geoloc', function (req, res) {
	console.log(req.body.lat, req.body.lon, req.body.username)
	req.session.lat = req.body.lat
	req.session.long = req.body.lon
	let user_ip = req.header('x-forwarded-for') || req.connection.remoteAddress
	console.log(user_ip)
	req.session.ip = user_ip
	console.log("session" + req.session.ip)

})

app.all('/notif', function (req, res) {
	return res.sendFile(__dirname + '/button.html');
})

server.listen(4000);

module.exports = { app }
