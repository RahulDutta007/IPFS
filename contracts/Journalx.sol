pragma solidity >=0.4.19 <0.6.0;
pragma experimental ABIEncoderV2;
import "./Authorx.sol";

contract Journalx
{
	struct JournalInfo {
		address journal;
		string publisher;
		string name;
		string domain;
		string IF;
		string scopus;
		Editor editor;
		bool whitelist;
		mapping(address => AuthorDetail) authorDetail;
		mapping(address => Reviewer) reviewer;
	}

	struct Editor{
		address editorAddr;
		string name;
		string institution;
		string about;
		string mail;
		bool whitelist;
	}

	struct Reviewer {
		address reviewerAddr;
		string name;
		uint256 reviewQuality;
		uint256 theftAllegation;
		bool whitelist;
	}

	struct Manuscript {
		string title;
		string submittingAuthor;
		address primaryAuthor;
		address[] coAuthors;
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

	event JournalRegistration(address _journalAddress, string _publisher, string _name, string _domain, string _IF, string scopus);
	event JournalPaperSubmission(address _journalAddress, string _name, string _institution, uint256 _manuscriptID, string _title, address _primaryAuthor, string _manuscriptStatus);
	event ManuscriptStatusUpdate(address _journalAddress, address _authorAddr, uint256 _manuscriptID, string _manuscriptStatus);
	event EditorRegistered(address _editorAddr, address _peer);
	event EditorRegistration(address _journalAddress, address _editorAddress, string _mail, string _institution, string _about);
	event ReviewerRegistration(address _journalAddress, address _reviewerAddress, string _name, uint256 _reviewQuality, uint256 _theftAllegation);	

	mapping (address => JournalInfo) journalInfo;
	mapping(uint256 => Manuscript) manuscript;
	
	Authorx authorx;
	constructor(Authorx _authorx) public{
		authorx = _authorx;
	}

	modifier onlyJournal() {
		require(journalInfo[msg.sender].whitelist);
		_;
	}

	modifier onlyEditor(address _journalAddress) {
		require(journalInfo[_journalAddress].editor.editorAddr == msg.sender);
		_;
	} 


	function registerJournal(address _journalAddress, string memory _publisher, string memory _name, string memory _domain, string memory _IF, string memory _scopus) public {
		journalInfo[_journalAddress].journal = _journalAddress;
		journalInfo[_journalAddress].publisher = _publisher;
		journalInfo[_journalAddress].name = _name;
		journalInfo[_journalAddress].domain = _domain;
		journalInfo[_journalAddress].IF = _IF;
		journalInfo[_journalAddress].scopus = _scopus;
		journalInfo[_journalAddress].whitelist = true;

		emit JournalRegistration(_journalAddress, _publisher, _name, _domain, _IF, _scopus);
	}

	function getJournalAddress(address _journalAddress) public view returns(address) {
		return journalInfo[_journalAddress].journal;
	}

	function getJournalPublisher(address _journalAddress) public view returns(string memory) {
		return journalInfo[_journalAddress].publisher;
	}

	function getJournalName(address _journalAddress) public view returns(string memory) {
		return journalInfo[_journalAddress].name;
	}

	function getJournalDomain(address _journalAddress) public view returns(string memory) {
		return journalInfo[_journalAddress].domain;
	}

	function getJournalIF(address _journalAddress) public view returns(string memory) {
		return journalInfo[_journalAddress].IF;
	}

	function getJournalScopus(address _journalAddress) public view returns(string memory) {
		return journalInfo[_journalAddress].scopus;
	}

	function addSubmittedPaper(address _journalAddress, address _authorAddr, uint256 _paperID) public {
		journalInfo[_journalAddress].authorDetail[_authorAddr].name = authorx.getAuthorName(_authorAddr);
		journalInfo[_journalAddress].authorDetail[_authorAddr].institution = authorx.getAuthorInstitution(_authorAddr);
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptID = authorx.getManuscriptID(_authorAddr, _paperID);
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].title = authorx.getManuscriptTitle(_authorAddr, _paperID);
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].primaryAuthor = authorx.getManuscriptPrimaryAuthor(_authorAddr, _paperID);
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].manuscriptStatus = "WITH SUBMITTED";
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest = authorx.getManuscriptPeerOfInterest(_authorAddr, _paperID);

		emit JournalPaperSubmission(journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].name, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].institution, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptID, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].title, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].primaryAuthor, 
			journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].manuscriptStatus);
	}

	function getSubmittedPaperPeerOfInterest(address _journalAddress, address _authorAddr, uint256 _paperID) public view returns(address) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].peerOfInterest); 
	}

	function getSubmittedPaperName(address _journalAddress, address _authorAddr) public view returns(string memory) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].name); 
	}

	function getSubmittedPaperInstitution(address _journalAddress, address _authorAddr) public view returns(string memory) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].institution); 
	}

	function getSubmittedPaperManuscriptID(address _journalAddress, address _authorAddr) public view returns(uint256) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].manuscriptID); 
	}

	function getSubmittedPaperTitle(address _journalAddress, address _authorAddr, uint256 _paperID) public view returns(string memory) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].title); 
	}

	function getSubmittedPaperPrimaryAuthor(address _journalAddress, address _authorAddr, uint256 _paperID) public view returns(address) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].primaryAuthor); 
	}

	function getSubmittedManuscriptStatus(address _journalAddress, address _authorAddr, uint256 _paperID) public view returns(string memory) {
		return (journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_paperID].manuscriptStatus); 
	}

	function setManuscriptStatus(address _journalAddress, address _authorAddr, uint256 _manuscriptID, string memory _manuscriptStatus) public onlyEditor(_journalAddress){
		journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptStatus = _manuscriptStatus;
		authorx.setManuscriptStatus(_authorAddr, _manuscriptID, _manuscriptStatus);
		emit ManuscriptStatusUpdate(_journalAddress, _authorAddr, _manuscriptID, _manuscriptStatus);
	}

	function getManuscriptStatus(address _journalAddress, address _authorAddr, uint256 _manuscriptID) public view returns(string memory) {
		return(journalInfo[_journalAddress].authorDetail[_authorAddr].manuscript[_manuscriptID].manuscriptStatus);
	}

	function registerEditor(address _journalAddress, address _editorAddress, string memory _mail, string memory _institution, string memory _about) public onlyJournal() {
		journalInfo[_journalAddress].editor.editorAddr = _editorAddress;
		journalInfo[_journalAddress].editor.mail = _mail;
		journalInfo[_journalAddress].editor.institution = _institution;
		journalInfo[_journalAddress].editor.about = _about;
		journalInfo[_journalAddress].editor.whitelist = true;

		emit EditorRegistration(_journalAddress, _editorAddress, _mail, _institution, _about);
	}

	function getEditorAddr(address _journalAddress) public view returns(address) {
		return (journalInfo[_journalAddress].editor.editorAddr);
	}

	function getEditorMail(address _journalAddress) public view returns(string memory) {
		return (journalInfo[_journalAddress].editor.mail);
	}	

	function getEditorInstitution(address _journalAddress) public view returns(string memory) {
		return (journalInfo[_journalAddress].editor.institution);
	}

	function getEditorAbout(address _journalAddress) public view returns(string memory) {
		return (journalInfo[_journalAddress].editor.about);
	}

	function registerReviewer(address _journalAddress, address _reviewerAddress, string memory _name) public onlyEditor(_journalAddress) {
		journalInfo[_journalAddress].reviewer[_reviewerAddress].reviewerAddr = _reviewerAddress;
		journalInfo[_journalAddress].reviewer[_reviewerAddress].name = _name;
		journalInfo[_journalAddress].reviewer[_reviewerAddress].whitelist = true;
		journalInfo[_journalAddress].reviewer[_reviewerAddress].reviewQuality = 0;
		journalInfo[_journalAddress].reviewer[_reviewerAddress].theftAllegation = 0;

		emit ReviewerRegistration(_journalAddress, _reviewerAddress, _name, 0, 0);
	}

	function getReviewerAddress(address _journalAddress, address _reviewerAddress) public view returns(address) {
		return (journalInfo[_journalAddress].reviewer[_reviewerAddress].reviewerAddr);
	}

	function getReviewerName(address _journalAddress, address _reviewerAddress) public view returns(string memory) {
		return (journalInfo[_journalAddress].reviewer[_reviewerAddress].name);
	}

	function getReviewerReviewQuality(address _journalAddress, address _reviewerAddress) public view returns(uint256) {
		return (journalInfo[_journalAddress].reviewer[_reviewerAddress].reviewQuality);
	}

	function getReviewerTheftAllegation(address _journalAddress, address _reviewerAddress) public view returns(uint256) {
		return (journalInfo[_journalAddress].reviewer[_reviewerAddress].theftAllegation);
	}

	function assignReviewer(address _journalAddress, address _reviewerAddress, uint256 _manuscriptID, address _authorAddr) public onlyEditor(_journalAddress) {

	}

}