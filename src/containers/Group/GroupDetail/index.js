import React, { Component } from 'react';
import { connect } from "react-redux";
import { asyncConnect } from "redux-async-connect";
import GroupNav from '../GroupNav';
import { NewEvent } from 'components';
import { fetchGroup, joinGroup, leaveGroup, isLoaded } from 'redux/modules/group';
import { createGroupEvent } from 'redux/modules/groupEvents';
import { openLogIn } from 'redux/modules/form';

import './styles.scss';

@connect(({ auth, geolocation, group }) => ({
  user: auth.get('user'),
  location: geolocation.get('location'),
  group: group,
}), { fetchGroup, joinGroup, leaveGroup, openLogIn })
export default class GroupDetail extends Component {
  state = {
    newEventModalOpen: false,
  };

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

  openModal = () => this.setState({ newEventModalOpen: true })
  closeModal = () => this.setState({ newEventModalOpen: false })


  joinGroup = (callback) => {
    if (this.props.user && !this.hasJoinedGroup()) {
      this.props.joinGroup(this.props.group.getIn(['group', 'id']));
      if (typeof callback === 'function') callback();
    } else {
      this.props.openLogIn();
    }
  }

  leaveGroup = () => {
    if (this.props.user && this.hasJoinedGroup()) {
      this.props.leaveGroup(this.props.group.getIn(['group', 'id']));
    }
  }

  hasJoinedGroup = () => {
    return this.props.group && this.props.user &&
      Boolean(this.props.user.get('groups')
        .find(group => this.props.group.getIn(['group', 'id']) === group.get('id')));
  }

  render() {
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        joinGroup: this.joinGroup,
        hasJoinedGroup: this.hasJoinedGroup,
      })
    );
    const { user, group } = this.props;
    return (
      <div className="group-parent-div">
        <GroupNav
          group={group && group.get('group')}
          openNewEventModal={this.openModal}
          joinGroup={this.joinGroup}
          hasJoinedGroup={this.hasJoinedGroup}
          leaveGroup={this.leaveGroup}
          path={this.props.location.pathname}
          user={user}
        />
        {children}
        {
          this.state.newEventModalOpen &&
            <NewEvent
              user={user}
              group={group}
              closeModal={this.closeModal}
              createGroupEvent={this.props.createGroupEvent}
            />
        }
      </div>
    );
  }
};
