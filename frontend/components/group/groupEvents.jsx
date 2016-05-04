var React = require('react'),
		GroupEventItem = require('./groupEventItem'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions');

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
		if (!this.state.upcomingEvents){
			ClientActions.fetchSingleGroup(this.props.groupId);
		}
	},
	componentWillUnmount: function() {
		if (this.gelistener){
			this.gelistener.remove();
		}
	},
	setTab: function(tab){
		this.setState({tabSelected: tab});
	},
	_fetchedGroup: function() {
		this.setState(
				{
					events: GroupStore.find(this.props.groupId).group_events
				}
		);
	},
	render: function() {
		var oldEvents = this.props.group.old_events || [],
			upcomingEvents = this.props.group.upcoming_events || [],
			that = this;
		return (
			<div>
				<div className="group-event-nav">
						<li onClick={this.setTab.bind(null, 0)} 
								className={this.state.tabSelected === 0 ? "active-tab" : ""}>
								Upcoming Events ({upcomingEvents.length})
						</li>
						<li onClick={this.setTab.bind(null, 1)}
								className={this.state.tabSelected === 1 ? "active-tab" : ""}>
								Past Events ({oldEvents.length})
								</li>
				</div>
				<div className="browsing-events">
						{ 
							this.state.tabSelected === 0 ?
							(<ul>
										{	
											upcomingEvents.map(function(upcomingEvent){
												return <GroupEventItem key={upcomingEvent.id} groupEvent={upcomingEvent}
																			groupId={that.props.groupId} />;
											})
										}
								</ul>) :  this.state.tabSelected === 1 ?
						(<ul>
							{
								oldEvents.map(function(oldEvent){
									return <GroupEventItem key={groupEvent.id} groupEvent={groupEvent}
															groupId={that.props.groupId} />;
								})
							}
						</ul>) : ""
					}
			</div></div>
		);
	}

});

module.exports = GroupEvents;