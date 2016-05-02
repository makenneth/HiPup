var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState'),
		NewEventForm = require('../events/newEventForm'),
		EventFormStyle = require('../../modal/eventFormStyle'),
		Modal = require('react-modal');

var GroupNav = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			eventFormIsOpen: false 
		};
	},
	componentDidMount: function() {
	},
	adminNav: function() {
		if (this.adminCheck()){
			return (<ul className="admin-group-nav">
								<li><a href="">Edit Group</a></li>
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
	adminCheck: function() {
		return this.state.currentUser && this.props.group.creator_id === this.state.currentUser.id;
	},
	render: function() {
		var id = this.props.group.id,
				title = this.props.group.title;
		return (
			<div>
				<div className="nav-div cf">
					<h3>{title}</h3>
					<ul className="group-nav">
						<li><a href={"#/"}>Home</a></li>
						<li><a href={"#/groups/" + id + "/home"}>Detail</a></li>
						<li><a href={"#/groups/" + id + "/members"}>Members</a></li>
						<li><a href={"#/groups/" + id + "/photos"}>Photos</a></li>
						<li><a href={"#/groups/" + id + "/events"}>Events</a></li>
					</ul>
					{this.adminNav()}
				</div>
				<Modal isOpen={this.state.eventFormIsOpen} style={EventFormStyle} 
							onRequestClose={this.closeModal}>
					<NewEventForm closeModal={this.closeModal} groupId={id}/>
				</Modal>
			</div>
		);
	}

});

module.exports = GroupNav;