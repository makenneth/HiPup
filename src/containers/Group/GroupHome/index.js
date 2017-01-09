import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { GroupEvents, GroupMembers } from 'components';
import Immutable from 'immutable';
import moment from 'moment';

@connect(({ group }) => ({ group: group.get('group') }), {})
export default class GroupHome extends Component {
  // state = {
  //   editMode: false,
  //   description: '',
  // };

  // _showTag = (id) => {
  //   browserHistory.push(`tags/${id}`);
  // }

  // startEditMode() {
  //   this.setState({
  //     description: this.props.group.description,
  //     editMode: true
  //   });
  // }

  // closeEditMode() {
  //   this.setState({ editMode: false });
  // }

  // saveEdit = () => {
  //   this.props.updateGroup({
  //     description: this.state.description
  //   }, this.props.group.id);
  //   this.closeEditMode();
  // }
  description() {
    const group = this.props.group;
    // if (!this.props.currentUser || this.props.currentUser.id !== group.creator_id) {
      return (group && <div className="group-description">
        <h3>Description: </h3>
        <p>{group.get('description')}</p>
      </div>);
    // } else {
    //   let button, textbox;
    //   if (this.state.editMode) {
    //     button = (<div className="edit" onClick={this.saveEdit}>✓</div>);
    //     textbox = (<textarea
    //       id="group-descript-text"
    //       onChange={this.updateDescription}
    //       value={this.state.description}
    //       rows="5"
    //     />);
    //   } else {
    //     button = (<div className="edit" onClick={this.startEditMode}>✎</div>);
    //     textbox = (<p>{group.description}</p>);
    //   }
    //   return (
    //     <div className="group-description">
    //       {button}
    //       <h2>Description: </h2>
    //       {textbox}
    //     </div>
    //   );
    // }
  }

  // updateDescription = (e) => {
  //   this.setState({ description: e.target.value });
  // }

  render() {
    const now = new Date();
    const group = this.props.group;
    const oldEvents = group && this.props.group.get('groupEvents').filter(ev => new Date(ev.get('eventTime')) < now);
    const upcomingEvents = group && this.props.group.get('groupEvents').filter(ev => new Date(ev.get('eventTime')) >= now);
    return (
      <div className="group-home">
          <div className="group-info">
            <li className="address">{group && group.get('city') + ", " + group.get('state')}</li>
            <li className="founded">Founded: {group && moment(group.get('createdAt')).format('MMMM D, YYYY')} </li>
            <li className="stats"><div>Members </div><div>{group && group.get('participants').size}</div></li>
            {
              upcomingEvents && upcomingEvents.size ?
                <li className="stats">
                  <div>Upcoming Meetups: </div><div>{upcomingEvents.size}</div></li>
                  :
                <li><div>No upcoming meetups</div></li>
            }
            {
              oldEvents && oldEvents.size ?
                (<li className="stats">
                  <div>Past Meetups: </div><div>{oldEvents.size}</div>
                </li>) :
                <li><div>No past meetups</div></li>
            }
            <div className="group-tags">
              <h3>We're about:</h3>
              <ul>
              {
                group && group.get('tags').map((tag) => {
                  return (<li key={tag.get('id')}>{tag.get('name')}</li>);
                })
              }
              </ul>
            </div>
          </div>
        <div className="group-info-container">
            {this.description()}
            <div className="event-container">
              {
                group && <GroupEvents
                  oldEvents={oldEvents || new Immutable.List()}
                  upcomingEvents={upcomingEvents || new Immutable.List()}
                  group={group}
                  groupId={this.props.params.groupId}
                />
              }
            </div>
        </div>
        <div className="group-member-container">
          { group && <GroupMembers group={group} groupId={this.props.params.groupId} />}
        </div>
      </div>
    );
  }
};
