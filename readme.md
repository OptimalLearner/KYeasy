# KYeasy
The banks are responsible for completing the KYC procedure while opening accounts. KYC may be a manual, time-consuming, and redundant across institutions. Work becomes quite exhaustive collecting KYC information unnecessarily replicated by multiple institutions. 

Banks are penalized by the regulator for violating KYC instructions. For lacking to follow certain aspects of KYC norms, which allowed fraudsters to open fictitious accounts in the name of a reputed legal organization and use those for illegal transactions.

There’s no single platform for one time KYC which then will be shared within the Bank Consortium. Client has to go through the KYC process every single time he decides to open an account in other bank.

We have developed an application named KYeasy. As the name suggests it makes the process of vKYC easy both for banks and its clients. To increase user friendliness and provide a great user experience so that more users are encouraged to participate in the process of vKYC, we have created a web portal as well as a Whatsapp bot. We have used IPFS to store the documents uploaded by the user. IPFS is decentralized storage space for storing all types of documents and files. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

Blockchain technology allows for the creation of a Smart Contract (Chaincode) that is then shared to all users on the network. In our blockchain each bank is a different organization which have different peer nodes. And a chaincode also known as smart contract is deployed to make the vKYC process secure and accessible to all member banks with the consent of the user. Data access would be solely based on user consent so that confidentiality of the user is preserved.

**Front-end Tech Stack:** HTML5, CSS, JavaScript, Bootstrap 5, jQuery  
**Back-end Tech Stack:** NodeJS, ExpressJS  
**Database Used:** MongoDB  
**APIs Used:** Twilio API  
**Blockchain Used:** Hyperledger Fabric  

## PRE-REQUISITES
> Make sure you have the following pre-requisites installed
* IBM hyperledger extension vscode: [(Get it)](https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform)
* NodeJS: [(Get it)](https://nodejs.org/en/)
* MongoDB: [(Get it)](https://www.mongodb.com/try/download/community)
* Twilio account (For Whatsapp): [(Get it)](https://www.twilio.com/)
* Ngrok: [(Get it)](https://ngrok.com/)
* IPFS: [(Get it)](https://ipfs.io/)


## Steps to run the code
1. Open command prompt (or terminal) and change the current working directory to location where you want to clone the repository.
2. Then type: git clone https://github.com/OptimalLearner/KYeasy.git
3. If the clone was successfully completed then a new sub directory may appear with the same name as the repository. Now change the current directory to the new sub directory.
4. Open your Command Prompt/Terminal and run the command `npm install` to install all the dependencies.
5. Open the .env file and add the environment variables like your email id, password, Twilio sid and auth token and your whatsapp number.
6. Run your app using the command `node app.js`
7. Open your ngrok terminal and run the following command: `ngrok.exe http 3000`
8. Copy the ngrok link and paste it in .env file for value of MEET_LINK.
9. Open your gmail account > Manage your Google Account > Security > Less secure app access > Turn it ON (if it was OFF earlier).
10. Go to [twilio.com]((https://www.twilio.com/)) > Messages > Whatsapp Settings > Enter the code which is displayed > Change the request to your ngrok https address (ex: https://91fd-203-199-424-191.ngrok.io/whatsapp) > Save.
11. In the VSCode IBM Environment,
  * Click on connected via gateway and select export connection profile.
  * In fabric wallet click on export wallet give name "Org1Wallet" and save it.
12. Go to http://localhost:3000/mainPage to access the app. (You can even use ngrok public https address instead of localhost)
