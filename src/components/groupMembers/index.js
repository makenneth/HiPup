import React, { Component } from 'react';
import MemberProfile from './MemberProfile';

import './profile.less';

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

  participantSample = (size) => {
    const sample = [];
    const participants = this.props.group.get('participants');
    const groupSize = participants.size;
    if (!groupSize) {
      return sample;
    }
    const used = {};


    for (let i = 0; i < size; i++) {
      let sampleIdx = Math.floor(Math.random() * groupSize);
      while (used[sampleIdx]) {
        sampleIdx = Math.floor(Math.random() * groupSize);
      }
      sample.push(participants[sampleIdx]);
      used[sampleIdx] = true;
    }

    return sample;
  }

  render() {
    return (
      <div>
        <h3>Members:</h3>
          <ul className="member-list">
          {
            this.participantSample(8).map((participant) => {
              return (
                <li
                  onClick={() => this.openModal(participant.id)}
                  key={participant.id }
                >
                  <div
                    className="mini-pic"
                    style={{
                      backgroundImage: `url(${participant.image_url})`,
                      backgroundSize: `cover`
                    }} />
                  <div className="mini-pic-name">{participant.name}</div>
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
