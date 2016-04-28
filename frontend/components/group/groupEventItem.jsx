var React = require('react');

var GroupEventItem = React.createClass({

	render: function() {
		var groupEvent = this.props.groupEvent;
		return (
			<div>
				<h3>{groupEvent.title}</h3>
				<p>Location: {groupEvent.city}, {groupEvent.state}</p>
				<p>Time: {groupEvent.event_time}</p>
				<p>{groupEvent.description}</p>
			</div>
		);
	}

});

module.exports = GroupEventItem;