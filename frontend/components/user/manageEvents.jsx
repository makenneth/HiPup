var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState'),
		HashHistory = require("react-router").hashHistory;

var ManageEvents = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			joinedEvents: []
		};
	},
	componentDidMount: function() {
		if (!this.state.currentUser){
			HashHistory.push('/');
		}
		this.setState({joinedEvents: this.state.currentUser.joinedEvents})
	},
	showDetail: function(id) {
		debugger;
	},
	render: function() {
		return (
			<div>
				<div class="event-parent-container">
					<div>Upcoming Events:</div>
					<div>
						{
							this.state.joinedEvents.map(function(joinedEvent){
								return (<div key={joinedEvent.id} class="user-event-detail" onClick={this.showDetail.bind(null, joinedEvent.id)}>
													<h3>Title: {joinedEvent.title}</h3>
													<li>Date and time: {joinedEvent.date}</li>
													<p>Description: {joinedEvent.description}</p>
												</div>);
							}.bind(this))
						}
					</div>
				</div>
			</div>
		);
	}

});

module.exports = ManageEvents;