var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		Modal = require('react-modal'),
		MemberProfile = require('./memberProfile');

var GroupMembers = React.createClass({
	getInitialState: function() {
		var group = this.props.group,
				participant = group ? group.participants : [];
		return {
			participants: participant,
			modalIsOpen: false
		};
	},
	openModal: function() {
		this.setState({modalIsOpen: true});
	},
	closeModal: function() {
		this.setState({modalIsOpen: false});
	},
	componentDidMount: function() {
		if (this.state.participants !== undefined && !this.state.participants.length){
			var group = GroupStore.find(this.props.params.postId);
			this.setState({participants: group.participants});
		}
	},
	render: function() {
		var participants = this.props.group.participants || [];
		return (
			<div>
				<h1>Group Members</h1>
				{
					participants.map(function(participant){
						return <li onClick={ this.openModal.bind(null, participant.id) } 
												key={ participant.id }>
											{participant.name}
									  </li>;
					})
				}
				<Modal isOpen={this.state.modalIsOpen}
							 onRequestClose={this.closeNavModal}
							 style={NavStyle}>
						<MemberProfile id={} closeModal={this.closeModal}/>
				</Modal>
			</div>
		);
	}

});

module.exports = GroupMembers;