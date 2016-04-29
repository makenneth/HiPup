var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState');

var GroupNav = React.createClass({
	mixins: [CurrentUserState],
	render: function() {
		var id = this.props.group.groupId,
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
			</div>
				</div>
		);
	}

});

module.exports = GroupNav;