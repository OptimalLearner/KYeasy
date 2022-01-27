const express = require('express');
const app = express();
//const morgan=require('morgan')
require('dotenv').config()
const router = express.Router();
const dataController = require('./controller.js')
var session = require('express-session')

const cors = require('cors')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: true,
}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const store = require("store2");

app.use(express.static('D:/kyc_hyperledger/client/'));
//app.use(express.static('D:/kyc_hyperledger/client/dashboard'))
//app.use(express.static('D:/kyc_hyperledger/client//'));


//const patientRoutes=require('./patients/routes/patients')

//app.use('/patients',patientRoutes)

//app.post('/getInfo',dataController.getInfo)

app.post('/getInfo', dataController.getInfo)
app.get('/getIPFS', dataController.getIPFS)
app.get('/mainPage', dataController.mainPage)
app.post('/getAadhar', dataController.getAadhar)
app.get('/dashboard', dataController.dashboard)
app.post('/getBank', dataController.getBank)
app.get('/otpPage', dataController.otpPage)
app.get('/userDetailComplete',dataController.userDetailComplete)
app.get('/onGoing',dataController.onGoing)
app.post('/submitInformation', dataController.submitInformation)
/*
app.use((req,res,next)=>{
    const error=new Error('not found')
    error.starus=404;
    
    next(error);
})


app.use((error,req,res)=>{
    res.status(error.status || 500)
    res.json({
        error:{
        message:error.message
        }
    })
})
*/






module.exports = app;