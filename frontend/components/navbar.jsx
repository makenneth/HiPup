var React = require('react'),
		CurrentUserStateMixin = require('../mixin/currentUserState'),
		UserActions = require('../actions/userActions'),
		UserStore = require('../stores/userStore');

var Navbar = React.createClass({
	mixins: [CurrentUserStateMixin],
	getInitialState: function() {
		return {
			active: 0 
		};
	},
	componentDidMount: function() {
		this.listener = UserStore.addListener(buttonsForLoggedIn);
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
			return (<ul className="nav navbar-nav navbar-right">
				<li><a>Welcome, {this.state.currentUser.name}!</a></li>
				<li><a onClick={this.logOut}>Log Out</a></li>
			</ul>);
		} else {
			return (<ul className="nav navbar-nav navbar-right">
				<li><a href="#/session/new">Log In</a></li>
				<li><a href="#/user/new">Sign Up</a></li>
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
			<nav className="navbar navbar-inverse">
				<ul className="nav navbar-nav">
					<li className={this.state.active === 0 ? "active" : ""}
							onClick={this.setTab.bind(null, 0)}><a href="#/">Home</a></li>
					<li className={this.state.active === 1 ? "active" : ""}
							onClick={this.setTab.bind(null, 1)}><a href="#/groups">Groups</a></li>
					{this.buttonsForLoggedIn()}
				</ul>
				<ul className="nav navbar-nav navbar-right">
					{this.userButtons()}
				</ul>
			</nav>
		);
	}

});

module.exports = Navbar;