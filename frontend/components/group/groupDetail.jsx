var React = require('react'),
		HashHistory = require('react-router'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupNav = require('./groupNav'),
		CurrentUserState = require('../../mixin/currentUserState');


var GroupDetail = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			group: {
				title: undefined,
				description: undefined,
				tags: []
			}
		};
	},
	componentDidMount: function() {
		this.groupListener = GroupStore.addListener(this._loadDetail);
		ClientActions.fetchSingleGroup(this.props.params.groupId);
	},
	_loadDetail: function(){
		this.setState({
			group: GroupStore.find(this.props.params.groupId)
		});
	},
	componentWillUnmount: function() {
		if (this.groupListener){
			this.groupListener.remove();
		}
	},
	joinEvent: function() {
		if (this.state.currentUser && !this.hasJoinedGroup()){
			ClientActions.joinGroup(this.state.currentUser.id, this.state.group.id);
		} else {
			//bring in log-in or sign-up modal //put them in mixins?
		}
	},
	leaveEvent: function() {
		if (this.state.currentUser && this.hasJoinedGroup){
			ClientActions.leaveGroup(this.state.currentUser.id, this.state.group.id);
		}
	},
	_joinButtons: function(){
		if (!this.state.currentUser || !this.hasJoinedGroup()){//should be in user store
			return <button className="join-group" onClick={this.joinEvent}>Join Us</button>
		} else {
			return <button className="leave-group" onClick={this.leaveEvent}>Leave Group</button>
		}
	},
	hasJoinedGroup: function(){
		var groups = this.state.currentUser.groups;
		for (var i = 0; i < groups.length; i++) {
			if (groups[i].id === this.state.group.id){
				return true;
			}
		}
		return false;
	},
	render: function() {
		var children = !this.props.children ? this.props.children :
			React.cloneElement(this.props.children, { group: this.state.group } );
		return (
			<div>
				<GroupNav group={this.state.group} />

				<div className="group-detail">
					{this._joinButtons()}
					{children}
				</div>
			</div>

		);
	}

});

module.exports = GroupDetail;