import React, { Component } from 'react';
const EventMap = require('./map');

export default class EventShow extends Component {
  state = {
    distance: 0,
    logInIsOpen: false,
    signUpIsOpen: false,
    confirmIsOpen: false,
    editMode: false,
    title: "",
    description: ""
  };

  startEditMode() {
    this.setState({
      editMode: true,
      title: this.state.groupEvent.title,
      description: this.state.groupEvent.description
    });
  }

  editButton() {
    if (!this.state.currentUser || this.state.currentUser.id !== this.state.groupEvent.host_id){
      return ""
    } else {
      return this.state.editMode ?
        (<div className="edit" onClick={this.saveEdit}>✓</div>) :
        (<div className="edit" onClick={this.startEditMode}>✎</div>);
    }
  }

  endEditMode() {
    this.setState({ editMode: false });
  }

  editTitle() {
    let content = <h3>{this.state.groupEvent.title}</h3>;
    if (this.state.editMode) {
      content = (<input type="text"
        value={this.state.title}
        onChange={this.updateField.bind(null, "title")}
      />);
    }
    return (<div id="header">
      {content}
    </div>);
  }

  saveEdit = () => {
    ClientActions.editEvent(
      this.state.groupEvent.id, {
        title: this.state.title,
        description: this.state.description
    });
    this.setState({ editMode: false })
  }

  editDescription() {
    if (this.state.editMode) {
      return (<div id="description">
        <h3>Description: </h3>
        <textarea
          value={this.state.description}
          onChange={this.updateField.bind(null, "description")}
         />
      </div>)
    } else {
      return (<div id="description">
        <h3>Description: </h3>
        {this.state.groupEvent.description}
      </div>);
    }
  }

  updateField = (field, e) => {
    const fieldObj = {};
    fieldObj[field] = e.target.value;
    this.setState(fieldObj);
  }

  componentDidMount() {
    this.esListener = GroupEventStore.addListener(this._fetchedEvent);

    if (!this.state.groupEvent.event_time) {
      ClientActions.fetchSingleEvent(this.props.params.eventId, LocationStore.currentLocation().timeZone);
    }
  }

  toggleEventButton() {
    if (!this._alreadyRSVP()) {
      if (!this.state.currentUser) {
        return <button onClick={this.joinAndRsvpEvent} className="join">Sign In</button>;
        //this should show the sign in modal
      } else if (!this.props.hasJoinedGroup()) {
        return <button onClick={this.joinAndRsvpEvent} className="join">Join And RSVP</button>;
      } else if (this.state.currentUser && this.props.hasJoinedGroup()) {
        return <button onClick={this.rsvpEvent} className="join">RSVP</button>;
      }
    } else {
      return <button onClick={this.changeRSVP} className="leave">Change RSVP</button>;
    }
  }

  joinAndRsvpEvent = () => {
    if (this.state.currentUser) {
      this.props.joinGroup(this.rsvpEvent());
    } else {
      this.props.joinGroup();
    }
  }

  rsvpEvent = () => {
    if (this.state.currentUser && !this._alreadyRSVP()) {
      ClientActions.rsvpEvent(this.state.currentUser.id, this.state.groupEvent.id);
      ClientActions.fetchSingleEvent(this.props.params.eventId, LocationStore.currentLocation().timeZone);
    }
  }

  changeRSVP = () => {
    if (this.state.currentUser && this._alreadyRSVP()) {
      ClientActions.changeRSVP(this.state.currentUser.id, this.state.groupEvent.id);
      ClientActions.fetchSingleEvent(this.props.params.eventId, LocationStore.currentLocation().timeZone);
    }
  }

  _alreadyRSVP() {
    if (!this.state.currentUser) return false;
    const groupEvents = this.state.currentUser.joinedEvents;
    for (let i = 0; i < groupEvents.length; i++) {
      if (groupEvents[i].id === this.state.groupEvent.id) {
        return true;
      }
    }
    return false;
  }

  _fetchedEvent = () => {
    this.setState({
      groupEvent: GroupEventStore.find(this.props.params.eventId)
    })
  }

  parseTime() {
    const parsingTime = this.state.groupEvent.event_time;
    if (!parsingTime) return [0, 0];
    return parsingTime.split(" || ");
  }

  cancelEvent = () => {
    if (this.state.currentUser) this.setState({ confirmIsOpen: true });
  }

  confirmCancelEvent = () => {
    ClientActions.cancelEvent(this.state.currentUser.id, this.state.groupEvent.id);
    this.closeConfirmModal();
  }

  closeConfirmModal = () => {
    this.setState({ confirmIsOpen: false });
  }

  render() {
    const groupEvent = this.state.groupEvent;
    const eventTime = this.parseTime();
    const user = this.state.currentUser || { id: "" };
    const notCancelledNorOld = groupEvent.status !== "CANCEL" &&
                  groupEvent.time > Date.now();
    return (
      <div className="event-parent">
        <div className="event-details">
          {this.editButton()}
          {this.editTitle()}
          <div className="event-sub">
            <div className="event-time-info">
              <div className="date-and-time">
                <h3>{eventTime[0]}</h3>
                <p>{eventTime[1]}</p>
                <p>
                  Status:  {
                    groupEvent.time < Date.now() ? "Finished" :
                      groupEvent.status === "CANCEL" ? "Cancelled" : "On Schedule"}
                </p>
              </div>
              <div id="location">
                <h4>{groupEvent.street}</h4>
                <p>{groupEvent.city}, {groupEvent.state} {groupEvent.zip}</p>
              </div>
            </div>
            <div className="event-detail-map-container">
              {
                user.id === groupEvent.host_id && notCancelledNorOld &&
                  <button className="cancel-event" onClick={this.cancelEvent}>Cancel Event</button>
              }
              <div className="event-map">
                {
                  this.state.groupEvent.event_time &&
                    <EventMap lat={groupEvent.lat} lng={groupEvent.lng} />
                }
              </div>
            </div>
          </div>
          {this.editDescription()}
        </div>
        <div className="rsvp-member">
          {
            notCancelledNorOld &&
              (<div className="rsvp-buttons">
              <div id="title">Interested?</div>
              <div>{this.toggleEventButton()}</div>
              </div>)
          }
          <div className="event-participants">
            {groupEvent.event_users.length} {notCancelledNorOld ? "going" : "went"}:
            <ul className="participant-list">
              {
                groupEvent.event_users.slice(0, 10).map((participant) => {
                  return (<li key={participant.id} >
                    <div
                      className="mini-pic"
                      style={{
                        backgroundImage: "url(" + participant.image_url +")",
                        backgroundSize: "cover"
                      }}></div>
                    <div className="ev-name">{participant.name}</div>
                  </li>);
                })
              }
            </ul>
          </div>
        </div>
        <Modal
          isOpen={this.state.confirmIsOpen}
          style={ConfirmationStyle}
          onRequestClose={this.closeConfirmModal}
        >
          <Confirmation confirm={this.forSureCancelEvent} deny={this.closeConfirmModal}/>
        </Modal>
      </div>
    );
  }
};
