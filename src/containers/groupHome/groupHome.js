import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from "react-redux";
import GroupEvents from './groupEvents';
import GroupMembers from './groupMembers';

@connect(() => ({}), { updateGroup })
export default class GroupHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      description: ""
    };
  }
  _showTag = (id) => {
    hashHistory.push("tags/" + id);
  }
  pastMeetUp() {
    return (<div>"No past meetups"</div>);
  }
  startEditMode() {
    this.setState({
      description: this.props.group.description,
      editMode: true
    });
  }
  closeEditMode() {
    this.setState({ editMode: false });
  }
  saveEdit = () => {
    this.props.updateGroup({
      description: this.state.description
    }, this.props.group.id);
    this.closeEditMode();
  }
  description() {
    const group = this.props.group;
    if (!this.props.currentUser || this.props.currentUser.id !== group.creator_id) {
      return (<div className="group-description">
        <h2>Description: </h2>
        <p>{group.description}</p>
      </div>);
    } else {
      let button, textbox;
      if (this.state.editMode) {
        button = (<div className="edit" onClick={this.saveEdit}>✓</div>);
        textbox = (<textarea
          id="group-descript-text"
          onChange={this.updateDescription}
          value={this.state.description}
          rows="5"
        />);
      } else {
        button = (<div className="edit" onClick={this.startEditMode}>✎</div>);
        textbox = (<p>{group.description}</p>);
      }
      return (
        <div className="group-description">
          {button}
          <h2>Description: </h2>
          {textbox}
        </div>
      );
    }
  }
  updateDescription = (e) => {
    this.setState({ description: e.target.value });
  }
  render() {
    const group = this.props.group;
    return (
      <div className="group-home">
          <div className="group-info">
            <li className="address">{group.city + ", " + group.state}</li>
            <li className="founded">Founded {group.created_at} </li>
            <li className="stats"><div>Members </div><div>{group.participants.length}</div></li>
            {
              group.upcoming_events.length ?
                <li className="stats">
                  <div>Upcoming Meetups: </div><div>{group.upcoming_events.length}</div></li>
                  :
                <li><div>No upcoming meetups</div></li>
            }
            {
              group.old_events.length ?
                (<li className="stats">
                  <div>Past Meetups: </div><div>{group.old_events.length}</div>
                </li>) :
                <li><div>No past meetups</div></li>
            }
            <div className="group-tags">
              <h3>We're about:</h3>
              <ul>
              {
                group.tags.map((tag) => {
                  return (<li key={tag.id} tag={tag}>{tag.name}</li>);
                })
              }
              </ul>
            </div>
          </div>
        <div className="group-info-container">
            {this.description()}
            <div className="event-container">
              <GroupEvents group={this.props.group} groupId={this.props.params.groupId} />
            </div>
        </div>
        <div className="group-member-container">
          <GroupMembers group={this.props.group} groupId={this.props.params.groupId} />
        </div>
      </div>
    );
  }
};
