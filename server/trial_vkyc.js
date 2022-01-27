
const fs =require('fs')
const crypto = require('crypto');
var opn = require('opn');
const nodemailer=require('nodemailer')

const IPFS = require('ipfs-api');
const ipfs = new IPFS('localhost', '5001', { protocol:'http' });
require('dotenv').config()



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
    //pass:'khrwwpabiohbbkhd'
  }
});



function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
} 

//console.log(decrypt('e1e201950d4f876a304723320b9ee1c4bbe504fc37f958756701fb36860913c9853ba03eedd24ca241cbe58c85bbc110'))

const addFile=async(files)=>{
	hash_list=[]
	for(i=0;i<files.length;i++)
	{		
	content=fs.readFileSync(files[i])
	let testBuffer = Buffer.from(content)
	const fileadded=await ipfs.add(testBuffer)
	enc_hash=encrypt(fileadded[0].hash)
	hash_list.push(enc_hash)
	}
	return hash_list
}

const addFi=async(filee)=>{
  content=fs.readFileSync(filee)
  let testBuffer = Buffer.from(content)
  const fileadded=await ipfs.add(testBuffer)
  enc_hash=encrypt(fileadded[0].hash)
  return enc_hash

}

/*






a

addFile(['./awa.pdf','./ebook.pdf']).then(x=>{
	console.log(x)
	//console.log("decrypt",decrypt(x))

})








//storeIpfs('./ipfs.txt').then(console.log)
retrieveIpfs('3bc0ee66e09824ee73416ee4c01f36c1ce5cf39517c422b3bc62e4727f4a4894450d93e779f8ec039a3f64ec63700569')

*/
function generatePath(file){
  path="https:ipfs.io/ipfs/"+file

  return path
}


 async function retrieveIpfs(enhash) {
  pathh=""
  let dehash= decrypt(enhash)
  await ipfs.files.get(dehash, function(err, file) {
        
        console.log(file)
    pathh=generatePath(file[0].path)
        
        console.log("pathh",pathh)
        return pathh

//opn('https://ipfs.io/ipfs/QmYKzJx63rBuK52Mb3jPAHFiLxyBzcdsXSXeCimtAi13Vy');
//http://bafybeiam2jkwnk42kyvgce33hekrmtr2bkmoozx5ttw66lwljizv2josam.ipfs.localhost:8081/    
})
 return pathh
}
//addFile('./awa.pdf').then(x=>concole.log(x))

//retrieveIpfs('3bc0ee66e09824ee73416ee4c01f36c1ce5cf39517c422b3bc62e4727f4a4894450d93e779f8ec039a3f64ec63700569')
//console.log(x)


function generateOTP() { 
          
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 

//otp=generateOTP()
//console.log(otp)

function sendEmail(subject,email_text,to)
{
var mailOptions = {
  from: "rahuldoshi34@gmail.com",
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

//sendEmail("OTP",otp,"rahuldoshi34@gmail.com","healthchain01@gmail.com")

module.exports={addFile,decrypt,sendEmail,generateOTP,addFi}

