import React from 'react';
import { hashHistory } from 'react-router';
import moment from "moment";

const EventItemByDate = (props) => {
  const groupEvent = this.props.groupEvent;
  return (
    <li className="event-query-item" onClick={() => hashHistory.push(`groups/${groupEvent.group.id}/events/${groupEvent.id}`)}>
        <div className="time">
          <div>{moment(groupEvent.event_time).format("dddd, MMMM D, YYYY")}</div>
          <div>{moment(groupEvent.event_time).format("h:m a")}</div>
        </div>
        <div className="title">
          <div className="group-title">{groupEvent.group ? groupEvent.group.title : ""}</div>
          <div className="group-event-title">{groupEvent.title}</div>
        </div>
    </li>
  );
};
