const React = require('react');
const UserActions = require('../../actions/userActions');
const UserStore = require('../../stores/userStore');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const LogInForm = React.createClass({
	getInitialState: function() {
		return {
			username: "",
			password: ""
		};
	},
	componentDidMount: function() {
		UserStore.addListener(this._onLogIn);
		setTimeout(() => {
			this.refs["username"].focus()
		}, 100);

	},
	_onLogIn: function() {
		if (UserStore.currentUser()) {
			this.props.closeModal();
		}
	},
	redirectToSignUp: function() {
		this.props.redirectToSignUp();
	},
	handleSubmit: function(e) {
		if(e) e.preventDefault();
		UserActions.signIn(this.state);
	},
	updateUsername: function(e) {
		this.setState({ username: e.target.value });
	},
	updatePassword: function(e) {
		this.setState({ password: e.target.value });
	},
	guestLogin: function(e) {
		e.preventDefault();
		this.setState({ username: "", password: "" });
		this.ghostFill();
	},
	ghostFill: function() {
		const sampleUsername = "sampleuser";
		const samplePassword = "password";
		let usernameCount = 0;
		let passwordCount = 0;
		const intervalKey = setInterval(function(){
			if (usernameCount < 10){
				this.setState({
					username: this.state.username + sampleUsername[usernameCount]
				});
				usernameCount++;
			} else if (passwordCount < 8){
				this.setState({
					password: this.state.password + samplePassword[passwordCount]
				})
				passwordCount++;
			} else {
				clearInterval(intervalKey);
				this.handleSubmit();
			}
		}.bind(this), 100)
	},
	render: function() {
		const isDisabled = this.state.password.length >= 8;

		return (
			<ReactCSSTransitionGroup transitionName="forms"
				transitionAppear={true} transitionAppearTimeout={500}
					transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div className="form-div">
					<div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
					<div className="log-in-errors">{UserStore.errors().join(", ")}</div>
					<h3>Log In</h3>
					<form className="user-forms" onSubmit={this.handleSubmit}>
						<div className="form-line cf">
							<label for="username">Username</label>
							<input
								id="username" type="text"
								ref="username" value={this.state.username}
								onChange={this.updateUsername} required
							/>
						</div>
						<div className="form-line cf">
							<label for="password">Password</label>
							<input id="password" type="password"
											value={this.state.password} onChange={this.updatePassword}
											required/>
						</div>
						<div className="form-btn-div cf">
							<input type="submit" className="button-login" value="Log In" disabled={!isDisabled}/>
							<button className="guest-login" onClick={this.guestLogin}>Guest Login</button>
						</div>
					</form>
					<div className="redirect">Don't have an account yet? <a onClick={this.redirectToSignUp}>Sign Up</a></div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
});

module.exports = LogInForm;
