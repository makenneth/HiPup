import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

export default class GroupEventItem extends Component {
  showEvent = () => {
    browserHistory.push(`groups/${this.props.groupId}/events/${this.props.groupEvent.id}`);
  }

  render() {
    const groupEvent = this.props.groupEvent;
    return (
      <div className="group-event-container">
          <div className="group-event-title" onClick={this.showEvent}>
            {groupEvent.title}
          </div>
        <div className="group-event-detail">
          <div className="event-detail-left">
            <p className="location">{groupEvent.city}, {groupEvent.state}</p>
            <p>{groupEvent.description.slice(0,120)}...</p>
          </div>
          <div className="event-detail-right">
            <p className="event-time">{moment(groupEvent.eventTime).format('dddd, MMMM DD, YYYY')}</p>
            <p className="event-hour">{moment(groupEvent.eventTime).format('hh:mm a')}</p>
            {
              groupEvent.time > Date.now() || groupEvent.status === "SCHEDULED" ?
              <button className="rsvp" onClick={this.showEvent}>RSVP</button> : ""
            }
          </div>
        </div>
      </div>
    );
  }
};
