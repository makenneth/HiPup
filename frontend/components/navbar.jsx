var React = require('react'),
		CurrentUserStateMixin = require('../mixin/currentUserState'),
		UserActions = require('../actions/userActions'),
		UserStore = require('../stores/userStore'),
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
	openLogInModal: function(){
		this.props.closeModal();
		this.props.openLogInModal();
	},
	buttonsForLoggedIn: function() {
		if (this.state.currentUser){
			return (<ul className="nav-list-user">
								<li className={this.state.active === 2 ? "active" : ""}
										onClick={this.setTab.bind(null, 2, "groups/new")}>
										Create Your Group</li>
								<li className={this.state.active === 3 ? "active" : ""}
									  onClick={this.setTab.bind(null, 3, "user/profile")}>
									  Profile</li>
							  <li className={this.state.active === 4 ? "active" : ""}
									 onClick={this.setTab.bind(null, 4, "user/events")}>
									  Manage Your Events</li>
								<li className="log-out" onClick={UserActions.logOut}>Log Out</li>
						  </ul>);
		}
		return "";
	},
	render: function() {
		return (
				<nav className="nav-main">
					<ul className="nav-list cf">
						<li className={this.state.active === 0 ? "active" : ""}
								onClick={this.setTab.bind(null, 0, "/")}>Home</li>
						{
							this.state.currentUser ? "" :
							<li onClick={this.openLogInModal}>Please Sign In</li>
							
						}
						{this.buttonsForLoggedIn()}
					</ul>
				</nav>
		);
	}

});

module.exports = Navbar;
