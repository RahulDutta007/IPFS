const express= require('express');
const fs= require('fs');
const Web3 = require('web3');
const Datastore = require('nedb'); 
//const popup= require('popups');

const app = express();
const database = new Datastore('database.db');
database.loadDatabase();

app.listen(8000, () => console.log('listening to port 8000'));
app.use(express.static('website'));
app.use(express.json());

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));


//module.exports = function(argument) {

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

    var abiAuthorx = [
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

  //Authorx MIGRATE
  var addr = "0xc267e6d7C953130DF936a0C2693eDB933c352dc2";
  authorxInstance = new web3.eth.Contract(abiAuthorx, addr);

  async function mains(argument) {

    var ad = await web3.eth.getAccounts();
    web3.eth.defaultAccount = ad[0];

    

    //START APP
    app.get('/', async(req, res) => {
      res.sendfile('LOGIN.html');
      console.log("start");
      var domainName = req.body.domainName;
      var addDomain= await authorxInstance.methods.addNewDomain("ML").send({from:ad[0]});
      console.log(addDomain);
      console.log("last");
    });
/*
    //DON'T HAVE AN ACCOUNT
    app.get('AUTHOR_REGISTRATION.html', (req, res) => {
      res.sendfile('AUTHOR_REGISTRATION.html');
    });

    //DOMAIN REGISTRATION
    app.post('/DOMAIN_REGISTRATION', async (req, res) => {
      console.log("start");
      var domainName = req.body.domainName;
      var addDomain= await authorxInstance.methods.addNewDomain("ML").send({from:ad[0]});
      console.log(addDomain);
      console.log("last");
    });
*/
    /*
    //AUTHOR REGISTRATION
    app.post('/AUTHOR_REGISTRATION', async (req, res) => {
      var authorEthPubKey = req.body.ethPubKey;
      var authorName = req.body.name;
      var authorInst = req.body.institution;
      var authorDomain = req.body.domain;
      var authorPassword = req.body.password;
      var dir = 'USER_DATA/AUTHOR/'+authorEthPubKey;
      if(fs.existsSync(dir)) {
        res.json({
          status: 'already_exist'
        });
      }
      else {
        fs.mkdirSync(dir);
        var authorData = JSON.stringify({authorName, authorPassword}, null, 2);
        var path = dir+'/password.json';
        fs.writeFileSync(path, authorData, 'utf8');
        await authorInstance.methods.registerAuthor(authorEthPubKey, authorName, authorInst).send({from:ad[0]});
        await authorInstance.methods.registerAuthorDomain(authorEthPubKey, authorDomain).send({from:ad[0]});
        res.json({
          status: 'success'
        });
        var v = await authorInstance.methods.getAuthorDetail(authorEthPubKey).call({from:ad[0]});
        console.log(v);
      }
    //  var v = await authorInstance.methods.getAuthorDetail(authorEthPubKey).call({from:ad[0]});
    //  console.log(v);
    });

    //AUTHOR LOGIN
    app.post('/AUTHOR_LOGIN', async (req, res) => {
      var ethPubKey = req.body.ethPubKey;
      var password = req.body.password;
      var dir = 'USER_DATA/AUTHOR/'+ethPubKey;
      if(fs.existsSync(dir)) {
        var detail = JSON.parse(fs.readFileSync(dir+'/password.json'));
        if (detail.authorPassword == password) {
          res.json({
            status: 'success',
            name: detail.authorName
          });
        }
        else {
          res.json({
            status: 'wrong_password'
          });
        }
      }
      else {
        res.json({
          status: 'unregistered_key'
        });
      }
    });

  //SUBMIT MANUSCRIPT METADATA 
    app.post('/SUBMIT_MANUSCRIPT_METADATA', async(req, res) => {
      await authorInstance.methods.addManuscriptMetadata(req.body.primaryAuthor, req.body.title, req.body.abstruct, req.body.journalOfInterest).send({from:ad[0]}); 

      res.json ({
        status: 'true'
      });
    });*/
  //end of mains
  };

  mains();
