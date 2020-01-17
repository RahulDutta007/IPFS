pragma solidity >=0.4.19 <0.6.0;
pragma experimental ABIEncoderV2;
import "./Authorx.sol";

contract Journal
{
	struct JournalInfo {
		address journal;
		string publisher;
		string name;
		string domain;
		string IF;
		string fiveYearIF;
		string scopus;
		string averageReviewSpeed;
		mapping(address => AuthorDetail) authorDetail;
	}

	struct Manuscript {
		string title;
		string submittingAuthor;
		address primaryAuthor;
		address[] coAuthors;
		//string status;
		address peerOfInterest;
		string manuscriptStatus;
	}

	struct AuthorDetail {
		string name;
		string institution;
		string[] authorDomain;
		string[] subscribedDomain;
		string[] registeredConference;
		string[] registeredJournals;
		uint256 manuscriptID;
		mapping(uint256 => Manuscript) manuscript;
	}

	event JournalRegistration(address _journalAddress, string _publisher, string _name, string _domain, string _IF, string _fiveYearIF, string scopus, string _averageReviewSpeed);
	event JournalPaperSubmission(address _journalAddress, string _name, string _institution, string _manuscriptID, string _title, string _primaryAuthor, string _manuscriptStatus);
	mapping (address => JournalInfo) journalInfo;
	mapping(uint256 => Manuscript) manuscript;
	
	Authorx authorx;
	constructor(Authorx _authorx) public{
		authorx = _authorx;
	}

	function registerJournal(address _journalAddress, string memory _publisher, string memory _name, string memory _domain, string memory _IF, string memory _fiveYearIF, string memory _scopus, string memory _averageReviewSpeed) public {
		journalInfo[_journalAddress].journal = _journalAddress;
		journalInfo[_journalAddress].publisher = _publisher;
		journalInfo[_journalAddress].name = _name;
		journalInfo[_journalAddress].domain = _domain;
		journalInfo[_journalAddress].IF = _IF;
		journalInfo[_journalAddress].fiveYearIF = _fiveYearIF;
		journalInfo[_journalAddress].scopus = _scopus;
		journalInfo[_journalAddress].averageReviewSpeed = _averageReviewSpeed;

		emit JournalRegistration(_journalAddress, _publisher, _name, _domain, _IF, _fiveYearIF, _scopus, _averageReviewSpeed);
	}

	function getRegisteredJournal(address _journalAddress) public view returns(address, string memory, string memory, string memory, string memory, string memory) {//, string memory, string memory) {
		return (journalInfo[_journalAddress].journal, journalInfo[_journalAddress].publisher, journalInfo[_journalAddress].name, journalInfo[_journalAddress].domain, journalInfo[_journalAddress].IF, journalInfo[_journalAddress].fiveYearIF);//, journalInfo[_journalAddress].scopus, journalInfo[_journalAddress].averageReviewSpeed);
	}

	function addSubmittedPaper(address _journalAddress, address _authorAddr, uint256 _paperID) public {
		//journalInfo[_journalAddress].authorDetail[_authorAddr].name = authorx.authorDetail[_authorAddr].name;
		//journalInfo[_journalAddress].authorDetail[_authorAddr].institution = authorx.authorDetail[_authorAddr].institution;
		//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptID = authorx.authorDetail[_authorAddr].manuscriptID;
		//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].title = authorx.authorDetail[_authorAddr].manuscript[_paperID].title;
		//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].primaryAuthor = authorx.authorDetail[_authorAddr].manuscript[_paperID].primaryAuthor;
		//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].manuscriptStatus = "WITH EDITOR";
		//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest = authorx.authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest;

		//emit JournalPaperSubmission(journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest, journalInfo[_journalAddress].authorDetail[_authorAddr].name, journalInfo[_journalAddress].authorDetail[_authorAddr].institution, journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptID, journalInfo[_journalAddress].authorDetail[_authorAddr].title, journalInfo[_journalAddress].authorDetail[_authorAddr].primaryAuthor, journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptStatus);
	}

	function getSubmittedPaper(address _journalAddress, address _authorAddr, uint256 _paperID) public view returns( uint256 ) {
		return (//journalInfo[_journalAddress].authorDetail[_authorAddr].name, 
			//journalInfo[_journalAddress].authorDetail[_authorAddr].institution, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptID);
			//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].title, 
			//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].primaryAuthor, 
			//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].manuscriptStatus, 
			//journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest);
	} 

	function setManuscriptStatus(address _journalAddress, address _authorAddr, uint256 _manuscriptID, string memory _manuscriptStatus) public {
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptStatus = _manuscriptStatus;
		authorx.setManuscriptStatus(_authorAddr, _manuscriptID, _manuscriptStatus);
	}

	function getManuscriptStatus(address _journalAddress, address _authorAddr, uint256 _manuscriptID) public view returns(string memory) {
		return(journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptStatus);
	} 
}