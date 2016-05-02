var React = require('react'),
		GroupEventStore = require('../../stores/groupEventStore'),
		ClientActions = require('../../actions/clientActions'),
		EventMap = require('./map.jsx'),
		CurrentUserState = require('../../mixin/currentUserState'),
		HaversineFormula = require('../../mixin/haversine'),
		UserStore = require('../../stores/userStore');

var EventShow = React.createClass({
	mixins: [CurrentUserState, HaversineFormula],
	getInitialState: function() {
		return {
			groupEvent: GroupEventStore.find(this.props.params.eventId),
			distance: 0
		};
	},
	_calculateDistance: function(position){
		var groupEvent = this.state.groupEvent,
				coords = position.coords;
		var p1 = {
							lat: groupEvent.lat,
							lng: groupEvent.lng
						 },
				p2 = {
							lat: coords.latitude,
							lng: coords.longitude
						 };

		this.setState({ distance: HaversineFormula.getDistance(p1, p2) });
	},
	componentDidMount: function() {
		this.esListener = GroupEventStore.addListener(this._fetchedEvent);

		if (!this.state.groupEvent.event_time){
			ClientActions.fetchSingleEvent(this.props.params.eventId);
		} else {
			if (this.state.currentUser){ //bug here.. currentUser should still be null by this time
				//should watch currentUser's position upon login
				this._calculateDistance(
				{
					coords: {
										lat: this.state.currentUser.lat,
										lng: this.state.currentUser.lng
									}
				});
			} else {
				navigator.geolocation.getCurrentPosition(this._calculateDistance, this.handleError);		
			}
		}
	},
	handleError: function(err) {
		console.log(err);
	},
	toggleEventButton: function() {
		if (!this.state.currentUser || !this._alreadyJoined()){
			return <button onClick={this.joinEvent} className="join">Join Event</button>;
		} else {
			return <button onClick={this.leaveEvent} className="leave">Leave Event</button>;
		}
	},
	joinEvent: function(e){
		if (this.state.currentUser && !this._alreadyJoined()){
			ClientActions.joinEvent(this.state.currentUser.id, this.state.groupEvent.id);
		} else {
			//show a sign in or sign up modal
		}
	},
	leaveEvent: function(){
		if (this.state.currentUser && this._alreadyJoined()){
			ClientActions.leaveEvent(this.state.currentUser.id, this.state.groupEvent.id);
		}
	},
	_alreadyJoined: function() {
		var groupEvents = this.state.currentUser.joinedEvents;
		for (var i = 0; i < groupEvents.length; i++) {
			if (groupEvents[i].id === this.state.groupEvent.id){
				return true;
			}
		}
		return false;
	},
	_fetchedEvent: function() {
		this.setState({
				groupEvent: GroupEventStore.find(this.props.params.eventId)
			})
		navigator.geolocation.getCurrentPosition(this._calculateDistance, this.handleError);
	},
	componentWillUnmount: function() {
		if (this.esListener) this.esListener.remove();
	},
	render: function() {
		var groupEvent = this.state.groupEvent;
		var showDistance = this.state.distance ? 
				(<p>Distance away: {this.state.distance} miles</p>) : "";
		return (
			<div>
					<div className="group-event-detail">
						<div id="header">
							<h2>{groupEvent.title}</h2>
							{this.toggleEventButton()}
						</div>
						<p>Location: {groupEvent.city}, {groupEvent.state}</p>
						<p>Days away: {groupEvent.daysAway}</p>
						{showDistance}
						<p>{groupEvent.description}</p>
					</div>
					<div>
					{
						!this.state.groupEvent.event_time ? "" :
						<EventMap lat={groupEvent.lat} lng={groupEvent.lng} />
					}
					</div>

			</div>
		);
	}


});

module.exports = EventShow;