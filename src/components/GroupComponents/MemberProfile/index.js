import React, { Component } from 'react';
import { connect } from "react-redux";
// import { asyncConnect } from "redux-async-connect";
// import { fetchMember } from "redux/modules/members";

// const ReverseGeoMixin = require('../../mixin/reverseGeoMixin');

// @connect(() => ({ }), { fetchMember })
export default class MemberProfile extends Component {
  render() {
    const member = this.props.findMember(this.props.memberId);
    if (!member) {
      return (
        <div className="user-profile">
          <h3>Error fetching the member</h3>
        </div>
      );
    }
    return (
      <div className="user-profile">
        <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <div className="user-name">My name is {member.name}</div>
        <div className="profile-detail">
          <div className="profile-pic">
            <img src={member.imageUrl} width="250px" height="auto"/>
          </div>
          <div className="user-detail">
            <ul>
              <li><label>Owner's Name:</label><div>{member.ownerName}</div></li>
              <li><label>Location:</label><div>{member.city}, {member.state}</div></li>
              <li><label>Member Since:</label><div>{member.memberSince}</div></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
