import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import { GroupEvents, GroupMemebrs } from 'components';

@connect(({ group }) => ({ group }), {})
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
      return (<div className="group-description">
        <h2>Description: </h2>
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
    const group = this.props.group;
    return (
      <div className="group-home">
          <div className="group-info">
            <li className="address">{group.get('city') + ", " + group.get('state')}</li>
            <li className="founded">Founded {group.get('created_at')} </li>
            <li className="stats"><div>Members </div><div>{group.get('participants').size}</div></li>
            {
              group.get('upcoming_events').size ?
                <li className="stats">
                  <div>Upcoming Meetups: </div><div>{group.get('upcoming_events').size}</div></li>
                  :
                <li><div>No upcoming meetups</div></li>
            }
            {
              group.get('old_events').size ?
                (<li className="stats">
                  <div>Past Meetups: </div><div>{group.get('old_events').size}</div>
                </li>) :
                <li><div>No past meetups</div></li>
            }
            <div className="group-tags">
              <h3>We're about:</h3>
              <ul>
              {
                group.get('tags').map((tag) => {
                  return (<li key={tag.get('id')} tag={tag}>{tag.get('name')}</li>);
                })
              }
              </ul>
            </div>
          </div>
        <div className="group-info-container">
            {this.description()}
            <div className="event-container">
              <GroupEvents group={group} groupId={this.props.params.groupId} />
            </div>
        </div>
        <div className="group-member-container">
          <GroupMembers group={group} groupId={this.props.params.groupId} />
        </div>
      </div>
    );
  }
};
