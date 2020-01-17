pragma solidity >=0.4.19 <0.6.0;
pragma experimental ABIEncoderV2;
contract Authorx {
	
	mapping(uint256 => string) domainOfDomain;
	uint256 domainID = 0;

	struct Manuscript {
		address submittingAuthor;
		string title;
		address primaryAuthor;
		uint256 manuscriptID;
		address[] coAuthors;
		address peerOfInterest;
		string manuscriptStatus;
	}
	

	struct AuthorDetail {
		string name;
		string institution;
		string[] authorDomain;
		string[] subscribedDomain;
		address[] registeredConference;
		address[] registeredJournals;
		mapping(uint256 => Manuscript) manuscript;
	}

	event AuthorRegistration(address _authorAddr, string _name, string _institution);
	event PaperSubmission(address _submittingAuthor, string _title, address _primaryAuthorAddr, uint256 _manuscriptID, address _peerOfInterest);
	event NewDomain(uint256 _domainID, string _domain);
	event NewAuthorDomain(address _authorAddr, uint256 _domainID, string _domainName);
	event PrimaryAuthorAdded(address  _authorAddr, address  _primaryAuthorAddr, uint256 _manuscriptID);
	event CoAuthorAdded(address _authorAddr, address _coAuthor, uint256 _manuscriptID);
	event DomainSubscribed(address _authorAddr, uint256 _domainID, string _domainName);
	event JournalRegistered(address _authorAddr, address  _peerOfInterest);

	mapping (address => AuthorDetail) authorDetail;

	constructor() public {
		domainID = 0;
	}

	

	function registerAuthorInit(address _authorAddr, string memory _name, string memory _institution) public {
		authorDetail[_authorAddr].name = _name;
		authorDetail[_authorAddr].institution = _institution;
		emit AuthorRegistration(_authorAddr, _name, _institution);
	}

	function getAuthorName(address _authorAddr) public view returns(string memory) {
		return authorDetail[_authorAddr].name;
	}

	function getAuthorInstitution(address _authorAddr) public view returns(string memory) {
		return authorDetail[_authorAddr].institution;
	}


	function addNewDomain(string memory _domainName) public {
		domainOfDomain[domainID] = _domainName;
		domainID = domainID + 1;
		emit NewDomain(domainID, _domainName);
	}

	function getLastDomainID() public view returns (uint256) {
		return domainID;
	}

	function addAuthorDomain(address _authorAddr, uint256 _domainID) public {
		authorDetail[_authorAddr].authorDomain.push(domainOfDomain[_domainID]);
		emit NewAuthorDomain(_authorAddr,_domainID, domainOfDomain[_domainID] );
	}

	function getAuthorDomain(address _authorAddr) public view returns(string[] memory) {
		return authorDetail[_authorAddr].authorDomain;
	}

	function subscribeDomain(address _authorAddr, uint256 _domainID) public {
		authorDetail[_authorAddr].subscribedDomain.push(domainOfDomain[_domainID]);

		emit DomainSubscribed(_authorAddr, _domainID, domainOfDomain[_domainID]);
	}

	function getSubscribedDomain(address _authorAddr) public view returns(string[] memory) {
		return authorDetail[_authorAddr].subscribedDomain;
	}

	function addManuscriptMetadata(address _authorAddr, address _primaryAuthorAddr, uint256 _manuscriptID, string memory _title, address _peerOfInterest) public {
		authorDetail[_authorAddr].manuscript[_manuscriptID].submittingAuthor = _authorAddr;
		authorDetail[_authorAddr].manuscript[_manuscriptID].title = _title;
		authorDetail[_authorAddr].manuscript[_manuscriptID].peerOfInterest = _peerOfInterest;
		authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptID = _manuscriptID;
		authorDetail[_authorAddr].manuscript[_manuscriptID].primaryAuthor = _primaryAuthorAddr;

		emit PaperSubmission(_authorAddr, _title, _primaryAuthorAddr, _manuscriptID, _peerOfInterest);
	}

/*	function getManuscriptMetadata(address _authorAddr, uint256 _manuscriptID) public view returns(address, string memory, string memory, uint256, address) {
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].submittingAuthor,
			    authorDetail[_authorAddr].manuscript[_manuscriptID].title,  
				authorDetail[_authorAddr].manuscript[_manuscriptID].primaryAuthor,
				authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptID,
				authorDetail[_authorAddr].manuscript[_manuscriptID].peerOfInterest);
	}			
*/
	function getManuscriptSubmittingAuthor(address _authorAddr, uint256 _manuscriptID) public view returns(address) {
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].submittingAuthor);
	}

	function getManuscriptTitle(address _authorAddr, uint256 _manuscriptID) public view returns(string memory) {
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].title);
	}

	function getManuscriptPrimaryAuthor(address _authorAddr, uint256 _manuscriptID) public view returns(address){
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].primaryAuthor);		
	}

	function getManuscriptID(address _authorAddr, uint256 _manuscriptID) public view returns(uint256) {
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptID);
	}

	function getManuscriptPeerOfInterest(address _authorAddr, uint256 _manuscriptID) public view returns(address) {
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].peerOfInterest);
	} 

	function addCoAuthor(address _authorAddr, address _coAuthor, uint256 _manuscriptID) public {
		authorDetail[_authorAddr].manuscript[_manuscriptID].coAuthors.push(_coAuthor);	
		emit CoAuthorAdded(_authorAddr, _coAuthor, _manuscriptID);
	}

	function getCoAuthor(address _authorAddr, uint256 _manuscriptID) public view returns(address[] memory) {
		return authorDetail[_authorAddr].manuscript[_manuscriptID].coAuthors;
	}

	function setManuscriptStatus(address _authorAddr, uint256 _manuscriptID, string memory _manuscriptStatus) public {
		authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptStatus = _manuscriptStatus;
	}

	function getManuscriptStatus(address _authorAddr, uint256 _manuscriptID) public view returns(string memory) {
		return (authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptStatus);
	}

	function registerJournal(address _authorAddr, address _peerOfInterest) public {
		authorDetail[_authorAddr].registeredJournals.push(_peerOfInterest);
		emit JournalRegistered(_authorAddr, _peerOfInterest);
	}

}