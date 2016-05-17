var React = require('react'),
		GroupEventStore = require('../../stores/groupEventStore'),
		ClientActions = require('../../actions/clientActions'),
		EventMap = require('./map.jsx'),
		CurrentUserState = require('../../mixin/currentUserState'),
		UserStore = require('../../stores/userStore'),
		Modal = require('react-modal'),
		Confirmation = require('../../mixin/confirmation'),
		ConfirmationStyle = require('../../modal/confirmationStyle');

var EventShow = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			groupEvent: GroupEventStore.find(this.props.params.eventId),
			distance: 0,
			logInIsOpen: false,
			signUpIsOpen: false,
			confirmIsOpen: false,
			editMode: false,
			title: "",
			description: ""
		};
	},
	startEditMode: function(){
		this.setState({editMode: true, title: this.state.groupEvent.title,
											description: this.state.groupEvent.description});
	},
	editButton: function(){
		if (!this.state.currentUser || this.state.currentUser.id !== this.state.groupEvent.host_id){
			return ""
		} else {
			return this.state.editMode ?
				(<div className="edit" onClick={this.saveEdit}>✓</div>) :
				(<div className="edit" onClick={this.startEditMode}>✎</div>);
		}
	},
	endEditMode: function(){
		this.setState({editMode: false});
	},
	editTitle: function(){
		var content = <h3>{this.state.groupEvent.title}</h3>;
		if (this.state.editMode){
			content = <input type="text" value={this.state.title}
						 onChange={this.updateField.bind(null, "title")} />;
		}
		return (<div id="header">
			{content}
		</div>);
	},
	saveEdit: function(){
		ClientActions.editEvent(this.state.groupEvent.id, {title: this.state.title, 
															description: this.state.description});
		this.setState({editMode: false})
	},
	updateField: function(field, e){
		var fieldObj = {};
		fieldObj[field] = e.target.value;
		this.setState(fieldObj);
	},
	editDescription: function(){
		if (this.state.editMode){
			return <div id="description">
				<h3>Description: </h3>
				<textarea value={this.state.description}
							 onChange={this.updateField.bind(null, "description")} />
			</div>
		} else {
			return (<div id="description">
				<h3>Description: </h3>
				{this.state.groupEvent.description}
			</div>);
		}
	},
	componentDidMount: function() {
		this.esListener = GroupEventStore.addListener(this._fetchedEvent);

		if (!this.state.groupEvent.event_time){
			ClientActions.fetchSingleEvent(this.props.params.eventId, UserStore.currentLocation().timeZone);
		}
	},
	toggleEventButton: function() {
		if (!this._alreadyRSVP()){
			if (!this.state.currentUser){
				return <button onClick={this.joinAndRsvpEvent} className="join">Sign In</button>;
				//this should show the sign in modal 
			} else if (!this.props.hasJoinedGroup()) {
				return <button onClick={this.joinAndRsvpEvent} className="join">Join And RSVP</button>;
			} else if (this.state.currentUser && this.props.hasJoinedGroup()){
				return <button onClick={this.rsvpEvent} className="join">RSVP</button>;
			}
		} else {
			return <button onClick={this.changeRSVP} className="leave">Change RSVP</button>;
		}
	},
	joinAndRsvpEvent: function(){
		if (this.state.currentUser){
			this.props.joinGroup(this.rsvpEvent());
		} else {
			this.props.joinGroup();
		}
	},
	rsvpEvent: function(){
		if (this.state.currentUser && !this._alreadyRSVP()){
			ClientActions.rsvpEvent(this.state.currentUser.id, this.state.groupEvent.id);
			ClientActions.fetchSingleEvent(this.props.params.eventId, UserStore.currentLocation().timeZone);
		}
	},
	changeRSVP: function(){
		if (this.state.currentUser && this._alreadyRSVP()){
			ClientActions.changeRSVP(this.state.currentUser.id, this.state.groupEvent.id);
			ClientActions.fetchSingleEvent(this.props.params.eventId, UserStore.currentLocation().timeZone);
		}
	},
	_alreadyRSVP: function() {
		if (!this.state.currentUser) return false;
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
	},
	parseTime: function(){
		var parsingTime = this.state.groupEvent.event_time;
		if (!parsingTime) return [0, 0];
		return parsingTime.split(" || ");
	},
	componentWillUnmount: function() {
		if (this.esListener) this.esListener.remove();
	},
	cancelEvent: function(){
		if (this.state.currentUser) this.setState({confirmIsOpen: true});
	},
	forSureCancelEvent: function(){
		ClientActions.cancelEvent(this.state.currentUser.id, this.state.groupEvent.id);
		this.closeConfirmModal();
	},
	closeConfirmModal: function(){
		this.setState({confirmIsOpen: false});
	},
	render: function() {
		var groupEvent = this.state.groupEvent, eventTime = this.parseTime(),
			  user = this.state.currentUser || {id: ""},
			  notCancelledNorOld = groupEvent.status != "CANCEL" &&
									groupEvent.time > Date.now();
		return (
			<div className="event-parent">
					<div className="event-details">
						{this.editButton()}
						{this.editTitle()}
						<div className="event-sub">
							<div className="event-time-info">
								<div className="date-and-time">
									<h3>{eventTime[0]}</h3>
									<p>{eventTime[1]}</p>
									<p>Status:  {groupEvent.time < Date.now() ? "Finished" :
							groupEvent.status === "CANCEL" ? "Cancelled" : "On Schedule"}</p>
								</div>
								<div id="location">
									<h4>{groupEvent.street}</h4>
									<p>{groupEvent.city}, {groupEvent.state} {groupEvent.zip}</p>
								</div>
							</div>
							<div className="event-detail-map-container">
								{
									user.id === groupEvent.host_id && notCancelledNorOld ?
									<button className="cancel-event" onClick={this.cancelEvent}>Cancel Event</button> :
									""
								}
								<div className="event-map">
									{
										!this.state.groupEvent.event_time ? "" :
										<EventMap lat={groupEvent.lat} lng={groupEvent.lng} />
									}
								</div>
							</div>
						</div>
							{this.editDescription()}
					</div>
					<div className="rsvp-member">
					{ notCancelledNorOld  ?
						(<div className="rsvp-buttons">
						<div id="title">Interested?</div>
						<div>{this.toggleEventButton()}</div>
						</div>) : "" }
						<div className="event-participants">
							{groupEvent.event_users.length} {notCancelledNorOld ? "going" : "went"}:
							<ul className="participant-list">
								{
									groupEvent.event_users.slice(0, 10).map(function(participant){
										return <li key={participant.id} >
														<div className="mini-pic" style={
															{
																backgroundImage: "url(" + participant.image_url +")",
																backgroundSize: "cover"
															}
														}></div>
														<div className="ev-name">{participant.name}</div>
														</li>;

									})
								}
							</ul>
						</div>
					</div>) :
				}
					<Modal isOpen={this.state.confirmIsOpen} style={ConfirmationStyle}
							onRequestClose={this.closeConfirmModal}>
							<Confirmation confirm={this.forSureCancelEvent} deny={this.closeConfirmModal}/>
					</Modal>
			</div>
		);
	}


});

module.exports = EventShow;
