import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchGroupMembers } from 'redux/modules/members';
import moment from 'moment';

import './styles.scss';

@connect(({ members }) => ({
  cached: members.get('cached'),
  isLoading: members.get('isLoading'),
}), { fetchGroupMembers })
export default class MemberProfile extends Component {
  componentDidMount() {
    if (!this.props.cached.get(this.props.userId)) {
      this.props.fetchGroupMembers(this.props.groupId);
    }
  }

  render() {
    const { cached, isLoading, userId } = this.props;
    const member = cached.get(this.props.userId.toString());
    if (!member) {
      return (
        <div className="user-profile">
          {isLoading && <div className="spinner-loader" />}
          {!isLoading && <h3>Error fetching the member</h3>}
        </div>
      );
    }
    return (
      <div className="user-profile">
        <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <div className="user-name">My name is {member.get('name')}</div>
        <div className="profile-detail">
          <img src={member.get('imageUrl')} width="250px" height="auto"/>
          <div className="user-detail">
            <ul>
              <li><label>Owner's Name:</label><div>{member.get('ownerName')}</div></li>
              <li><label>Location:</label><div>{member.get('city')}, {member.get('state')}</div></li>
              <li><label>Member Since:</label><div>{moment(member.get('createdAt')).fromNow()}</div></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
