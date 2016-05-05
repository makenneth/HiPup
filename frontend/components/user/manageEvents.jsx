var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState'),
		HashHistory = require("react-router").hashHistory,
		UserStore = require('../../stores/userStore');

var ManageEvents = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			joinedEvents: []
		};
	},
	componentDidMount: function() {
		this.usListener = UserStore.addListener(this._fetchedUser);
	},
	_fetchedUser: function(){
		if (!this.state.currentUser){
			HashHistory.push('/');
		}
		this.setState({joinedEvents: this.state.currentUser.joinedEvents});
	},
	componentWillUnmount: function() {
		this.usListener.remove()
	},
	showDetail: function(id) {
	},
	render: function() {
		return (
			<div id="parent-container cf">
				<div className="title">Upcoming Events:</div>
				<div class="events-container">
					<div>
						{
							this.state.joinedEvents.map(function(joinedEvent){
								return (<div key={joinedEvent.id} class="user-events-detail" onClick={this.showDetail.bind(null, joinedEvent.id)}>
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
