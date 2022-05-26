const btcClient = require('bitcoin-core');
const coreClient = require('bitcoin-core');
const coreclient = new coreClient({ 
		headers: true,									
		network: 'testnet', //can be mainnet or testnet
		host: '1.111.111.11', //enter your host IP
		port: 18332, //18332 for test
		username: 'bitcoin',  //your username here
		password: '111111111', //your password here
		timeout: 300000,
		version: '0.14.0'  
});

var bitcoinjs = require('bitcoinjs-lib');
toSatoshi = function (amount) {
		return Math.ceil(amount * 100000000);
	}

const sentxb = async () => {

        var amount = 1400;
		var toAddress = "mpRPfZ7JAHAsBRRWbNSNEwt4b2zcNJFgPY"; //Your TO ADDRESS here
		var miningFee = 2000;
		var fromAddress = "mtKpmh9U7HHvimbt6WzBoY3MMBczti8JQj";	//Your FROM ADDRESS here
    	var account = bitcoinjs.ECPair.fromWIF("...Your...Private...Key..Here...", bitcoinjs.networks.testnet);
		var txb = new bitcoinjs.TransactionBuilder(bitcoinjs.networks.testnet);	
		
		var transactions = await coreclient.listUnspent(0, 99999999, ["mtKpmh9U7HHvimbt6WzBoY3MMBczti8JQj"]);	
			transactionData = transactions[0];

			if (transactions[0].length) {
				var transactionsUsed = 0, balanceSatoshis = 0;
				
				for (var transaction of transactions[0]) {
					txb.addInput(transaction.txid, transaction.vout);
					balanceSatoshis += toSatoshi(transaction.amount);
					transactionsUsed += 1;
				}						
				
				if (balanceSatoshis <= (amount + miningFee)) {
					console.log('Bitcoin error: ', 'Insufficient funds');
				}
				
				else {
					var change = balanceSatoshis - (amount + miningFee);
					txb.addOutput(toAddress, amount); 

					if (change) {
						txb.addOutput(fromAddress, change);
					}
				
					lasterror=0;
					var totalUnspentSign = 0; let redeemScript;
					for (var i = 0; i < transactionsUsed; i++) {
						var res=txb.sign(i, account, redeemScript, null, toSatoshi(transactionData[i].amount));
							var Paystatus={
								Status:1,
								CountDown:1
							};
						totalUnspentSign += transactionData[i].amount;
					}
					
					var txhex = txb.build().toHex();
					console.log("Transaction HEX is - ", txhex);
					coreclient.sendRawTransaction(txhex).then((help) => console.log("Transaction Detail: ", help));
					console.log(totalUnspentSign);
					console.log(lasterror);
				}


			}
			
			else {
				console.log("Bitcoin error:  No unspent transactions present")
			}

	}

sentxb();