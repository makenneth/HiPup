import React, { Component } from 'react';
import { connect } from "react-redux";
import { asyncConnect } from "redux-async-connect";
import GroupNav from '../GroupNav';
import { fetchGroup, joinGroup, isLoaded } from 'redux/modules/group';
import { openLogIn } from 'redux/modules/form';

@connect(({ auth, geolocation, group }) => ({
  user: auth.get('user'),
  location: geolocation.get('location'),
  group: group,
}), { fetchGroup, joinGroup, openLogIn })
export default class GroupDetail extends Component {
  componentWillMount() {
    if (!isLoaded(this.props.group, this.props.params.groupId)) {
      this.props.fetchGroup(this.props.params.groupId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.groupId !== nextProps.params.groupId) {
      if (!isLoaded(this.props.group, this.props.params.groupId)) {
        this.props.fetchGroup(nextProps.params.groupId);
      }
    }
  }

  joinGroup = (callback) => {
    if (this.props.user && !this.hasJoinedGroup()) {
      this.props.joinGroup(this.props.group.get('id'));
      // if ({}.toString.call(callback) === '[object Array]') callback();
    } else {
      this.props.openLogIn();
    }
  }

  leaveGroup = () => {
    if (this.props.user && this.hasJoinedGroup()) {
      this.props.leaveGroup(this.props.group.getIn(['group', 'id']));
    }
  }

  hasJoinedGroup() {
    return this.props.group && this.props.user &&
      !!this.props.user.groups
        .find(group => this.props.group.getIn(['group', 'id']) === group.get('id'));
  }

  render() {
    return (
      <div className="group-parent-div">
        <GroupNav
          group={this.props.group && this.props.group.get('group')}
          joinGroup={this.joinGroup}
          leaveGroup={this.leaveGroup}
          path={this.props.location.pathname}
          user={this.props.user}
        />
        {this.props.children}
      </div>
    );
  }
};
