var React = require('react'),
		GroupStore = require('../../stores/groupStore');

var GroupHome = React.createClass({
	render: function() {
		return (
			<div>
					<h3>{this.props.group.title}</h3>
					<p>{this.props.group.description}</p>
			</div>
		);
	}

});

module.exports = GroupHome;