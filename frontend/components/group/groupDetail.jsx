var React = require('react'),
		HashHistory = require('react-router'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupNav = require('./groupNav'),
		CurrentUserState = require('../../mixin/currentUserState'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
		UserStore = require('../../stores/userStore');


var GroupDetail = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			group: {
				title: undefined,
				description: undefined,
				tags: [],
				old_events: [],
				upcoming_events: [],
				participants: []
			}
		};
	},
	componentDidMount: function() {
		this.groupListener = GroupStore.addListener(this._loadDetail);
		ClientActions.fetchSingleGroup(this.props.params.groupId, UserStore.currentLocation().timeZone);
		//watch out for error ...
	},
	_loadDetail: function(){
		this.setState({
			group: GroupStore.find(this.props.params.groupId)
		});
	},
	componentWillUnmount: function() {
		if (this.groupListener) this.groupListener.remove(); 
	},
	joinGroup: function() {
		if (this.state.currentUser && !this.hasJoinedGroup()){
			ClientActions.joinGroup(this.state.currentUser.id, this.state.group.id);
		} else {
			//bring in log-in or sign-up modal //put them in mixins?
		}
	},
	leaveGroup: function() {
		if (this.state.currentUser && this.hasJoinedGroup()){
			ClientActions.leaveGroup(this.state.currentUser.id, this.state.group.id);
		}
	},
	_joinButtons: function(){
		if ((/events\/\d+$/).test(this.props.location.pathname)) return "";
		if (!this.state.currentUser || !this.hasJoinedGroup()){//should be in user store
			return <button className="join-group" onClick={this.joinGroup}>Join Group</button>
		} else {
			return <button className="leave-group" onClick={this.leaveGroup}>Leave Group</button>
		}
	},
	hasJoinedGroup: function(){
		if (!this.state.currentUser) return false;
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
			React.cloneElement(this.props.children, { group: this.state.group, hasJoinedGroup: this.hasJoinedGroup } );
		return (
			<ReactCSSTransitionGroup transitionName="page" 
							transitionAppear={true} transitionAppearTimeout={500} 
								transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div>
					<GroupNav group={this.state.group} joinButtons={this._joinButtons()}/>
	

						{children}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

});

module.exports = GroupDetail;