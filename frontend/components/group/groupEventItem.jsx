var React = require('react'),
		HashHistory = require('react-router').hashHistory;

var GroupEventItem = React.createClass({
	showEvent: function(id){
		HashHistory.push("/events/" + this.props.groupEvent.id);
	},
	render: function() {
		var groupEvent = this.props.groupEvent;
		return (
			<div>
				<h3 onClick={this.showEvent.bind(null, groupEvent.id)}>
					{groupEvent.title}
				</h3>
				<p>Location: {groupEvent.city}, {groupEvent.state}</p>
				<p>Time: {groupEvent.event_time}</p>
				<p>{groupEvent.description}</p>
			</div>
		);
	}

});

module.exports = GroupEventItem;