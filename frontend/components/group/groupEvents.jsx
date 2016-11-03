const React = require('react');
const GroupEventItem = require('./groupEventItem');
const GroupStore = require('../../stores/groupStore');
const ClientActions = require('../../actions/clientActions');

var GroupEvents = React.createClass({
	getInitialState: function() {
		return {
			oldEvents: this.props.group.old_events,
			upcomingEvents: this.props.group.upcoming_events,
			tabSelected: 0
		};
	},
	componentDidMount: function() {
		this.gelistener = GroupStore.addListener(this._fetchedGroup);
		if (!this.state.upcomingEvents) {
			ClientActions.fetchSingleGroup(this.props.groupId);
		}
	},
	componentWillUnmount: function() {
		if (this.gelistener) {
			this.gelistener.remove();
		}
	},
	setTab: function(tab){
		this.setState({ tabSelected: tab });
	},
	_fetchedGroup: function() {
		this.setState({
			events: GroupStore.find(this.props.groupId).group_events
		});
	},
	render: function() {
		const oldEvents = this.props.group.old_events || [];
		const upcomingEvents = this.props.group.upcoming_events || [];
		return (
			<div>
				<div className="group-event-nav">
					<li onClick={this.setTab.bind(null, 0)}
							className={this.state.tabSelected === 0 ? "active-tab" : "inactive-event-tab"}>
							Upcoming Events ({upcomingEvents.length})
					</li>
					<li onClick={this.setTab.bind(null, 1)}
							className={this.state.tabSelected === 1 ? "active-tab" : "inactive-event-tab"}>
							Past Events ({oldEvents.length})
					</li>
				</div>
				<div className="browsing-events">
					{
						this.state.tabSelected === 0 &&
							(<ul>
								{
									upcomingEvents.map((upcomingEvent) => {
										return (<GroupEventItem
											key={upcomingEvent.id}
											groupEvent={upcomingEvent}
											groupId={this.props.groupId}
										/>);
									})
								}
							</ul>)
					}
					{
						this.state.tabSelected === 1 &&
							(<ul>
								{
									oldEvents.map((oldEvent) => {
										return (<GroupEventItem
											key={oldEvent.id}
											groupEvent={oldEvent}
											groupId={this.props.groupId}
										/>);
									})
								}
							</ul>)
					}
				</div>
			</div>
		);
	}
});

module.exports = GroupEvents;
