
const fs = require('fs')
const path = require('path')
const {Gateway,Wallets} = require('fabric-network')

async function main() {
 try {
 // Create a new file system based wallet for managing identities.
 const walletPath = 'D:/kyc_hyperledger/server/connect/Org1Wallet';
 const wallet = await Wallets.newFileSystemWallet(walletPath);
 console.log(`Wallet path: ${walletPath}`);
 // Create a new gateway for connecting to our peer node.
 const gateway = new Gateway();
 const connectionProfilePath = path.resolve(__dirname, '..',
'connection.json');
 const connectionProfile =
JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));
 const connectionOptions = { wallet, identity: 'Org1 Admin', discovery:
{ enabled: true, asLocalhost: true } };
 await gateway.connect(connectionProfile, connectionOptions);
 // Get the network (channel) our contract is deployed to.
 const network = await gateway.getNetwork('mychannel');
 // Get the contract from the network.
 const contract = network.getContract('smart_contract');
 // Submit the specified transaction.
 await contract.submitTransaction('createKyc', '009', 'NightWatch');
 console.log('Transaction has been submitted');
 // Disconnect from the gateway.
 gateway.disconnect();
 } catch (error) {
 console.error('Failed to submit transaction:',error);
 process.exit(1);
 }
}
void main();
