import React from 'react';
import { browserHistory } from 'react-router';
import moment from "moment";

const EventItemByDate = ({ groupEvent }) => {
  return (
    <li className="event-query-item" onClick={() => browserHistory.push(`groups/${groupEvent.getIn('group', 'id')}/events/${groupEvent.get('id')}`)}>
        <div className="time">
          <div>{moment(groupEvent.get('eventTime')).format("dddd, MMMM D, YYYY")}</div>
          <div>{moment(groupEvent.get('eventTime')).format("h:m a")}</div>
        </div>
        <div className="title">
          <div className="group-title">{groupEvent.get('group') ? groupEvent.getIn(['group', 'title']) : ''}</div>
          <div className="group-event-title">{groupEvent.get('title')}</div>
        </div>
    </li>
  );
};

export default EventItemByDate;
