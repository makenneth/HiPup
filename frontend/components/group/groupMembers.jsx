var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		Modal = require('react-modal'),
		MemberProfile = require('./memberProfile'),
		MemberProfileStyle = require('../../modal/memberProfile');

var GroupMembers = React.createClass({
	getInitialState: function() {
		var group = this.props.group,
				participant = group ? group.participants : [];
		return {
			participants: participant,
			modalIsOpen: false
		};
	},
	openModal: function(id) {
		this.setState({modalIsOpen: true, selectedUserId: id});
	},
	closeModal: function() {
		this.setState({modalIsOpen: false});
	},
	componentDidMount: function() {
		if (this.state.participants !== undefined && !this.state.participants.length){
			var group = GroupStore.find(this.props.postId);
			if (group) this.setState({participants: group.participants});
		}
	},
	render: function() {
		var participants = this.props.group.participants || [];
		return (
			<div>
				<h3>Members:</h3>
					<ul className="member-list">
					{
						participants.slice(0, 8).map(function(participant){
							return (<li onClick={ this.openModal.bind(null, participant.id) }
													 key={ participant.id }>
												<div className="mini-pic" style={{backgroundImage: "url(" + participant.image_url + ")",
																backgroundSize: "cover"}}></div>
												<div className="mini-pic-name">{participant.name}</div>
										  </li>);
						}.bind(this))
					}
				</ul>
				<Modal isOpen={this.state.modalIsOpen}
							 onRequestClose={this.closeModal}
							 style={MemberProfileStyle}>
						<MemberProfile userId={this.state.selectedUserId}
													 closeModal={this.closeModal}/>
				</Modal>
			</div>
		);
	}

});

module.exports = GroupMembers;
