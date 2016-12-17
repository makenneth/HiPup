import React, { Component } from 'react';
import { connect } from "react-redux";
import { asyncConnect } from "redux-async-connect";
import GroupNav from './groupNav';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LogInForm from '../user/logInForm';
import SignUpForm from '../user/signUpForm';
import FormStyle from '../../modal/formStyle';
// import Modal from 'react-modal';

@connect(({ auth: { user }, location }) => { user, location }, { fetchSingleGroup })
export default class GroupDetail extends Component {
  state = {
    group: {
      title: undefined,
      description: undefined,
      tags: [],
      old_events: [],
      upcoming_events: [],
      participants: [],
    }
  };

  componentDidMount() {
    this.props.fetchSingleGroup(this.props.params.groupId, this.props.location.timeZone);
  }

  componentWillReceiveProps(nextProps) {
    this.props.fetchSingleGroup(nextProps.params.groupId, this.props.location.timeZone);
  }

  joinGroup = (callback) => {
    if (this.props.user && !this.hasJoinedGroup()) {
      ClientActions.joinGroup(this.state.currentUser.id, this.state.group.id);
      ClientActions.fetchSingleGroup(this.props.params.groupId, LocationStore.currentLocation().timeZone);
      if (Object.prototype.toString.call(callback) === '[object Array]') callback();
    } else {
      this.setState({ logInIsOpen: true });
    }
  }

  leaveGroup = () => {
    if (this.state.currentUser && this.hasJoinedGroup()) {
      ClientActions.leaveGroup(this.state.currentUser.id, this.state.group.id);
      ClientActions.fetchSingleGroup(this.props.params.groupId, LocationStore.currentLocation().timeZone);
    }
  }

  _joinButtons() {
    if ((/events\/\d+$/).test(this.props.location.pathname)) return "";
    if (!this.state.currentUser || !this.hasJoinedGroup()) {//should be in user store
      return <ul className="join-group" onClick={this.joinGroup}>Join Group</ul>
    } else {
      return <ul className="leave-group" onClick={this.leaveGroup}>Leave Group</ul>
    }
  }

  hasJoinedGroup() {
    if (!this.state.currentUser) return false;
    var groups = this.state.currentUser.groups;
    for (var i = 0; i < groups.length; i++) {
      if (groups[i].id === this.state.group.id){
        return true;
      }
    }
    return false;
  }

  render() {
    var children = !this.props.children ? this.props.children :
      React.cloneElement(this.props.children, { group: this.state.group, hasJoinedGroup: this.hasJoinedGroup,
                                                joinGroup: this.joinGroup, currentUser: this.state.currentUser  } );

    return (
      <div className="group-parent-div">
        <GroupNav group={this.state.group} joinButtons={this._joinButtons()} path={this.props.location.pathname}/>
          {children}
      </div>
    );
  }
};
