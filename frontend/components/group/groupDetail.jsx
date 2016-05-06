var React = require('react'),
		HashHistory = require('react-router'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupNav = require('./groupNav'),
		CurrentUserState = require('../../mixin/currentUserState'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
		UserStore = require('../../stores/userStore'),
		LogInForm = require('../user/logInForm'),
		SignUpForm = require('../user/signUpForm'),
		FormStyle = require('../../modal/formStyle'),
		Modal = require('react-modal');


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
				participants: [],
			},
			logInIsOpen: false,
			signUpIsOpen: false
		};
	},
	componentDidMount: function() {
		this.groupListener = GroupStore.addListener(this._loadDetail);
		ClientActions.fetchSingleGroup(this.props.params.groupId, UserStore.currentLocation().timeZone);
	},
	_loadDetail: function(){
		this.setState({
			group: GroupStore.find(this.props.params.groupId)
		});
	},
	componentWillUnmount: function() {
		if (this.groupListener) this.groupListener.remove();
	},
	componentWillReceiveProps: function(nextProps) {
		ClientActions.fetchSingleGroup(nextProps.params.groupId, UserStore.currentLocation().timeZone);
	},
	joinGroup: function(callback) {
		if (this.state.currentUser && !this.hasJoinedGroup()){
			ClientActions.joinGroup(this.state.currentUser.id, this.state.group.id);
			ClientActions.fetchSingleGroup(this.props.params.groupId, UserStore.currentLocation().timeZone);
			if (callback) callback();
		} else {
			this.setState({logInIsOpen: true});
		}
	},
	leaveGroup: function() {
		if (this.state.currentUser && this.hasJoinedGroup()){
			ClientActions.leaveGroup(this.state.currentUser.id, this.state.group.id);
			ClientActions.fetchSingleGroup(this.props.params.groupId, UserStore.currentLocation().timeZone);
		}
	},
	_joinButtons: function(){
		if ((/events\/\d+$/).test(this.props.location.pathname)) return "";
		if (!this.state.currentUser || !this.hasJoinedGroup()){//should be in user store
			return <ul className="join-group" onClick={this.joinGroup}>Join Group</ul>
		} else {
			return <ul className="leave-group" onClick={this.leaveGroup}>Leave Group</ul>
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
	openLogInModal: function(){
		this.setState({logInIsOpen: true});
	},
	closeLogInModal: function(){
		this.setState({logInIsOpen: false});
	},
	openSignUpModal: function(){
		this.setState({signUpIsOpen: true});
	},
	closeSignUpModal: function(){
		this.setState({signUpIsOpen: false});
	},
	redirectToSignUp: function(){
		this.setState({logInIsOpen: false,
			signUpIsOpen: true});
	},
	render: function() {
		var children = !this.props.children ? this.props.children :
			React.cloneElement(this.props.children, { group: this.state.group, hasJoinedGroup: this.hasJoinedGroup, 
																								joinGroup: this.joinGroup, currentUser: this.state.currentUser  } );

		return (
			<ReactCSSTransitionGroup transitionName="page"
							transitionAppear={true} transitionAppearTimeout={500}
								transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div class="group-parent-div">
					<GroupNav group={this.state.group} joinButtons={this._joinButtons()} path={this.props.location.pathname}/>
						{children}
				</div>
				<Modal isOpen={this.state.logInIsOpen}
							 onRequestClose={this.closeLogInModal}
							 style={FormStyle}>
					<LogInForm closeModal={this.closeLogInModal} redirectToSignUp={this.redirectToSignUp} />
				</Modal>
				<Modal isOpen={this.state.signUpIsOpen}
							 onRequestClose={this.closeSignUpModal}
							 style={FormStyle}>
					<SignUpForm closeModal={this.closeSignUpModal}/>
				</Modal>
			</ReactCSSTransitionGroup>
		);
	}

});

module.exports = GroupDetail;
