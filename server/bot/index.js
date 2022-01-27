const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const contract_functions=require('../connect/src/try.js')
const language = require('./language.json')
var session = require('express-session')
// Start the webapp
const webApp = express();

webApp.use(express.static('D:/kyc_hyperledger/client/multistep/images'));
webApp.use(express.static('D:/kyc_hyperledger/client/multistep/'));
webApp.set('view engine', 'ejs');

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());

webApp.use(session({
    secret: 'ssshhhhh',
    resave: false,
    saveUninitialized: true,
}));

var cookieParser = require('cookie-parser');
webApp.use(cookieParser());

// Server Port
const PORT = process.env.PORT;

const WA = require('./bot_functions.js');

// Home route
webApp.get('/', (req, res) => {


    res.send(`Hello World.!`);

});



// Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;


    console.log(message);
    console.log(senderID);


    if (message.includes("hello")) {
        WA.sendMessage("Welcome to KYeasy!\nTo proceed further please select the language.\nPress: \n1 for English \n2 for Hindi \n3 for Marathi \n4 for Tamil", senderID)
    }



    if (message.toLowerCase().includes("aadhar number")) {
        console.log("hello")
        rd=message.split(' ')[2]
        //console.log(rd)
        contract_functions.searchAsset(rd).then(value=>{
        //value = false
        if (value=="true") {
            console.log("in")
            str="You have already done your vkyc to give access of your kyc data  to more banks click on this link \n"+process.env.MEET_LINK+"/addBank"
            WA.sendMessage(str, senderID)

        }
        else {
            console.log("in else")
            //console.log(req.session.language)
            req.session.language = "hindi"

            str2 = process.env.MEET_LINK+"/form"
            console.log(str2)
            WA.sendMessage(str2, senderID)
            // WA.sendMessage('Fill this form to book a vkyc appointment: http://569a-2405-201-2b-4074-408c-9b83-1647-a5e5.ngrok.io',senderID)
            //WA.sendMessage('Fill this form http://localhost:3000')
        }
        })

    }

    switch (message) {
        case "1":
            req.session.language = "english"
            WA.sendMessage(language.english.reply1, senderID)
            break
        case "2":
            req.session.language = "hindi"
            console.log(req.session.language)
            WA.sendMessage(language.hindi.reply1, senderID)
            break
        case "3":
            req.session.language = "marathi"
            WA.sendMessage(language.marathi.reply1, senderID)
            break
        case "4":
            req.session.language = "tamil"
            WA.sendMessage(language.tamil.reply1, senderID)
            break


        // WA.sendMessage("Welcome to vkyc process. Please enter your aadhar number EXAMPLE:Aadhar number 123456789",senderID)
    }



});

webApp.get('/form', (req, res) => {
    //console.log(req.session.aadhar_number)
    console.log("cookies",req.cookies)
    res.sendFile('D:/kyc_hyperledger/client/multistep/index.html')
})

webApp.get('/addBank', (req, res) => {
    res.sendFile('D:/kyc_hyperledger/client/otp.html')
})


// Start the server
/*
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
*/

module.exports={webApp}