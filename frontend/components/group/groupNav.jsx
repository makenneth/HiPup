var React = require('react');

var GroupNav = React.createClass({
	render: function() {
		var id = this.props.groupId;
		return (
			<div className="nav-div cf">
				<ul className="group-nav cf">
					<li><a href={"#/"}>Home</a></li>
					<li><a href={"#/groups/" + id + "/home"}>Detail</a></li>
					<li><a href={"#/groups/" + id + "/members"}>Members</a></li>
					<li><a href={"#/groups/" + id + "/photos"}>Photos</a></li>
					<li><a href={"#/groups/" + id + "/events"}>Events</a></li>
				</ul>
			</div>
		);
	}

});

module.exports = GroupNav;