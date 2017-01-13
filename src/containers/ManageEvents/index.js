import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import './styles.scss';

@connect(
  ({ auth }) => ({ joinedEvents: auth.getIn(['user', 'joinedEvents']) })
)
export default class ManageEvents extends Component {
  redirect = (groupId, id) => {
    if (id) {
      browserHistory.push(`groups/${groupId}/events/${id}`);
    } else {
      browserHistory.push(`groups/${groupId}/home`);
    }
  }

  showDetail = (id) => {
  }

  render() {
    return (
      <div id="parent-container">
        <div className="title">Upcoming Events:</div>
        <div className="events-container">
          {
            this.props.joinedEvents.map((joinedEvent) => {
              const group = joinedEvent.get('belongedGroup');
              const eventTime = group.get('eventTime');
              return (<div
                key={joinedEvent.get('id')}
                className="user-events-detail"
                onClick={() => this.showDetail(joinedEvent.get('id'))}
               >
                <li
                  className="link"
                  onClick={this.redirect.bind(null, group.get('id'), joinedEvent.get('id'))}
                >
                  <label>{joinedEvent.get('title')}</label>
                </li>
                <li
                  className="link"
                  onClick={this.redirect.bind(null, group.get('id'), null)}
                >
                  <label>Group:</label>{group.get('title')}
                </li>
                <li><label>Date:</label>{moment(eventTime).format('dddd, MMMM DD, YYYY')}</li>
                <li><strong>Time:</strong>{moment(eventTime).format('hh:mm a')}</li>
                <li><strong>People Going:</strong>{joinedEvent.get('eventUsers').size}</li>
                <li><strong>Status:</strong>{joinedEvent.get('status') === "SCHEDULED" ? "Scheduled" : "Cancel"}</li>
              </div>);
            })
          }
        </div>
      </div>
    );
  }
};
