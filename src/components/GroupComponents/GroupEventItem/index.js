import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';

export default class GroupEventItem extends Component {
  showEvent = () => {
    browserHistory.push(`groups/${this.props.groupId}/events/${this.props.groupEvent.get('id')}`);
  }

  render() {
    const groupEvent = this.props.groupEvent;
    return (
      <div className="group-event-container">
        <div className="group-event-detail">
          <div className="event-detail-left">
            <div className="group-event-title" onClick={this.showEvent}>
              {groupEvent.get('title')}
            </div>
            <p className="location">{groupEvent.get('city')}, {groupEvent.get('state')}</p>
            <p>{groupEvent.get('description').slice(0,120)}...</p>
          </div>
          <div className="event-detail-right">
            <p className="event-time">{moment(groupEvent.get('eventTime')).format('dddd, MMMM DD, YYYY')}</p>
            <p className="event-hour">{moment(groupEvent.get('eventTime')).format('hh:mm a')}</p>
            {
              (groupEvent.get('eventTime') > Date.now() || groupEvent.get('status') === "SCHEDULED") &&
                <button className="rsvp" onClick={this.showEvent}>Event Detail</button>
            }
          </div>
        </div>
      </div>
    );
  }
};
