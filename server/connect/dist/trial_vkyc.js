"use strict";
const fs = require('fs');
const crypto = require('crypto');
var opn = require('opn');
const IPFS = require('ipfs-api');
const ipfs = new IPFS('localhost', '5001', { protocol: 'http' });
require('dotenv').config();
/*
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahuldoshi34@gmail.com',
    pass: process.env.PASSWORD
  }
});
*/
function encrypt(text) {
    var cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
function decrypt(text) {
    var decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}
const addFile = async (files) => {
    hash_list = [];
    for (i = 0; i < files.length; i++) {
        content = fs.readFileSync(files[i]);
        let testBuffer = Buffer.from(content);
        const fileadded = await ipfs.add(testBuffer);
        enc_hash = encrypt(fileadded[0].hash);
        hash_list.push(enc_hash);
    }
    return hash_list;
};
/*

function retrieveIpfs(enhash) {
  let dehash= decrypt(enhash)
 ipfs.files.get(dehash, function (err, files) {
        files.forEach((file) => {
//opn('https://ipfs.io/ipfs/QmYKzJx63rBuK52Mb3jPAHFiLxyBzcdsXSXeCimtAi13Vy');
//http://bafybeiam2jkwnk42kyvgce33hekrmtr2bkmoozx5ttw66lwljizv2josam.ipfs.localhost:8081/
      })
}
 )
}

function generateOTP() {
          
    // Declare a digits variable
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}




addFile(['./awa.pdf','./ebook.pdf']).then(x=>{
    console.log(x)
    //console.log("decrypt",decrypt(x))

})








//storeIpfs('./ipfs.txt').then(console.log)
//retrieveIpfs('3bc0ee66e09824ee73416ee4c01f36c1ce5cf39517c422b3bc62e4727f4a4894450d93e779f8ec039a3f64ec63700569')




function sendEmail(subject,email_tezt,from,to)
{
//var emailtext="You have recieved a new prescription from doctor "+req.session.docemail+".Check it out!!!";
var mailOptions = {
  from: from,
  to: to,
  subject: subject,
  text: email_text
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);  }
});
}
*/
module.exports = { addFile };
//# sourceMappingURL=trial_vkyc.js.map