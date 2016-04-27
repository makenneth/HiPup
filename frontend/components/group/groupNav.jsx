var React = require('react');

var GroupNav = React.createClass({
	render: function() {
		var id = this.props.groupId;
		return (
			<div>
				<li><a href={"#/groups/" + id + "/home"}>Home</a></li>
				<li><a href={"#/groups/" + id + "/members"}>Members</a></li>
				<li><a href={"#/groups/" + id + "/photos"}>Photos</a></li>
				<li><a href={"#/groups/" + id + "/events"}>Events</a></li>
			</div>
		);
	}

});

module.exports = GroupNav;