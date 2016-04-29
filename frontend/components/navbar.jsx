var React = require('react'),
		CurrentUserStateMixin = require('../mixin/currentUserState'),
		UserActions = require('../actions/userActions'),
		UserStore = require('../stores/userStore'),
		LogInForm = require('./user/logInForm'),
		SignUpForm = require('./user/signUpForm'),
		HashHistory = require('react-router').hashHistory;

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
	setTab: function(tab, url) {
		this.setState({active: tab});
		HashHistory.push(url);
		this.props.closeModal();
	},
	buttonsForLoggedIn: function() {
		if (this.state.currentUser){
			return (<ul className="nav-list-user">
								<li className={this.state.active === 2 ? "active" : ""}
										onClick={this.setTab.bind(null, 2, "group/new")}>
										Create Your Group</li>
								<li className={this.state.active === 3 ? "active" : ""}
									  onClick={this.setTab.bind(null, 3, "user/profile")}>
									  Profile</li>
							  <li className={this.state.active === 4 ? "active" : ""}
									  onClick={this.setTab.bind(null, 4, "")}>
									  Manage Your Events</li>
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
								onClick={this.setTab.bind(null, 0, "/")}>Home</li>
						<li className={this.state.active === 1 ? "active" : ""}
								onClick={this.setTab.bind(null, 1, "groups")}>Search By</li>
						{this.buttonsForLoggedIn()}
					</ul>
				</nav>
			</div>
		);
	}

});

module.exports = Navbar;