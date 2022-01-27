var formidable = require('formidable')
var functions = require('./trial_vkyc.js')
var trial = require('./connect/src/try.js')
var db_functions = require('./check')

const crypto = require("crypto");
const WA = require('./bot/bot_functions');
require('dotenv').config();
const IPFS = require('ipfs-api');
const ipfs = new IPFS('localhost', '5001', { protocol: 'http' });
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const store = require("store2");


const submitInformation = (req, res) => {
  console.log("aadhar in submitInfo"+req.cookies.aadhar_number)
  var form = new formidable.IncomingForm()
  form.parse(req, function (err, fields, files) {
    console.log("hello")
    //res.write('File uploaded');
    aadhar_card_photo = files.aadhar.filepath
    pan_card_photo = files.pan.filepath
    self_photo = files.photo.filepath
    filepath_array = [aadhar_card_photo, pan_card_photo, self_photo]

    functions.addFile(filepath_array).then(x => {
      console.log("x", x[0])
      //trial.submitt('32',x[0],x[1])
      data={
        "aadhar":x[0],
        "pan":x[1],
        "photo":x[2]
      }



      // req.session.aadhar = x[0]
      // req.session.pan = x[1]
      // req.session.photo = x[2]
      //console.log("aadhar in session in submitInfo"+req.session.aadhar)
      const meet_id = crypto.randomBytes(10).toString("hex");
      //console.log("pan0", req.session.pan)
      meet_link = process.env.MEET_LINK + "/meet/" + meet_id
      console.log(req.body)
      functions.sendEmail('Link for vkyc', meet_link, process.env.EMAIL, fields.email)
      WA.sendMessage(meet_link, process.env.PHONE_NO)
      db_functions.submitAppointmentDetails(fields.fullname, '333344445555', fields.apttime, meet_id)
      db_functions.submitUserDetails('333344445555', fields.fullname, fields.email, fields.phoneno, x[0], x[1], x[2])
      // res.cookie("data",data)
      // console.log("hello ",req.cookies.data);
      res.render('D:/kyc_hyperledger/client/index.ejs', { flag: 1 })
      //res.redirect('http://localhost:5000/getIPFS')
    })
    // res.end();
  });

}

const onGoing=(req,res)=>{
  //console.log(req.session.aadhar_number)
  // console.log("in ongoing",req.cookies.aadhar_number)
  // console.log("pan in ongoing",req.cookies.data.pan)
  // console.log("cookies in ongoing",req.cookies)
  // console.log("using store"+JSON.stringify(store.getAll()))

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("vKYC");
     dbo.collection("userDetails").findOne({'aadhar_no': '333344445555'}, function(err, result) {
    if (err) throw err;
    if (result != null) {
        result.aadhar_img = functions.decrypt(result.aadhar_img);
        result.pan_img = functions.decrypt(result.pan_img);
        result.user_img = functions.decrypt(result.user_img);
        result['lat'] = '19.2328589'
        result['long'] = '72.8498341'
        result['ip_address'] = '203.194.104.234'

        console.log('result: ', result)
        // data={
        //   "aadhar_number": res,
        //   "aadhar_photo":functions.decrypt(req.cookies.data.aadhar),
        //   "pan_photo":functions.decrypt(req.cookies.data.pan),
        //   "user_photo":functions.decrypt(req.cookies.data.photo),
        //   "position":{
        //     //"lat":req.cookies.user_data.lat,
        //     //"lat":req.cookies.user_data.long
        //     "lat":"19.2328589",
        //     "lon":"72.8498341"
        //   },
        //   //"ip_address":req.cookies.user_data.ip
        //   "ip_address":"2405:201:2b:40d8:f9d3:4b27:9540:f1e5"
      
        // }
        //console.log(data)
        res.render('D:/kyc_hyperledger/client/dashboard/pending.ejs', {"data":result})
    } else {
      console.log('null')
    }
    db.close();
    });
  });
}

const submitOnBlockchain = (req, res) => {
  trial.submitt(req.cookies.aadhar_number, functions.decrypt(req.cookies.data.aadhar), functions.decrypt(req.cookies.data.pan), functions.decrypt(req.cookies.data.photo),"19.2328589", "72.8498341", "2405:201:2b:40d8:f9d3:4b27:9540:f1e5", functions.decrypt(req.session.video), "all")

}

