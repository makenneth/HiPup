var React = require('react'),
		CurrentUserStateMixin = require('../mixin/currentUserState'),
		UserActions = require('../actions/userActions'),
		UserStore = require('../stores/userStore'),
		LogInForm = require('./user/logInForm'),
		SignUpForm = require('./user/signUpForm');

var Navbar = React.createClass({
	mixins: [CurrentUserStateMixin],
	getInitialState: function() {
		return {
			active: 0
		};
	},

	componentDidMount: function() {
		this.navListener = UserStore.addListener(this.buttonsForLoggedIn);
	},
	componentWillUnmount: function() {
		if (this.navlistener){
			this.navListener.remove();
		}
	},
	setTab: function(tab) {
		this.setState({active: tab});
		this.props.closeModal();
	},
	buttonsForLoggedIn: function() {
		if (this.state.currentUser){
			return (<ul className="nav-list-user">
								<li className={this.state.active === 2 ? "active" : ""}
										onClick={this.setTab.bind(null, 2)}>
										<a href="#/groups/new">Create Your Group</a>
								</li>
								<li className={this.state.active === 3 ? "active" : ""}
									  onClick={this.setTab.bind(null, 3)}>
									  <a href="#/user/profile">Profile</a>
							  </li>
							  <li className={this.state.active === 4 ? "active" : ""}
									  onClick={this.setTab.bind(null, 4)}>
									  <a href="#">Manage Your Events</a>
							  </li>
						  </ul>);
		}
		return "";
	},
	render: function() {
		return (
			<div>
				<nav className="nav-main">
					<ul className="nav-list cf">
						<li className={this.state.active === 0 ? "active" : ""}
								onClick={this.setTab.bind(null, 0)}><a href="#/">Home</a></li>
						<li className={this.state.active === 1 ? "active" : ""}
								onClick={this.setTab.bind(null, 1)}><a href="#/groups">Groups</a></li>
						{this.buttonsForLoggedIn()}
					</ul>
				</nav>
			</div>
		);
	}

});

module.exports = Navbar;