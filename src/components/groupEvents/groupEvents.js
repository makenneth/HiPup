import React, { Component } from 'react';
import GroupEventItem from './groupEventItem';

export default class GroupEvents extends Component {
  state = {
    tabSelected: 0
  };

  setTab = (tab) => {
    this.setState({ tabSelected: tab });
  }

  render() {
    const now = new Date();
    const oldEvents = this.props.group.events.filter(ev => new Date(ev.eventTime) < now);
    const upcomingEvents = this.props.group.events.filter(ev => new Date(ev.eventTime) >= now);

    return (
      <div>
        <div className="group-event-nav">
          <li onClick={() => this.setTab(0)}
              className={this.state.tabSelected === 0 ? "active-tab" : "inactive-event-tab"}>
              Upcoming Events ({upcomingEvents.length})
          </li>
          <li onClick={() => this.setTab(1)}
              className={this.state.tabSelected === 1 ? "active-tab" : "inactive-event-tab"}>
              Past Events ({oldEvents.length})
          </li>
        </div>
        <div className="browsing-events">
          {
            this.state.tabSelected === 0 &&
              (<ul>
                {
                  upcomingEvents.map((upcomingEvent) => {
                    return (<GroupEventItem
                      key={upcomingEvent.id}
                      groupEvent={upcomingEvent}
                      groupId={this.props.groupId}
                    />);
                  })
                }
              </ul>)
          }
          {
            this.state.tabSelected === 1 &&
              (<ul>
                {
                  oldEvents.map((oldEvent) => {
                    return (<GroupEventItem
                      key={oldEvent.id}
                      groupEvent={oldEvent}
                      groupId={this.props.groupId}
                    />);
                  })
                }
              </ul>)
          }
        </div>
      </div>
    );
  }
});

module.exports = GroupEvents;
