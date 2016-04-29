var React = require('react'),
		UserActions = require('../../actions/userActions'),
		UserStore = require('../../stores/userStore'),
		HashHistory = require('react-router').hashHistory;

var SignUpForm = React.createClass({
	getInitialState: function() {
		return {
			name: "",
			username: "",
			owner_name: "",
			email: "",
			password: "",
			lat: 0,
			lng: 0 
		};
	},
	componentDidMount: function() {
		navigator.geolocation.getCurrentPosition(this.setPosition);
		UserStore.addListener(this._onLogIn);
	},
	_onLogIn: function() {
		this.props.closeModal();
	},
	setPosition: function(pos) {
		this.setState({lat: pos.coords.latitude, lng: pos.coords.longitude });
	},
	updateName: function(e) {
		this.setState({name: e.target.value});
	},
	updateUsername: function (e){
		this.setState({username: e.target.value});
	},
	updateEmail: function(e) {
		this.setState({email: e.target.value});
	},
	updatePassword: function(e) {
		this.setState({password: e.target.value});
	},
	updateOwnerName: function(e) {
		this.setState({owner_name: e.target.value});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		UserActions.signUp(this.state);
	},
	render: function() {
		return (
			<div className="form-div">
				<div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
				<h3>Sign Up</h3>
				<form className="user-forms" onSubmit={this.handleSubmit}>
					<div className="form-line cf">
						<label for="name">My Name</label>
						<input type="text" id="name" 
							value={this.state.name} onChange={this.updateName}/>
					</div>
					<div className="form-line cf">
						<label for="owner-name">Owner's Name</label>
						<input type="text" id="owner-name" 
							value={this.state.owner_name} onChange={this.updateOwnerName}/>
					</div>
					<div className="form-line cf">
						<label for="username">Username</label>
						<input type="text" id="username" 
							value={this.state.username} onChange={this.updateUsername}/>
					</div>
					<div className="form-line cf">
						<label for="email">E-mail</label>
						<input type="email" id="email" 
							value={this.state.email} onChange={this.updateEmail}/>
					</div>
					<div className="form-line cf">
						<label for="password">Password</label>
						<input type="password" id="password" 
							value={this.state.password} onChange={this.updatePassword}/>
					</div>

					<input type="submit" className="button-create" value="Create Account"/>
				</form>
			</div>
		);
	}

});

module.exports = SignUpForm;