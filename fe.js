var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
module.exports = function(callback) {
	var abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_institution",
          "type": "string"
        }
      ],
      "name": "AuthorRegistration",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_coAuthor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "CoAuthorAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_domainID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_domainName",
          "type": "string"
        }
      ],
      "name": "DomainSubscribed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_domainID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_domainName",
          "type": "string"
        }
      ],
      "name": "NewAuthorDomain",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_domainID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_domain",
          "type": "string"
        }
      ],
      "name": "NewDomain",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_submittingAuthor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_primaryAuthorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_peerOfInterest",
          "type": "address"
        }
      ],
      "name": "PaperSubmission",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_primaryAuthorAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "PrimaryAuthorAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_institution",
          "type": "string"
        }
      ],
      "name": "registerAuthorInit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_domainName",
          "type": "string"
        }
      ],
      "name": "addNewDomain",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getLastDomainID",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_domainID",
          "type": "uint256"
        }
      ],
      "name": "addAuthorDomain",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        }
      ],
      "name": "getAuthorDomain",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_domainID",
          "type": "uint256"
        }
      ],
      "name": "subscribeDomain",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        }
      ],
      "name": "getSubscribedDomain",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_primaryAuthorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_title",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_peerOfInterest",
          "type": "address"
        }
      ],
      "name": "addManuscriptMetadata",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getManuscriptSubmittingAuthor",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getManuscriptTitle",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getManuscriptPrimaryAuthor",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getManuscriptID",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getManuscriptPeerOfInterest",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_coAuthor",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "addCoAuthor",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getCoAuthor",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_manuscriptStatus",
          "type": "string"
        }
      ],
      "name": "setManuscriptStatus",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_authorAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_manuscriptID",
          "type": "uint256"
        }
      ],
      "name": "getManuscriptStatus",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

	var addr = "0x00ff7DAd772A302DdE5d776D546d613A5DA47cAB";
	authorIns = new web3.eth.Contract(abi, addr);

	 async function mains(argument) {
		  var ad = await web3.eth.getAccounts();
		  web3.eth.defaultAccount = ad[0];
		  console.log(ad[0]);
		  var c = await authorIns.methods.registerAuthorInit(ad[5],"Rahul", "CU" ).send({from:ad[0]});
		  var d = c;
		  console.log(d);
		//console.log(ad[0])	;
	  }

	mains();
}