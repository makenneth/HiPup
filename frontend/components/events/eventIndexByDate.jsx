var React = require('react'),
		GroupEventStore = require('../../stores/groupEventStore'),
		ClientActions = require('../../actions/clientActions'),
		UserStore = require("../../stores/userStore");

var EventIndexByDate = React.createClass({
	getInitialState: function() {
		return {
			groupEvents: GroupEventStore.all() || []
		};
	},
	componentDidMount: function() {
	  this.eventIndexListener = GroupEventStore.addListener(this._fetchedEvents);
	  if (!groupEvents){
		  ClientActions.fetchAllEventsByTime(UserStore.currentLocation().timeZone);
	  }
	},
	_fetchedEvents: function() {
		this.setState({groupEvents: GroupEventStore.all()});
	},
	render: function() {
		return (
			<div>
				<ul>
					{
						this.state.groupEvents.map(function(groupEvent){
							return <li>{groupEvent.title}</li>;
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = EventIndexByDate;