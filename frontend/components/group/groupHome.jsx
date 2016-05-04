var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		HashHistory = require('react-router').hashHistory,
		GroupEvents = require('./groupEvents'),
		GroupMembers = require('./groupMembers');


var GroupHome = React.createClass({
	_showTag: function(id) {
		HashHistory.push("tags/" + id);
	},
	pastMeetUp: function(){
		return (<div>"No past meetups"</div>)
	},
	render: function() {
		var group = this.props.group;
		return (
			<div className="group-home">
					<div className="group-info">
						<li className="address">{group.city + ", " + group.state}</li>
						<li className="founded">Founded {group.created_at} </li>
						<li className="stats"><div>Members </div><div>{group.participants.length}</div></li>
						{
							group.upcoming_events.length ? 
								<li className="stats">
									<div>Upcoming Meetups: </div><div>{group.upcoming_events.length}</div></li>
									:
								<li><div>No upcoming meetups</div></li>
						}
						{
							group.old_events.length ?
								(<li className="stats">
									<div>Past Meetups: </div><div>{group.old_events.length}</div>
								</li>) :
								<li><div>No past meetups</div></li>
						}
						<div className="group-tags">
							<h3>We're about:</h3>
							<ul>
							{
								group.tags.map(function(tag){
									return <li key={tag.id} tag={tag}>
														<a onClick={this._showTag.bind(null, tag.id)}>
															{tag.name}
														</a>
													</li>;
								}.bind(this))
							}
							</ul>
						</div>
					</div>
				<div className="group-info-container">
					<div className="group-description">
							<h2>Description: </h2>
							<p>{group.description}</p>
					</div>
				<div className="event-container">
					<GroupEvents group={this.props.group} groupId={this.props.params.groupId}/>
				</div>
				</div>
				<div className="group-member-container">
					<GroupMembers group={this.props.group} groupId={this.props.params.groupId}/>
				</div>
			</div>

		);
	}

});

module.exports = GroupHome;