const React = require('react');
const GroupStore = require('../../stores/groupStore');
const Modal = require('react-modal');
const MemberProfile = require('./memberProfile');
const MemberProfileStyle = require('../../modal/memberProfile');

const GroupMembers = React.createClass({
	getInitialState: function() {
		const group = this.props.group;
		const participant = group ? group.participants : [];
		return {
			participants: participant,
			modalIsOpen: false
		};
	},
	openModal: function(id) {
		this.setState({ modalIsOpen: true, selectedUserId: id });
	},
	closeModal: function() {
		this.setState({ modalIsOpen: false });
	},
	componentDidMount: function() {
		if (this.state.participants !== undefined && !this.state.participants.length) {
			const group = GroupStore.find(this.props.postId);
			if (group) {
				this.setState({ participants: group.participants });
			}
		}
	},
	render: function() {
		const participants = this.props.group.participants || [];
		return (
			<div>
				<h3>Members:</h3>
					<ul className="member-list">
					{
						participants.slice(0, 8).map((participant) => {
							return (<li
								onClick={this.openModal.bind(null, participant.id) }
								 key={participant.id }>
								<div
									className="mini-pic"
									style={{
										backgroundImage: "url(" + participant.image_url + ")",
										backgroundSize: "cover"
									}}></div>
								<div className="mini-pic-name">{participant.name}</div>
						  </li>);
						})
					}
				</ul>
				<Modal
					isOpen={this.state.modalIsOpen}
				  onRequestClose={this.closeModal}
	 			  style={MemberProfileStyle}>
					<MemberProfile
						userId={this.state.selectedUserId}
					  closeModal={this.closeModal}
				  />
				</Modal>
			</div>
		);
	}

});

module.exports = GroupMembers;
