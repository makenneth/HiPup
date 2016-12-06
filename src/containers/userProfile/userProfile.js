import React, { Component } from "react";
import { connect } from "react-redux";
import { HashHistory } from "react-router";
const Modal = require('react-modal');
const PasswordChange = require('./passwordChange');
const PasswordFormStyle = require('../../modal/passwordFormStyle');
const SuccessMessage = require('../../mixin/successMessage');
const SuccessModalStyle = require("../../modal/successModalStyle");

@connect(({ auth: { user }, location }) => ({ user, location }))
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordModalOpen: false,
      profileEditModalOpen: false,
      successIsOpen: false,
      message: ""
    };
  }

  openPasswordModal() {
    this.setState({ passwordModalOpen: true });
  }
  closePasswordModal() {
    this.setState({ passwordModalOpen: false });
  }
  _setMessage(message) {
    this.setState({ message });
  }
  showSuccessMessage() {
    this.closePasswordModal();
    this.openSuccessModal();
  }
  openSuccessModal() {
    this.setState({ successIsOpen: true });
  }
  closeSuccessModal() {
    this.setState({ successIsOpen: false });
  }

  render() {
    const user = this.props.user;
    return (
      <div className="current-user-profile cf">
        <div className="user-name">{user.name}</div>
        <div className="sub-section">
          <div className="profile-img">
            <img
              src={user.image_url}
              alt={user.name} width="250px"
              height="auto"
            />
          </div>
          <ul className='profile-list'>
            <li>
              <label>Username:</label>
              <div>{user.username}</div>
            </li>
            <li>
              <label>Owner_name:</label>
              <div>{user.owner_name}</div>
            </li>
            <li>
              <label>Email:</label>
              <div>{user.email}</div>
            </li>
            <li>
              <label>Current Location:</label>
              <div>{location.place}</div>
            </li>
            <li>
              <label>Primary Location:</label>
              <div>{user.city + ", " + user.state}</div>
            </li>
            <li className="glist">
              <label>Group Association:</label>
              <ul className="group-list">
                {
                  user.groups.map((group) => {
                    return <li key={group.id}><a href=`/groups/${group.id}`>{group.title}</a></li>;
                  })
                }
              </ul>
            </li>
            </ul>
        </div>
        <div className="profile-edit-button">
          <button
            className="change-password"
            onClick={this.openPasswordModal}>
            Update Password
          </button>
        </div>
        <Modal
          isOpen={this.state.passwordModalOpen}
          onRequestClose={this.state.closePasswordModal}
          style={PasswordFormStyle}
        >
          <PasswordChange
            closeModal={this.closePasswordModal}
            setMessage={this._setMessage}
            showSuccess={this.showSuccessMessage}
          />
         </Modal>
         <Modal
            onRequestClose={this.closeSuccesModal}
            style={SuccessModalStyle}
            isOpen={this.state.successIsOpen}
          >
            <SuccessMessage
              closeModal={this.closeSuccessModal}
              message={this.state.message}
            />
          </Modal>
      </div>
    );
  }
});
