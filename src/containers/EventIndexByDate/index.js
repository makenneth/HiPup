import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EventItemByDate } from 'components';
import { fetchGroupEvents, isLoaded } from 'redux/modules/groupEvents';

@connect(
  ({ groupEvents }) => ({
    isLoaded: groupEvents.get('isLoaded'),
    groupEvents: groupEvents.get('groupEvents'),
    endReached: groupEvents.get('endReached'),
  }),
  { fetchGroupEvents })
export default class EventIndexByDate extends Component {
  state = {
    page: 1
  };

  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchGroupEvents(0, 20);
    }
  }

  showMore = () => {
    this.setState({ page: this.state.page + 1 });
    if (!this.props.endReached) {
      this.props.fetchGroupEvents(this.state.page * 10, this.state.page * 10 + 10);
    }
  }
  showMoreButton() {
    if (this.props.endReached) {
      return '';
    } else {
      return <button onClick={this.showMore}>Show More</button>;
    }
  }
  render() {
    return (
      <div className="event-by-date">
        <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <h3>Event By Date</h3>
        <ul>
          {
            this.props.groupEvents.slice(0, (this.state.page) * 10).map((groupEvent) => {
              return <EventItemByDate
                key={groupEvent.get('id')}
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
