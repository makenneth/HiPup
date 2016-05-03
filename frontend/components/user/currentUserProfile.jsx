var React = require('react'),
		CurrentUserState = require('../../mixin/currentUserState'),
		HashHistory = require('react-router').hashHistory,
		UserStore = require('../../stores/userStore'),
		Modal = require('react-modal'),
		PasswordChange = require('./passwordChange'),
		PasswordFormStyle = require('../../modal/passwordFormStyle'),
		SuccessMessage = require('../../mixin/successMessage'),
		SuccessModalStyle = require("../../modal/successModalStyle");

var CurrentUserProfile = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			passwordModalOpen: false,
			profileEditModalOpen: false,
			successIsOpen: false,
			message: ""
		};
	},
	componentDidMount: function() {
		this.cupListener = UserStore.addListener(this._checkUser);
	},
	_checkUser: function() {
		if (!this.state.currentUser){
			HashHistory.push('/');
		}
	},
	openPasswordModal: function(){
		this.setState({passwordModalOpen: true});
	},
	closePasswordModal: function(){
		this.setState({passwordModalOpen: false});
	},
	_setMessage: function(message){
		this.setState({message: message});
	},
	showSuccessMessage: function(){
		this.closePasswordModal();
		this.openSuccessModal();
	},
	openSuccessModal: function() {
		this.setState({successIsOpen: true});
	},
	closeSuccessModal: function() {
		this.setState({successIsOpen: false});
	},
	componentWillUnmount: function() {
		if (this.cupListener) this.cupListener.remove();
	},
	render: function() {
		var user = this.state.currentUser || {name: "", username: "", groups: []};
		return (
			<div className="current-user-profile cf">
				<div className="user-name">{user.name}</div>
				<div className="sub-section">
					<div className="profile-img"><img 
								src="data:image/jpeg;base64,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" 
								alt={user.name} width="250px" height="auto"/></div>
					<ul className='profile-list'>
						<li><label>Username:</label><div>{user.username}</div></li>
						<li><label>Owner_name:</label><div>{user.owner_name}</div></li>
						<li><label>Email:</label><div>{user.email}</div></li>
						<li><label>Current Location:</label><div>{UserStore.currentLocation().place}</div></li>
						<li><label>Primary Location:</label><div>{user.city + ", " + user.state}</div></li>
						<li><label>Group Association:</label>
							<ul className="group-list">
								{
									user.groups.map(function(group){
										return <li key={group.id}>{group.title}</li>;
									})
								}
							</ul>
						</li>
						</ul>
				</div>
				<div className="profile-edit-button">
					<button className="change-password" 
								  onClick={this.openPasswordModal}>Change Password</button>
					<button className="edit-profile">Update Profile</button>
				</div>
				<Modal isOpen={this.state.passwordModalOpen}
							 onRequestClose={this.state.closePasswordModal}
							 style={PasswordFormStyle}>
							 <PasswordChange closeModal={this.closePasswordModal}
							 		setMessage={this._setMessage} showSuccess={this.showSuccessMessage}/>
				 </Modal>
				 	<Modal onRequestClose={this.closeSuccesModal}
								 style={SuccessModalStyle} isOpen={this.state.successIsOpen}>
						<SuccessMessage closeModal={this.closeSuccessModal}
								message={this.state.message}/>
					</Modal>
			</div>
		);
	}

});

module.exports = CurrentUserProfile;