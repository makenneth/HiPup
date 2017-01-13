import React, { Component } from 'react';
import MemberProfile from '../MemberProfile';
import { immutableSample } from 'helpers';

import './profile.scss';

export default class GroupMembers extends Component {
  state = {
    modalIsOpen: false,
    selectedUserId: null,
  };

  openModal = (id) => {
    this.setState({ modalIsOpen: true, selectedUserId: id });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <h3>Members:</h3>
          <ul className="member-list">
          {
            immutableSample(this.props.group.get('participants'), 8).map((participant) => {
              return (
                <li
                  onClick={() => this.openModal(participant.get('id'))}
                  key={participant.get('id')}
                >
                  <div
                    className="mini-pic"
                    style={{
                      backgroundImage: `url(${participant.get('imageUrl')})`,
                      backgroundSize: `cover`
                    }} />
                  <div className="mini-pic-name">{participant.get('name')}</div>
                </li>
              );
            })
          }
        </ul>
        {
          this.state.modalIsOpen &&
            <div className="overlay">
              <div className="profile">
                <MemberProfile
                  userId={this.state.selectedUserId}
                  closeModal={this.closeModal}
                />
              </div>
            </div>
        }
      </div>
    );
  }
};
