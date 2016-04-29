var React = require('react'),
		UserActions = require('../../actions/userActions'),
		HashHistory = require('react-router').hashHistory,
		UserStore = require('../../stores/userStore');

var LogInForm = React.createClass({
	getInitialState: function() {
		return {
			username: "",
			password: ""
		};
	},
	componentDidMount: function() {
		UserStore.addListener(this._onLogIn);
	},
	_onLogIn: function() {
		this.props.closeModal();
	},
	handleSubmit: function(e) {
		e.preventDefault();
		UserActions.signIn(this.state);
	},
	updateUsername: function(e) {
		this.setState({username: e.target.value});
	},
	updatePassword: function(e) {
		this.setState({password: e.target.value});
	},
	guestLogin: function(e) {
		this.setState({username: "sampleuser", password: "password"});
	},
	render: function() {
		var isDisabled = this.state.password.length >= 8;
		return (
			<div className="form-div">
				<h3>Log In</h3>
				<form className="user-forms" onSubmit={this.handleSubmit}>
					<div className="form-line cf">
						<label for="username">Username</label>
						<input id="username" type="text" value={this.state.username} onChange={this.updateUsername} />
					</div>
					<div className="form-line cf">
						<label for="password">Password</label>
						<input id="password" type="text" value={this.state.password} onChange={this.updatePassword} />
					</div>
					<input type="submit" className="button-login" value="Log In" disabled={!isDisabled}/>
					<button className="guest-login" onClick={this.guestLogin}>Guest Login</button>
				</form>
			</div>
		);
	}

});

module.exports = LogInForm;