import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { removeGroup } from 'redux/modules/group';
import { openConfirm } from 'redux/modules/confirmation';

import './styles.scss';

@connect(() => ({}), { removeGroup, openConfirm })
export default class GroupNav extends Component {
  state = {
    editFormIsOpen: false,
    // message: '',
    // editMode: false,
    // title: '',
  };

  adminNav() {
    return (this.adminCheck() && <ul className="admin-group-nav">
      <li><a onClick={this.props.openNewEventModal}>Create Event</a></li>
      <li><a onClick={this.deleteGroup}>Delete Group</a></li>
    </ul>);
  }

  deleteGroup = () => {
    if (this.props.user) {
      this.props.openConfirm(this.confirmDeleteGroup);
    }
  }

  confirmDeleteGroup = () => {
    this.props.removeGroup(this.props.group.get('id')).then(() => {
      browserHistory.push('/');
    });
  }

  _setMessage(message) {
    this.state.message = message;
  }

  adminCheck() {
    return this.props.user && this.props.group &&
      this.props.group.get('creatorId') === this.props.user.get('id');
  }

  // startEditMode = () => {
  //   this.setState({ editMode: true, title: this.props.group.title });
  // }

  // endEditMode = () => {
  //   this.setState({ editMode: false });
  // }

  // saveChange = () => {
  //   ClientActions.updateGroup({
  //       title: this.state.title
  //     }, this.props.group.id);
  //   this.endEditMode();
  // }

  // updateTitle = (ev) => {
  //   ev.preventDefault();
  //   this.setState({ title: ev.target.value });
  // }

  backToGroup = () => {
    browserHistory.push(`/groups/${this.props.group.get('id')}`);
  }

  title() {
    // if (!this.adminCheck()) {
    return (<div className="nav-div">
      {this.props.group && this.props.group.get('title')}
    </div>);
    // } else {
    //   var titleBox, icon;
    //   if (this.state.editMode){
    //     titleBox = <input type="text" value={this.state.title} onChange={this.updateTitle}/> ;
    //     icon = (<div className="edit" onClick={this.saveChange}>✓</div>);
    //   } else {
    //     titleBox = this.props.group.title;
    //     icon = (<div className="edit" onClick={this.startEditMode}>✎</div>);
    //   }
    //   return (<div className="nav-div cf">
    //     <div className="title-container">
    //       {icon}
    //       {titleBox}
    //     </div>
    //   </div>);
    // }
  }

  joinButton() {
    if ((/events\/\d+$/).test(this.props.path)) return '';
    if (this.adminCheck()) {
      return <div />;
    }

    if (!this.props.user || !this.props.hasJoinedGroup()) {//should be in user store
      return <ul className="join-group" onClick={this.props.joinGroup}>Join Group</ul>
    } else {
      return <ul className="leave-group" onClick={this.props.leaveGroup}>Leave Group</ul>
    }
  }

  render() {
    return (
      <div>
        <div style={{ position: 'relative' }}>
          {this.title()}
          <div className="group-nav-container">
            <ul className="back-nav">
              <li onClick={() => browserHistory.push('/')}>Home</li>
                {
                  (/\/events\/\d+/).test(this.props.path) &&
                    <li onClick={this.backToGroup}>Back To Group</li>
                }
            </ul>
            {this.adminNav()}
            {this.joinButton()}
          </div>
        </div>
      </div>
    );
  }
};
