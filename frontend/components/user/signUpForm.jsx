var React = require('react'),
		UserActions = require('../../actions/userActions'),
		UserStore = require('../../stores/userStore'),
		HashHistory = require('react-router').hashHistory,
		Autocomplete = require('../../mixin/autoComplete');

var SignUpForm = React.createClass({
	mixins: [Autocomplete],
	getInitialState: function() {
		return {
			name: "",
			username: "",
			owner_name: "",
			email: "",
			password: "",
			state: "",
			city: "",
			lat: 0,
			lng: 0
		};
	},
	componentDidMount: function() {
		UserStore.addListener(this._onLogIn);
	},
	_onLogIn: function() {
		this.props.closeModal();
	},
	updateField: function(field, e){
		var stateObj = {};
		stateObj[field] = e.target.value;
		this.setState(stateObj);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		UserActions.signUp(this.state);
		// GeocodingMixin.getCoords(this.state.city, this.state.state);
	},
	// submitForm: function(coords){
	// 	User.setState({lat: coords.lat, lng: coords.lng});
	// },
	handleError: function(err) {
		this.errors = err;
	},
	render: function() {
		var passwordConditions = "Minimum 8 characters in length\nContain at least one uppercase letter\n"
		+ "Contain at least one lowercase letter\nContain at least one number\n" 
		+ "Contain at least one special characters _!@#*&$."
		return (
			<div className="form-div">
				<div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
				<h3>Sign Up</h3>
				<form className="user-forms" onSubmit={this.handleSubmit}>
					<div className="form-line cf">
						<label for="name">My Name</label>
						<input type="text" id="name" 
							value={this.state.name} onChange={this.updateField.bind(null, "name")}
							required />
					</div>
					<div className="form-line cf">
						<label for="owner-name">Owner's Name</label>
						<input type="text" id="owner-name" 
							value={this.state.owner_name} onChange={this.updateField.bind(null, "owner_name")}
							required />
					</div>
					<div className="form-line cf">
						<label for="username">Username</label>
						<input type="text" id="username" 
							value={this.state.username} onChange={this.updateField.bind(null, "username")}
							title="At least 8 characters long"
							required pattern=".{8,}"/>
					</div>
					<div className="form-line cf">
						<label for="email">E-mail</label>
						<input type="email" id="email" 
							value={this.state.email} onChange={this.updateField.bind(null, "email")}
							required/>
					</div>
					<div className="form-line cf">
						<label for="password">Password</label>
						<input type="password" id="password" title={passwordConditions}
							value={this.state.password} onChange={this.updateField.bind(null, "password")}
							required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[._!@#*&$-])[a-zA-Z0-9_!@#*&$.-]{8,}$"/>
					</div>					
					<div className="form-line cf">
						<label for="autocomplete">City</label>
						 <input type="text" id="autocomplete" 
						 				value={this.state.city} onChange={this.updateField.bind(null, "city")}
						 				required />
					</div>
					<div className="form-line cf">
						<label for="state">State</label>
						 <input type="text" id="state" 
						 				value={this.state.state} onChange={this.updateField.bind(null, "state")}
						 				required />
					</div>
					<div className="errors">{this.errors}</div>

					<input type="submit" className="button-create" value="Create Account"/>
				</form>
			</div>
		);
	}

});

module.exports = SignUpForm;