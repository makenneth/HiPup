import React, { Component } from 'react';
import { EventItemByDate } from 'components';

@asyncConnect([{
  promise: ({ store }) => {
    let promise;


    return promise;
  }
}])
export default class EventIndexByDate extends Component {
  getInitialState() {
    this.state = {
      groupEvents: EventQueryStore.allByDate() || [],
      page: 1
    };
  }
  componentDidMount() {
    ClientActions.fetchAllEventsByDate();
  }
  showMore() {
    this.setState({page: this.state.page + 1});
  }
  showMoreButton() {
    if (this.state.page > Math.ceil(this.state.groupEvents.length / 10)) {
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
            this.state.groupEvents.slice(0, (this.state.page) * 10).map((groupEvent) => {
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
