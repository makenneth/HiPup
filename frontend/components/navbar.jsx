var React = require('react'),
		CurrentUserStateMixin = require('../mixin/currentUserState'),
		UserActions = require('../actions/userActions'),
		UserStore = require('../stores/userStore');

var Navbar = React.createClass({
	mixins: [CurrentUserStateMixin],
	getInitialState: function() {
		return {
			active: 0,
			logInModalOpen: false,
			signUpModalOpen: false
		};
	},
	openLogInModal: function() {
		this.setState({ logInModalOpen: true,
									  signUpModalOpen: false });
	},
	closeLogInModal: function() {
		this.setState({ logInModalOpen: false });
	},
	openSignInModal: function() {
		this.setState({ signUpModalOpen: true,
									  logInModalOpen: false });
	},
	closeSignInModal: function() {
		this.setState({ signUpModalOpen: false });
	},
	componentDidMount: function() {
		this.listener = UserStore.addListener(this.buttonsForLoggedIn);
	},
	componentWillUnmount: function() {
		this.listener.remove();
	},
	setTab: function(tab) {
		this.setState({active: tab});
	},
	logOut: function() {
		UserActions.logOut();
	},
	userButtons: function() {
		if (this.state.currentUser){
			return (<ul className="nav-list-right">
				<li><a>Welcome, {this.state.currentUser.name}!</a></li>
				<li><a onClick={this.logOut}>Log Out</a></li>
			</ul>);
		} else {
			return (<ul className="nav-list-right">
				<li><a onClick={this.openLogInModal}>Log In</a></li>
				<li><a onClick={this.openSignUpModal}>Sign Up</a></li>
			</ul>);
		}
	},
	buttonsForLoggedIn: function() {
		if (this.state.currentUser){
			return (<li className={this.state.active === 2 ? "active" : ""}
									onClick={this.setTab.bind(null, 2)}>
									<a href="#/groups/new">Create Your Group</a>
							</li>);
		}
		return "";
	},
	render: function() {
		return (
			<nav className="nav-main">
				<ul className="nav-list cf">
					<li className={this.state.active === 0 ? "active" : ""}
							onClick={this.setTab.bind(null, 0)}><a href="#/">Home</a></li>
					<li className={this.state.active === 1 ? "active" : ""}
							onClick={this.setTab.bind(null, 1)}><a href="#/groups">Groups</a></li>
					{this.buttonsForLoggedIn()}
				</ul>
					{this.userButtons()}
			</nav>
		);
	}

});

module.exports = Navbar;