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
		if (UserStore.currentUser()){
			this.props.closeModal();
		}
	},
	handleSubmit: function(e) {
		if(e) e.preventDefault();
		UserActions.signIn(this.state);
	},
	updateUsername: function(e) {
		this.setState({username: e.target.value});
	},
	updatePassword: function(e) {
		this.setState({password: e.target.value});
	},
	guestLogin: function(e) {
		e.preventDefault();
		this.setState({username: "", password: ""})
		this.ghostFill();
	},
	ghostFill: function(){
		var sampleUsername = "sampleuser", samplePassword = "password",
				usernameCount = 0, passwordCount = 0;
		var intervalKey = setInterval(function(){
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
		var isDisabled = this.state.password.length >= 8;

		return (
			<div className="form-div">
				<div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
				<div className="log-in-errors">{UserStore.errors().join(", ")}</div>
				<h3>Log In</h3>
				<form className="user-forms" onSubmit={this.handleSubmit}>
					<div className="form-line cf">
						<label for="username">Username</label>
						<input id="username" type="text" 
								value={this.state.username} onChange={this.updateUsername} 
								 required/>
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
			</div>
		);
	}

});

module.exports = LogInForm;