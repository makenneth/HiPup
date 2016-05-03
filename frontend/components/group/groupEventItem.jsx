var React = require('react'),
		HashHistory = require('react-router').hashHistory;

var GroupEventItem = React.createClass({
	showEvent: function(id){
		HashHistory.push("/events/" + this.props.groupEvent.id);
	},
	//in RSVP also need
	parseTime: function(){
		var parsedTime = this.props.groupEvent.event_time.match(/(\d{4}\-\d{2}\-\d{2}).*T(\d{2}\:\d{2}).*([+-]\d{2}\:\d{2})/);
		parsedTime = parsedTime || [0, 0, 0, 0];
		return [parsedTime[1], parsedTime[2], parsedTime[3]];
	},
	render: function() {
		var groupEvent = this.props.groupEvent,
				eventTime = this.parseTime() || [0, 0, 0];
		return (
			<div className="group-event-container">
					<div className="group-event-title" onClick={this.showEvent.bind(null, groupEvent.id)}>
						{groupEvent.title}
					</div>
				<div className="group-event-detail">
					<div className="event-detail-left">
						<p className="location">{groupEvent.city}, {groupEvent.state}</p>
						<p>{groupEvent.description.slice(0,120)}...</p>
					</div>
					<div className="event-detail-right">
						<p className="event-time">{eventTime[0]}</p>
						<p className="event-hour">{eventTime[1] + " " + eventTime[2]}</p>
						<button className="rsvp">RSVP</button> 
					</div>
				</div>
			</div>
		);
	}

});

module.exports = GroupEventItem;