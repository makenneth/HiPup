var React = require('react'),
		GroupEventItem = require('./groupEventItem'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions');

var GroupEvents = React.createClass({
	getInitialState: function() {
		return {
			events: this.props.group.group_events
		};
	},
	componentDidMount: function() {
		this.gelistener = GroupStore.addListener(this._fetchedGroup);
		if (!this.state.events){
			ClientActions.fetchSingleGroup(this.props.params.groupId);
		}
	},
	componentWillUnmount: function() {
		if (this.gelistener){
			this.gelistener.remove();
		}
	},
	_fetchedGroup: function() {
		this.setState(
				{
					events: GroupStore.find(this.props.params.groupId).group_events
				}
		);
	},
	render: function() {
		var groupEvents = this.props.group.group_events || [];
		return (
			<div>
				<ul>
					{
						groupEvents.map(function(groupEvent){
							return <GroupEventItem key={groupEvent.id} groupEvent={groupEvent}
													groupId={this.props.params.groupId} />;
						}.bind(this))
					}
				</ul>
			</div>
		);
	}

});

module.exports = GroupEvents;