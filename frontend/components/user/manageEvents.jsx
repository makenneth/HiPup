const React = require('react');
const CurrentUserState = require('../../mixin/currentUserState');
const HashHistory = require("react-router").hashHistory;
const UserStore = require('../../stores/userStore');

const ManageEvents = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			joinedEvents: []
		};
	},
	componentDidMount: function() {
		this.usListener = UserStore.addListener(this._fetchedUser);
		if (this.state.currentUser){
			this.setState({ joinedEvents: this.state.currentUser.joinedEvents });
		}
	},
	_fetchedUser: function(){
		if (!this.state.currentUser) {
			HashHistory.push('/');
		}
		this.setState({ joinedEvents: this.state.currentUser.joinedEvents });
	},
	componentWillUnmount: function() {
		this.usListener.remove()
	},
	showDetail: function(id) {
	},
	redirect: function(group, id){
		if (id) {
			HashHistory.push("groups/" + group.id + "/events/" + id);
		} else {
			HashHistory.push("groups/" + group.id + "/home");
		}
	},
	render: function() {
		return (
			<div id="parent-container">
				<div className="title">Upcoming Events:</div>
				<div class="events-container">
						{
							this.state.joinedEvents.map((joinedEvent) => {
								const group = joinedEvent.belongedGroup;
								return (<div
									key={joinedEvent.id}
								  class="user-events-detail"
								  onClick={this.showDetail.bind(null, joinedEvent.id)}
								 >
									<li className="link" onClick={this.redirect.bind(null, group, joinedEvent.id)}>
										<label>{joinedEvent.title}</label>
									</li>
									<li className="link" onClick={this.redirect.bind(null, group, null)}>
										<label>Group:</label>{group.title}
									</li>
									<li><label>Date:</label>{joinedEvent.event_time.split(" || ")[0]}</li>
									<li><strong>Time:</strong>{joinedEvent.event_time.split(" || ")[1]}</li>
									<li><strong>People Going:</strong>{joinedEvent.event_users.length}</li>
									<li><strong>Status:</strong>{joinedEvent.status === "SCHEDULED" ? "Scheduled" : "Cancel"}</li>

								</div>);
							})
						}
				</div>
			</div>
		);
	}
});

module.exports = ManageEvents;
