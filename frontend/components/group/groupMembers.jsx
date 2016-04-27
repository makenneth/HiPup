var React = require('react'),
		GroupStore = require('../../stores/groupStore');

var GroupMembers = React.createClass({
	getInitialState: function() {
		var group = this.props.group,
				participant = group ? group.participants : [];
		return {
			participants: participant
		};
	},
	componentDidMount: function() {
		if (this.state.participants !== undefined && !this.state.participants.length){
			var group = GroupStore.find(this.props.params.postId);
			this.setState({participants: group.participants});
		}
	},
	render: function() {
		var participants = this.props.group.participants || [];
		return (
			<div>
				<h1>Group Members</h1>
				{
					participants.map(function(participant){
						return <li key={participant.id}>{participant.name}</li>;
					})
				}
			</div>
		);
	}

});

module.exports = GroupMembers;