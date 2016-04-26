var React = require('react'),
		UserActions = require('../../actions/userActions');

var LogInForm = React.createClass({
	getInitialState: function() {
		return {
			username: "",
			password: ""
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		UserActions.signIn(this.state);
		console.log("log in success");
	},
	updateUsername: function(e) {
		this.setState({username: e.target.value});
	},
	updatePassword: function(e) {
		this.setState({password: e.target.value});
	},
	render: function() {
		var LogInButton = this.state.username.length >= 8 && this.state.password.length >= 8 ?
				<input type="submit" className="btn btn-success" value="Log In"/> :
				<input type="submit" className="btn btn-success" value="Log In" disabled/>;
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label for="username">Username</label>
						<input id="username" type="text" value={this.state.username} onChange={this.updateUsername}/ >
					</div>
					<div className="form-group">
						<label for="password">Password</label>
						<input id="password" type="text" value={this.state.password} onChange={this.updatePassword}/ >
					</div>
					{LogInButton}
					<button className="btn" onClick={UserActions.guestLogin}>Guest Login</button>
					<button href="/">Back</button>
				</form>
			</div>
		);
	}

});

module.exports = LogInForm;