const getInfo = (req, res) => {
  aadhar_no = req.body.aadhar_no
  console.log(req.body.aadhar_no)
  trial.getTransactionData(aadhar_no).then(x => { console.log(x) })
  res.end();
}

const getIPFS = (req, res) => {
  console.log("session aadhar", req.session.aadhar)
  decrypt_hash_aadhar = functions.decrypt(req.session.aadhar)
  decrypt_hash_pan = functions.decrypt(req.session.pan)
  decrypt_hash_photo = functions.decrypt(req.session.photo)
  str = "http://localhost:8082/ipfs/"
  aadhar_str = str + decrypt_hash_aadhar
  pan_str = str + decrypt_hash_pan
  photo_str = str + decrypt_hash_photo
  console.log("photo str" + photo_str)


  res.end()
}

const mainPage = (req, res) => {
  //res.sendFile("../client/index.html")
  console.log('ejs')
  res.render("D:/kyc_hyperledger/client/index.ejs", {'flag': '0'})

}

const getAadhar = (req, res) => {

  req.session.aadhar_number = req.body.aadhar
  console.log("rd", req.session.aadhar_number)
  res.cookie("aadhar_number", req.session.aadhar_number)
  trial.searchAsset(req.body.aadhar).then(result => {
    if (result == "false") {
      res.redirect(process.env.MEET_LINK+'/form')
    }
    else {
      let name = 'Hello'
      //res.render('D:/kyc_hyperledger/client/otp.ejs', { 'name': name })
      res.sendFile('D:/kyc_hyperledger/client/otp.html')

    }
  })



}

const updateInfo = (req, res) => {
  trial.updateAsset(req.session.aadhar_number, req.body.banks)

}

const dashboard = (req, res) => {
  let upcoming = []
  let pending = []
  let completed = []

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("vKYC");
    dbo.collection("appointment").find({ 'flag': '0' }).toArray(function (err, result) {
      if (err) throw err;
      if (result != null) {
        upcoming = result;
      } else {
        upcoming = []
      }
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("vKYC");
        dbo.collection("appointment").find({ 'flag': '1' }).toArray(function (err, result) {
          if (err) throw err;
          if (result != null) {
            pending = result;
          } else {
            pending = [];
          }
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("vKYC");
            dbo.collection("appointment").find({ 'flag': '2' }).toArray(function (err, result) {
              if (err) throw err;
              if (result != null) {
                completed = result;
              } else {
                completed = []
              }
              //console.log(upcoming, pending, completed)
              return res.render('D:/kyc_hyperledger/client/empprofile.ejs', { 'upcoming': upcoming, 'pending': pending, 'completed': completed, 'link': process.env.MEET_LINK });
              db.close();
            });
          });
          db.close();
        });
      });
      db.close();
    });
  });
}

const userDetailComplete = (req, res) => {
  console.log(req.body.aadhar_no)

  trial.getTransactionData('333344445555').then(x=>{
    console.log(x)
    x.aadhar_no = '333344445555'
    x.aadhar = functions.decrypt(x.aadhar)
    x.pan = functions.decrypt(x.pan)
    x.photo = functions.decrypt(x.photo)
    x.vid_rec = functions.decrypt(x.vid_rec)
    res.render('D:/kyc_hyperledger/client/dashboard/completed.ejs',{data:x})
  })

}

const userDetailsBefore = (req, res) => {
  db_functions.getUserDetails()

}

const otpPage = (req, res) => {
  res.sendFile('D:/kyc_hyperledger/client/otp.html')
}

const getBank = (req, res) => {
  console.log('hello')
  otp = functions.generateOTP()
  str = "OTP is " + otp
  console.log(req.session.aadhar_number)
  MongoClient.connect(url, function (err, db) {
    console.log("in mongo")
    if (err) throw err;
    var dbo = db.db("vKYC");
    dbo.collection("userDetails").findOne({ 'aadhar_no': req.session.aadhar_number }, function (err, result) {
      if (err) throw err;
      if (result != null) {
        console.log("in if")
        console.log('result: ', result)
        functions.sendEmail("OTP", str, result.email)
        WA.sendMessage(str, process.env.PHONE_NO)
        res.send({ 'data': otp })

        // return result
      }
      db.close();
    });
    //res.sendFile('')
    //res.render('D:/kyc_hyperledger/client/index.ejs', { flag: 1 })
  });

}



module.exports = { submitInformation, getInfo, getIPFS, mainPage, getAadhar, dashboard, getBank, otpPage, userDetailComplete, onGoing }



