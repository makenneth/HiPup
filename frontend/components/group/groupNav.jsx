const React = require('react');
const CurrentUserState = require('../../mixin/currentUserState');
const NewEventForm = require('../events/newEventForm');
const EventFormStyle = require('../../modal/eventFormStyle');
const Modal = require('react-modal');
const SuccessModalStyle = require('../../modal/successModalStyle');
const SuccessMessage = require('../../mixin/successMessage');
const ClientActions = require('../../actions/clientActions');
const HashHistory = require('react-router').hashHistory;
const Confirmation = require('../../mixin/confirmation');
const ConfirmationStyle = require('../../modal/confirmationStyle');

const GroupNav = React.createClass({
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

	adminNav: function() {
		return (this.adminCheck() && <ul className="admin-group-nav">
			<li><a onClick={this.openModal}>Create Event</a></li>
			<li><a onClick={this.deleteGroup}>Delete Group</a></li>
		</ul>);
	},
	deleteGroup: function(){
		if (this.state.currentUser){
			this.setState({ confirmIsOpen: true });
		}
	},
	backHome: function() {
		HashHistory.push("/");
	},
	forSureDeleteGroup: function() {
		ClientActions.removeGroup(this.props.group.id);
		this.closeConfirmModal();
		HashHistory.push("/");
	},
	closeConfirmModal: function() {
		this.setState({ confirmIsOpen: false });
	},
	openModal: function() {
		this.setState({ eventFormIsOpen: true });
	},
	closeModal: function() {
		this.setState({ eventFormIsOpen: false });
	},
	openSuccessModal: function(message) {
		this.setState({ successModalIsOpen: true, message: message });
	},
	closeSuccessModal: function() {
		this.setState({ successModalIsOpen: false, message: "" });
	},

	showSuccessMessage: function() {
		this.closeEditModal();
		this.openSuccessModal();
	},
	_setMessage: function(message) {
		this.state.message = message;
	},
	adminCheck: function() {
		return this.state.currentUser && this.props.group.creator_id === this.state.currentUser.id;
	},
	startEditMode: function() {
		this.setState({ editMode: true, title: this.props.group.title });
	},
	endEditMode: function() {
		this.setState({ editMode: false });
	},
	saveChange: function() {
		ClientActions.updateGroup({
				title: this.state.title
			}, this.props.group.id);
		this.endEditMode();
	},
	updateTitle: function(e) {
		e.preventDefault();
		this.setState({
			title: e.target.value
		});
	},
	backToGroup: function() {
		HashHistory.push(this.props.path.match(/(groups\/\d+)\/events/)[1] + "/home");
	},
	title: function() {
		if (!this.adminCheck()) {
			return (<div className="nav-div">
				{this.props.group.title}
			</div>);
		} else {
			var titleBox, icon;
			if (this.state.editMode){
				titleBox = <input type="text" value={this.state.title} onChange={this.updateTitle}/> ;
				icon = (<div className="edit" onClick={this.saveChange}>✓</div>);
			} else {
				titleBox = this.props.group.title;
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
		const id = this.props.group.id;
		return (
			<div>
				<div style={{ position: "relative" }}>
					{this.title()}
					<div className="group-nav-container">
						<ul className="back-nav">
							<li onClick={this.backHome}>Home</li>
								{
									(/\/events\/\d+/).test(this.props.path) &&
										<li onClick={this.backToGroup}>Back To Group</li>
								}
						</ul>
						{this.adminNav()}
						{this.props.joinButtons}
					</div>
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
