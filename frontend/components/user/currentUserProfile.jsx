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
								src={user.image_url}
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
