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
			<div>
				<h3>Log In</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label for="username">Username</label>
						<input id="username" type="text" value={this.state.username} onChange={this.updateUsername}/ >
					</div>
					<div className="form-group">
						<label for="password">Password</label>
						<input id="password" type="text" value={this.state.password} onChange={this.updatePassword}/ >
					</div>
					<input type="submit" className="btn btn-success" value="Log In" disabled={!isDisabled}/>
				</form>
					<button className="btn btn-info" onClick={this.guestLogin}>Guest Login</button>
			</div>
		);
	}

});

module.exports = LogInForm;