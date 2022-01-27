import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';

export async function submitt(rd1: string[],)
{
 try {
 // Create a new file system based wallet for managing identities.
 const walletPath = path.join(process.cwd(), '/connect/Org1Wallet');
 const wallet = await Wallets.newFileSystemWallet(walletPath);
 console.log(`Wallet path: ${walletPath}`);
 // Create a new gateway for connecting to our peer node.
 const gateway = new Gateway();
 const connectionProfilePath = path.join( 'D:/kyc_hyperledger/server/',
'/connect/connection.json');
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
 await contract.submitTransaction('createKyc',rd1[0],rd1[1]);
 console.log('Transaction has been submitted');
 // Disconnect from the gateway.
 gateway.disconnect();
 } catch (error) {
 console.error('Failed to submit transaction:',error);
 process.exit(1);
 }
}
