import React, { Component } from 'react';
import { connect } from "react-redux";
import { EventItemByDate } from 'components';
import { fetchGroupEvents, isLoaded } from 'redux/modules/groupEvents';
import { asyncConnect } from "redux-async-connect";

@asyncConnect([{
  promise: ({ store }) => {
    let promise;

    if (!isLoaded(store.getState())) {
      promise = store.dispatch(fetchGroupEvents(0, 20));
    }
    return promise;
  }
}])
@connect(
  ({ groupEvents }) => ({
    groupEvents: groupEvents.groupEvents,
    endReached: groupEvents.endReached
  }),
  { fetchGroupEvents })
export default class EventIndexByDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  showMore = () => {
    this.setState({ page: this.state.page + 1 });
    if (!this.props.endReached) {
      this.fetchGroupEvents(this.state.page * 10, this.state.page * 10 + 10);
    }
  }
  showMoreButton() {
    if (this.state.page > Math.ceil(this.props.groupEvents.length / 10)) {
      return "";
    } else {
      return <button onClick={this.showMore}>Show More</button>;
    }
  }
  render() {
    return (
      <div className="event-by-date">
        <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <h3>
          Event By Date
        </h3>
        <ul>
          {
            this.props.groupEvents.slice(0, (this.state.page) * 10).map((groupEvent) => {
              return <EventItemByDate
                key={groupEvent.id}
                groupEvent={groupEvent}
              />;
            })
          }
        </ul>
        {this.showMoreButton()}
      </div>
    );
  }
};
