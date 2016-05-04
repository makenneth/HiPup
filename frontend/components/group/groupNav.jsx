var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState'),
		NewEventForm = require('../events/newEventForm'),
		EventFormStyle = require('../../modal/eventFormStyle'),
		EditGroupForm = require('./editGroupForm'),
		Modal = require('react-modal'),
		SuccessModalStyle = require('../../modal/successModalStyle'),
		SuccessMessage = require('../../mixin/successMessage');

var GroupNav = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			eventFormIsOpen: false,
			editFormIsOpen: false,
			successModalIsOpen: false,
			message: ""
		};
	},
	componentDidMount: function() {
	},
	adminNav: function() {
		if (this.adminCheck()){
			return (<ul className="admin-group-nav">
								<li><a onClick={this.openEditModal}>Edit Group</a></li>
								<li><a onClick={this.openModal}>Create Event</a></li>
							</ul>);
		} else {
			return "";
		}
	},
	openModal: function() {
		this.setState({eventFormIsOpen: true});
	},
	closeModal: function() {
		this.setState({eventFormIsOpen: false});
	},
	openEditModal: function() {
		this.setState({editFormIsOpen: true});
	},
	closeEditModal: function() {
		this.setState({editFormIsOpen: false});
	},
	openSuccessModal: function(message) {
		this.setState({successModalIsOpen: true, message: message});
	},
	closeSuccessModal: function() {
		this.setState({successModalIsOpen: false, message: ""});
	},
	showSuccessMessage: function(){
		this.closeEditModal();
		this.openSuccessModal();
	},
	_setMessage: function(message){
		this.state.message = message;
	},
	adminCheck: function() {
		return this.state.currentUser && this.props.group.creator_id === this.state.currentUser.id;
	},
	render: function() {
		var id = this.props.group.id,
				title = this.props.group.title;
		return (
			<div>
				<div>
					<div className="nav-div cf">
						<h3>{title}</h3>
					</div>
						<ul className="group-nav">
							<li><a href={"#/"}>Home</a></li>
							<li><a href={"#/groups/" + id + "/home"}>Detail</a></li>
							<li><a href={"#/groups/" + id + "/members"}>Members</a></li>
							<li><a href={"#/groups/" + id + "/photos"}>Photos</a></li>
						</ul>
						{this.adminNav()}
						{this.props.joinButtons}
				</div>
				<Modal isOpen={this.state.eventFormIsOpen} style={EventFormStyle} 
							onRequestClose={this.closeModal}>
					<NewEventForm closeModal={this.closeModal} groupId={id}/>
				</Modal>
				<Modal isOpen={this.state.editFormIsOpen} style={EventFormStyle} 
							onRequestClose={this.closeEditModal}>
					<EditGroupForm closeModal={this.closeEditModal} groupId={id}
								setMessage={this._setMessage} showSuccess={this.showSuccessMessage}/>
				</Modal>
				<Modal isOpen={this.state.successModalIsOpen} style={SuccessModalStyle}
								onRequestClose={this.closeSuccessModal}>
					<SuccessMessage message={this.state.message} 
									closeModal={this.closeSuccessModal} />
				</Modal>

			</div>
		);
	}

});

module.exports = GroupNav;