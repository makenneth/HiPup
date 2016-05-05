var React = require('react'),
		EventQueryStore = require('../../stores/groupEventQuery'),
		ClientActions = require('../../actions/clientActions'),
		UserStore = require("../../stores/userStore"),
		EventItemByDate = require('./eventItemByDate');

var EventIndexByDate = React.createClass({
	getInitialState: function() {
		return {
			groupEvents: EventQueryStore.allByDate() || [],
			page: 1
		};
	},
	componentDidMount: function() {
	  this.eventIndexListener = EventQueryStore.addListener(this._fetchedEvents);

	  if (!this.state.groupEvents.length){
		  ClientActions.fetchAllEventsByDate(UserStore.currentLocation().timeZone);
	  }
	},
	showMore: function() {
		this.setState({page: this.state.page + 1});
	},
	_fetchedEvents: function() {
		this.setState({groupEvents: EventQueryStore.allByDate()});
	},
	showMoreButton: function() {
		if (this.state.page > Math.ceil(this.state.groupEvents.length / 10)){
			return "";
		} else {
			return <button onClick={this.showMore}>Show More</button>;
		}
	},
	render: function() {
		return (
			<div className="event-by-date">
			<div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
				<h3>
					Event By Date
				</h3>
				<ul>
					{
						this.state.groupEvents.slice(0, (this.state.page) * 10).map(function(groupEvent){
							return <EventItemByDate key={groupEvent.id} groupEvent={groupEvent} />;
						})
					}
				</ul>
				{this.showMoreButton()}
			</div>
		);
	}

});

module.exports = EventIndexByDate;
