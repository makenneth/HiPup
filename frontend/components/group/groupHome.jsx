var React = require('react'),
		HashHistory = require('react-router').hashHistory,
		GroupEvents = require('./groupEvents'),
		GroupMembers = require('./groupMembers'),
		ClientActions = require('../../actions/clientActions');

var GroupHome = React.createClass({
	getInitialState: function() {
		return {
			editMode: false,
			description: ""
		};
	},
	_showTag: function(id) {
		HashHistory.push("tags/" + id);
	},
	pastMeetUp: function(){
		return (<div>"No past meetups"</div>)
	},
	startEditMode: function(){
		this.setState({description: this.props.group.description, editMode: true});
	},
	closeEditMode: function(){
		this.setState({editMode: false});
	},
	saveEdit: function(){
		ClientActions.updateGroup({
			description: this.state.description
		}, this.props.group.id);
		this.closeEditMode();
	},
	description: function(){
		var group = this.props.group;
		if (!this.props.currentUser || this.props.currentUser.id !== group.creator_id){
			return (<div className="group-description">
								<h2>Description: </h2>
								<p>{group.description}</p>
								</div>);
		} else {
			var button, textbox;
			if (this.state.editMode){
				button = (<div className="edit" onClick={this.saveEdit}>✓</div>);
				textbox = (<textarea id="group-descript-text" onChange={this.updateDescription} 
												value={this.state.description} rows="5"/>);
			} else {
				button = (<div className="edit" onClick={this.startEditMode}>✎</div>);
				textbox = (<p>{group.description}</p>);
			}
			return (
				<div className="group-description">
				{button}
				<h2>Description: </h2>
				{textbox}
			</div>);
		}
	},
	updateDescription: function(e){
		this.setState({description: e.target.value});
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
									return (<li key={tag.id} tag={tag}>{tag.name}</li>);
								}.bind(this))
							}
							</ul>
						</div>
					</div>
				<div className="group-info-container">
						{this.description()}
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
