var React = require('react'),
		UserStore = require('../../stores/userStore'),
		ErrorStore = require('../../stores/errorStore'),
		UserActions = require('../../actions/userActions');
var PasswordChange = React.createClass({
	getInitialState: function() {
		return {
			newPassword: "",
			oldPassword: "",
			newPasswordRepeat: "",
			errors: []
		};
	},
	componentDidMount: function() {
		this.pcListener = UserStore.addListener(this._passwordChanged);
		this.erListener = UserStore.addListener(this._errorReceived);
	},
	componentWillUnmount: function() {
		if (this.pcListener) this.pcListener.remove();
		if (this.erListener) this.erListener.remove();
	},
	_passwordChanged: function() {
		this.props.closeModal();
	},
	_errorReceived: function() {
		this.setState({errors: ErrorStore.getError()});
	},
	setField: function(field, e){
		var fieldObj = {};
		fieldObj[field] = e.target.value;
		this.setState(fieldObj);
	},
	passwordCheck: function() {
		if (!(this.state.newPassword === this.state.newPasswordRepeat)){
			
		}
	},
	handleSubmit: function(e) {
		e.preventDefault();
		UserActions.updateUser({
			new_password: this.state.newPassword
			old_password: this.state.oldPassword
		});
	},
	render: function() {
		var passwordConditions = "Minimum 8 characters in length\nContain at least one uppercase letter\n"
			+ "Contain at least one lowercase letter\nContain at least one number\n" 
			+ "Contain at least one special characters _!@#*&$.";
		return (
			<div>
				<h3>Update Password</h3>
				<div className="password-errors">
					{
						this.state.errors.map(function(error){
							return <li>{error}</li>;
						})
					}
				</div>
				<form id="change-password" onSubmit={this.handleSubmit}>
					<label for="old-password">Old Password</label>
					<input id="old-password" type="password"
								 value={this.state.oldPassword}
								 onChange={this.setField.bind(null, "oldPassword")}
								 requied>
					<label for="new-password">New Password</label>
					<input  title={passwordConditions} id="new-password" type="password"
									value={this.state.newPassword}
									onChange={this.setField.bind(null, "newPassword")}
									required 
									pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.[_!@#*&$.-])[_!@#*&$.-A-Za-z0-9]{8,}$">
					<label for="new-password-repeat">Repeat You Password</label>
					<input id="new-password-repeat" type="password"
								 value={this.state.newPasswordRepeat}
								 onChange={this.setField.bind(null, "newPasswordRepeat")
								 required
								 pattern={this.state.newPassword} }>
					<input type="submit" value="Change Password"/>
			</div>

		);
	}

});

module.exports = PasswordChange;