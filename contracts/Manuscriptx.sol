pragma solidity >=0.4.19 <0.6.0;
pragma experimental ABIEncoderV2;
contract Manuscriptx {
	struct PseudoPeer {
		address editor;
		bool whitelist;
	}

	struct PseudoAuthor {
		mapping(uint256 => PseudoManuscript) status;	
	}

	struct PseudoManuscript {
		string manuscriptStatus;
	}

	mapping (address => PseudoPeer) editor;
	mapping (address => PseudoAuthor) author;

	event EditorRegistered(address _editorAddr, address _peer);
	event ManuscriptStatusUpdated(address _authorAddr, uint _manuscriptID, string manuscriptStatus);

	modifier onlyEditor() {
		require(editor[msg.sender].whitelist);
		_;
	} 

	function registerEditor(address _editorAddr, address _peer) public {
		editor[_editorAddr].editor = _editorAddr;
		editor[_editorAddr].whitelist = true;
		emit EditorRegistered(_editorAddr, _peer);
	}


	function setManuscriptStatus(address _authorAddr, uint _manuscriptID, string memory _manuscriptStatus) public onlyEditor() {
		author[_authorAddr].status[_manuscriptID].manuscriptStatus = _manuscriptStatus;
		emit ManuscriptStatusUpdated(_authorAddr, _manuscriptID, _manuscriptStatus);

	}

	function getManuscriptStatus(address _authorAddr, uint256 _manuscriptID) public view returns(string memory) {
		return (author[_authorAddr].status[_manuscriptID].manuscriptStatus);
	}
}