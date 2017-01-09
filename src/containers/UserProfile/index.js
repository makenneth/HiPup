import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import { openModal as openSuccessModal } from 'redux/modules/success';
import { updateUser } from 'redux/modules/user';
// const PasswordChange = require('./passwordChange');
// const PasswordFormStyle = require('../../modal/passwordFormStyle');
// const SuccessMessage = require('../../mixin/successMessage');
// const SuccessModalStyle = require("../../modal/successModalStyle");

@connect(({ auth, geolocation }) =>
  ({ user: auth.get('user'), geolocation: geolocation.get('location') }),
  ({ openSuccessModal, updateUser })
)
export default class UserProfile extends Component {
  state = {
    passwordModalOpen: false,
    // profileEditModalOpen: false,
    message: '',
  };

  openPasswordModal = () => {
    this.setState({ passwordModalOpen: true });
  }

  closePasswordModal = () => {
    this.setState({ passwordModalOpen: false });
  }

  _setMessage = (message) => {
    this.setState({ message });
  }

  showSuccessMessage() {
    this.closePasswordModal();
    this.props.openSuccessModal();
  }

  render() {
    const user = this.props.user;
    return (
      <div className="current-user-profile cf">
        <div className="user-name">{user.get('name')}</div>
        <div className="sub-section">
          <div className="profile-img">
            <img
              src={user.get('image_url')}
              alt={user.get('name')} width="250px"
              height="auto"
            />
          </div>
          <ul className='profile-list'>
            <li>
              <label>Username:</label>
              <div>{user.get('username')}</div>
            </li>
            <li>
              <label>Owner_name:</label>
              <div>{user.get('owner_name')}</div>
            </li>
            <li>
              <label>Email:</label>
              <div>{user.get('email')}</div>
            </li>
            <li>
              <label>Current Location:</label>
              <div>{location.get('place')}</div>
            </li>
            <li>
              <label>Primary Location:</label>
              <div>{user.get('city') + ", " + user.get('state')}</div>
            </li>
            <li className="glist">
              <label>Group Association:</label>
              <ul className="group-list">
                {
                  user.get('groups').map((group) => {
                    return (<li key={group.get('id')}>
                      <Link to={`/groups/${group.get('id')}`}>
                        {group.get('title')}
                      </Link>
                    </li>);
                  })
                }
              </ul>
            </li>
            </ul>
        </div>
        <div className="profile-edit-button">
          <button
            className="change-password"
            onClick={this.openPasswordModal}
          >
            Update Password
          </button>
        </div>
        <div className="overlay">
          {
            this.state.passwordModalOpen &&
              <PasswordChange
                closeModal={this.closePasswordModal}
                updateUser={this.props.updateUser}
                showSuccess={this.props.openSuccessModal}
              />
          }
         </Modal>
      </div>
    );
  }
};

