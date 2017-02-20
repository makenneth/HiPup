import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory, Link } from "react-router";
import { openModal as openSuccessModal } from 'redux/modules/success';
import { updateUser } from 'redux/modules/auth';
import { PasswordChange } from 'components';

import './styles.scss';

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

  showSuccessMessage = (message) => {
    this.closePasswordModal();
    this.props.openSuccessModal(message);
  }

  render() {
    const { user, geolocation } = this.props;
    return (
      <div className="profile-container">
        <div className="current-user-profile cf">
          <div className="user-name">{user.get('name')}</div>
          <div className="sub-section">
            <div className="profile-img">
              <img
                src={user.get('imageUrl')}
                alt={user.get('name')} width="150px"
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
                <div>{user.get('ownerName')}</div>
              </li>
              <li>
                <label>Email:</label>
                <div>{user.get('email')}</div>
              </li>
              <li>
                <label>Current Location:</label>
                <div>{geolocation.getIn(['place', 'city']) + ', ' + geolocation.getIn(['place', 'state']) }</div>
              </li>
              <li>
                <label>Primary Location:</label>
                <div>{user.get('city') + ", " + user.get('state')}</div>
              </li>
            </ul>
          </div>
          <div className="glist">
            <h4>Group Association:</h4>
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
          </div>
          <div className="profile-edit-button">
            <button
              className="change-password"
              onClick={this.openPasswordModal}
            >
              Update Password
            </button>
          </div>
          {
            this.state.passwordModalOpen &&
              <div className="overlay">
                <PasswordChange
                  closeModal={this.closePasswordModal}
                  updateUser={this.props.updateUser}
                  showSuccess={this.showSuccessMessage}
                />
               </div>
          }
        </div>
      </div>
    );
  }
};
