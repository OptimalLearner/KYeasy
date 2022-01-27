PRE-REQUISUTES
1)IBM hyperledger extension vscode.  https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform
2)Node js
3)Mongodb
4)Twilio account (for whatsapp)    https://www.twilio.com/
5)Ngrok   https://ngrok.com/
6)IPFS    https://ipfs.io/


steps to run:-
1)Unzip the folder.
2)run the command:
npm install

3)Make the changes in .env file
  1)email id
  2)password
  3)whatsapp number
  4)auth token and sid of twilio
4)run the command
  node app.js

5)Open ngrok and run the following command
  ngrok.exe http 3000

6)copy the ngrok link and copy it in .env file.

7)
  1)Go to twilio.com
  2)messages
  3)whatsapp settings
  4)enter the code which ia displayed.
  5)change the request to your ngrok https request
    example:https://87fe-203-192-244-138.ngrok.io/whatsapp
  6)save.

8)In the vscode ibm environment,
  1)Click on connected via gateway and select export connection profile.
  2)In fabric wallet click on export wallet give name "Org1Wallet" and save it.
8)Go to localhost 3000.

