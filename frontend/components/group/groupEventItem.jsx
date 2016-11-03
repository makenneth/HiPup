const React = require('react');
const HashHistory = require('react-router').hashHistory;

const GroupEventItem = React.createClass({
	showEvent: function() {
		HashHistory.push("groups/" + this.props.groupId + "/events/" + this.props.groupEvent.id);
	},
	parseTime: function() {
		const parsedTime = this.props.groupEvent.event_time;
		if (!parsedTime) return [0, 0];
		return this.props.groupEvent.event_time.split(" || ");
	},
	render: function() {
		const groupEvent = this.props.groupEvent;
		const eventTime = this.parseTime();
		return (
			<div className="group-event-container">
					<div className="group-event-title" onClick={this.showEvent}>
						{groupEvent.title}
					</div>
				<div className="group-event-detail">
					<div className="event-detail-left">
						<p className="location">{groupEvent.city}, {groupEvent.state}</p>
						<p>{groupEvent.description.slice(0,120)}...</p>
					</div>
					<div className="event-detail-right">
						<p className="event-time">{eventTime[0]}</p>
						<p className="event-hour">{eventTime[1]}</p>
						{
							groupEvent.time > Date.now() || groupEvent.status === "SCHEDULED" ?
						  <button className="rsvp" onClick={this.showEvent}>RSVP</button> : ""
						}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = GroupEventItem;
