var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState'),
		NewEventForm = require('../events/newEventForm'),
		EventFormStyle = require('../../modal/eventFormStyle'),
		Modal = require('react-modal'),
		SuccessModalStyle = require('../../modal/successModalStyle'),
		SuccessMessage = require('../../mixin/successMessage'),
		ClientActions = require('../../actions/clientActions'),
		HashHistory = require('react-router').hashHistory,
		GroupStore = require('../../stores/groupStore'),
		Confirmation = require('../../mixin/confirmation'),
		ConfirmationStyle = require('../../modal/confirmationStyle');

var GroupNav = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			eventFormIsOpen: false,
			editFormIsOpen: false,
			successModalIsOpen: false,
			message: "",
			confirmIsOpen: false,
			editMode: false,
			title: ""
		};
	},
	componentDidMount: function() {
	},
	adminNav: function() {
		if (this.adminCheck()){
			return (<ul className="admin-group-nav">
								<li><a onClick={this.openModal}>Create Event</a></li>
								<li><a onClick={this.deleteGroup}>Delete Group</a></li>
							</ul>);
		} else {
			return "";
		}
	},
	deleteGroup: function(){
		if (this.state.currentUser){
			this.setState({confirmIsOpen: true});
		}
	},
	forSureDeleteGroup: function(){
		ClientActions.removeGroup(this.props.group.id);
		this.closeConfirmModal();
		HashHistory.push("/");
	},
	closeConfirmModal: function(){
		this.setState({confirmIsOpen: false});
	},
	openModal: function() {
		this.setState({eventFormIsOpen: true});
	},
	closeModal: function() {
		this.setState({eventFormIsOpen: false});
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
	startEditMode: function(){
		this.setState({editMode: true, title: this.props.group.title})
	},
	endEditMode: function(){
		this.setState({editMode: false});
	},
	saveChange: function(){
		ClientActions.updateGroup({
				title: this.state.title
			}, this.props.group.id);
		this.endEditMode();
	},
	updateTitle: function(e){
		e.preventDefault();
		this.setState({title: e.target.value});
	},
	title: function() {
		if (!this.adminCheck()){
				return	(<div className="nav-div">
						<h3>{this.props.group.title}</h3>
					</div>);
		} else {
			var titleBox, icon;
			if (this.state.editMode){
				titleBox = <input type="text" value={this.state.title} onChange={this.updateTitle}/> ;
				icon = (<div className="edit" onClick={this.saveChange}>✓</div>);
			} else {
				titleBox = <h3>{this.props.group.title}</h3>;
				icon = (<div className="edit" onClick={this.startEditMode}>✎</div>);
			}
			return (<div className="nav-div cf">
									<div className="title-container">
											{icon}
											{titleBox}
											</div>
										</div>);
		}
	},
	render: function() {
		var id = this.props.group.id,
				title = this.props.group.title;
		return (
			<div>
				<div style={{position: "relative"}}>
					{this.title()}
					<div className="group-nav-container">
						<ul className="group-nav">
							<li><a href={"#/"}>Home</a></li>
							<li><a href={"#/groups/" + id + "/home"}>Detail</a></li>
							<li><a href={"#/groups/" + id + "/photos"}>Photos</a></li>
						</ul>
						{this.adminNav()}
					</div>
					{this.props.joinButtons}
				</div>
				<Modal isOpen={this.state.eventFormIsOpen} style={EventFormStyle}
							onRequestClose={this.closeModal}>
					<NewEventForm closeModal={this.closeModal} groupId={id}/>
				</Modal>
				<Modal isOpen={this.state.successModalIsOpen} style={SuccessModalStyle}
								onRequestClose={this.closeSuccessModal}>
					<SuccessMessage message={this.state.message}
									closeModal={this.closeSuccessModal} />
				</Modal>
				<Modal isOpen={this.state.confirmIsOpen} style={ConfirmationStyle}
							onRequestClose={this.closeConfirmModal}>
							<Confirmation confirm={this.forSureDeleteGroup} deny={this.closeConfirmModal}/>
				</Modal>
			</div>
		);
	}

});

module.exports = GroupNav;
