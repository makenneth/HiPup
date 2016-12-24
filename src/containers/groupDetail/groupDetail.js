import React, { Component } from 'react';
import { connect } from "react-redux";
import { asyncConnect } from "redux-async-connect";
import GroupNav from './groupNav';
// import LogInForm from '../user/logInForm';
// import SignUpForm from '../user/signUpForm';
// import FormStyle from '../../modal/formStyle';
import { fetchGroup, joinGroup } from 'redux/modules/groups';
import { openLogIn } from 'redux/modules/form';

@connect(({ auth, geolocation }) => {
  user: auth.get('user'),
  location: geolocation.get('location')
}, { fetchGroup, joinGroup, openLogIn })
export default class GroupDetail extends Component {
  // componentDidMount() {
  //   this.props.fetchGroup(this.props.params.groupId, this.props.location.timeZone);
  // }

  componentWillReceiveProps(nextProps) {
    // if (this.props.params.groupId !== nextProps.params.groupId) {
    //   this.props.fetchGroup(nextProps.params.groupId);
    // }
  }

  joinGroup = (callback) => {
    if (this.props.user && !this.hasJoinedGroup()) {
      this.props.joinGroup(this.props.group.id);
      // this.props.fetchGroup(this.props.params.groupId, LocationStore.currentLocation().timeZone);
      if ({}.toString.call(callback) === '[object Array]') callback();
    } else {
      this.props.openLogIn();
    }
  }

  leaveGroup = () => {
    if (this.props.user && this.hasJoinedGroup()) {
      this.props.leaveGroup(this.props.group.id);
      // this.props.fetchGroup(this.props.params.groupId, LocationStore.currentLocation().timeZone);
    }
  }

  hasJoinedGroup() {
    return this.props.user && !!this.props.user.groups.find(group => this.props.selected.id === group.id);
  }

  render() {
    return (
      <div className="group-parent-div">
        <GroupNav
          group={this.props.group}
          joinGroup={this.joinGroup}
          leaveGroup={this.leaveGroup}
          path={this.props.location.pathname}
        />
        {this.props.children}
      </div>
    );
  }
};
