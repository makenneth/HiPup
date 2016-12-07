import React, { Component } from 'react';
import { connect } from "react-redux";
import { asyncConnect } from "redux-async-connect";
import { fetchMember } from "redux/modules/members";

const ReverseGeoMixin = require('../../mixin/reverseGeoMixin');

//or should we use fetchmembers? and cache with redis
@asyncConnect([{
  promise: ({ store, params }) => {
    debugger;
    //find out how to get the id
    let promise;

    if (!memberFetched(store.getState()), id) {
      promise = store.dispatch(fetchMember());
    }

    return promise;
  }
}])
@connect(() => ({ }), { fetchMember })
export default class MemberProfile extends Component {
  // mixins: [ReverseGeoMixin],
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
            <img src={member.image_url} width="250px" height="auto"/>
          </div>
          <div className="user-detail">
            <ul>
              <li><label>Owner's Name:</label><div>{member.owner_name}</div></li>
              <li><label>Location:</label><div>{member.city}, {member.state}</div></li>
              <li><label>Member Since:</label><div>{member.member_since}</div></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
