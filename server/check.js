var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';


let submitAppointmentDetails = (name, aadhar_no, time_slot, meet_id) => {
        // let name = req.body.name;
        // let email = req.body.email;
        // let time_slot = req.body.time_slot;



        MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("vKYC");
                dbo.collection("appointment").insertOne({ 'name': name, 'aadhar_number': aadhar_no, 'time_slot': time_slot, 'meet_id': meet_id, 'flag': '0' }, function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        db.close();
                        //res.send({ "result": 'Inserted' })
                });
        });
}

function getAllAppointment() {
        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("vKYC");
                aadhar_number = ''
                dbo.collection("appointment").findOne({'email': 'rd@gmail.com'}, function(err, result) {
                if (err) throw err;
                if (result != null) {
                        console.log('result: ', result)
                        return result
                }
                db.close();
                });
        });
}

const submitUserDetails = (aadhar_no,name,email,phone, aadhar_img, pan_img, user_img) => {
        // let name = req.body.name;
        // let email = req.body.email;
        // let time_slot = req.body.time_slot;



        MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("vKYC");
                dbo.collection("userDetails").insertOne({ 'name': name, 'email': email, 'aadhar_no': aadhar_no, 'phone': phone, 'aadhar_img': aadhar_img, 'pan_img': pan_img, 'user_img': user_img ,'flag': '0'}, function (err, result) {
                        if (err) throw err;
                        console.log(result);
                        db.close();
                        //res.send({ "result": 'Inserted' })
                });
        });
}

 function getUserDetails(aadhar_number) {
        MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("vKYC");
                 dbo.collection("userDetails").findOne({'aadhar_number': aadhar_number}, function(err, result) {
                if (err) throw err;
                if (result != null) {
                        console.log('result: ', result)
                        return result
                }
                db.close();
                });
        });
}

//console.log(getUserDetails())

module.exports = { submitAppointmentDetails,getAllAppointment,submitUserDetails,getUserDetails } 