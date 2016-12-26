import React, { Component } from 'react';
import GroupEventItem from '../GroupEventItem';

export default class GroupEvents extends Component {
  state = {
    tabSelected: 0
  };

  setTab = (tab) => {
    this.setState({ tabSelected: tab });
  }

  render() {
    const { oldEvents, upcomingEvents } = this.props;

    return (
      <div>
        <div className="group-event-nav">
          <li onClick={() => this.setTab(0)}
              className={this.state.tabSelected === 0 ? "active-tab" : "inactive-event-tab"}>
              Upcoming Events ({upcomingEvents.size})
          </li>
          <li onClick={() => this.setTab(1)}
              className={this.state.tabSelected === 1 ? "active-tab" : "inactive-event-tab"}>
              Past Events ({oldEvents.size})
          </li>
        </div>
        <div className="browsing-events">
          {
            this.state.tabSelected === 0 &&
              (<ul>
                {
                  upcomingEvents.map((upcomingEvent) => {
                    return (<GroupEventItem
                      key={upcomingEvent.get('id')}
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
                      key={oldEvent.get('id')}
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
};
