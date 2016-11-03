const React = require('react');
const HashHistory = require('react-router').hashHistory;

const EventItemByDate = React.createClass({
	directToEvent: function() {
		HashHistory.push("groups/" + this.props.groupEvent.group.id + "/events/" + this.props.groupEvent.id);
	},
	render: function() {
		const groupEvent = this.props.groupEvent;
		const groupEventTime = groupEvent.event_time.split(" || ");
		return (
			<li className="event-query-item" onClick={this.directToEvent}>
					<div className="time">
						<div>{groupEventTime[0]}</div>
						<div>{groupEventTime[1]}</div>
					</div>
					<div className="title">
						<div className="group-title">{groupEvent.group ? groupEvent.group.title : ""}</div>
						<div className="group-event-title">{groupEvent.title}</div>
					</div>
			</li>
		);
	}

});

module.exports = EventItemByDate;
