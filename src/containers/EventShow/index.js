import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { EventMap } from 'components';
import { openLogIn, openSignUp } from 'redux/modules/form';
import { openConfirm, closeConfirm } from 'redux/modules/confirmation';
import {
  hasLoaded,
  isCached,
  fetchGroupEvent,
  setEvent,
  rsvpEvent,
  removeRSVP,
} from 'redux/modules/eventDetail';
import { immutableSample } from 'helpers';
import moment from 'moment';
import './styles.scss';

@asyncConnect([{
  promise: ({ store, params }) => {
    let promise;
    const state = store.getState().eventDetail;
    if (!hasLoaded(state, params.eventId)) {
      if (isCached(state, params.eventId)) {
        store.dispatch(setEvent(params.eventId));
      } else {
        promise = store.dispatch(fetchGroupEvent(params.eventId));
      }
    }

    return promise;
  }
}])
@connect(
  ({ group, eventDetail, auth }) => ({
    group: group.get('group'),
    groupEvent: eventDetail.get('groupEvent'),
    user: auth.get('user'),
    eventDetail,
  }),
  { openLogIn, openSignUp, openConfirm, fetchGroupEvent, rsvpEvent, removeRSVP }
)
export default class EventShow extends Component {
  state = {
    distance: 0,
    // editMode: false,
    // title: "",
    // description: ""
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.params.eventId !== nextProps.params.eventId) {
      const nextId = nextProps.params.eventId;
      if (!hasLoaded(this.props.eventDetail, nextId)) {
        if (isCached(this.props.eventDetail, nextId)) {
          this.props.setEvent(nextId);
        } else {
          this.props.fetchGroupEvent(nextId);
        }
      }
    }
  }
  // startEditMode() {
  //   this.setState({
  //     editMode: true,
  //     title: this.state.groupEvent.title,
  //     description: this.state.groupEvent.description
  //   });
  // }

  // editButton() {
  //   if (!this.state.currentUser || this.state.currentUser.id !== this.state.groupEvent.host_id){
  //     return ""
  //   } else {
  //     return this.state.editMode ?
  //       (<div className="edit" onClick={this.saveEdit}>✓</div>) :
  //       (<div className="edit" onClick={this.startEditMode}>✎</div>);
  //   }
  // }

  // endEditMode() {
  //   this.setState({ editMode: false });
  // }

  editTitle() {
    let content = <h3>{this.props.groupEvent.get('title')}</h3>;
    // if (this.state.editMode) {
    //   content = (<input type="text"
    //     value={this.state.title}
    //     onChange={this.updateField.bind(null, "title")}
    //   />);
    // }
    return (<div id="header">
      {content}
    </div>);
  }

  // saveEdit = () => {
  //   ClientActions.editEvent(
  //     this.state.groupEvent.id, {
  //       title: this.state.title,
  //       description: this.state.description
  //   });
  //   this.setState({ editMode: false })
  // }

  editDescription() {
    // if (this.state.editMode) {
    //   return (<div id="description">
    //     <h3>Description: </h3>
    //     <textarea
    //       value={this.state.description}
    //       onChange={this.updateField.bind(null, "description")}
    //      />
    //   </div>)
    // } else {
      return (<div id="description">
        <h3>Description: </h3>
        {this.props.groupEvent.get('description')}
      </div>);
    // }
  }

  // updateField = (field, e) => {
  //   const fieldObj = {};
  //   fieldObj[field] = e.target.value;
  //   this.setState(fieldObj);
  // }

  toggleEventButton() {
    if (!this.alreadyRSVP()) {
      if (!this.props.user) {
        return <button onClick={this.joinAndRsvpEvent} className="join">Sign In</button>;
        //this should show the sign in modal
      } else if (!this.hasJoinedGroup()) {
        return <button onClick={this.joinAndRsvpEvent} className="join">Join And RSVP</button>;
      }

      return <button onClick={this.rsvpEvent} className="join">RSVP</button>;
    } else {
      return <button onClick={this.changeRSVP} className="leave">Change RSVP</button>;
    }
  }

  hasJoinedGroup() {
    return this.props.group && this.props.user &&
      Boolean(this.props.user.get('groups')
        .find(group => this.props.group.get('id') === group.get('id')));
  }

  joinAndRsvpEvent = () => {
    if (this.props.user) {
      this.props.joinGroup(this.rsvpEvent());
    } else {
      this.props.joinGroup();
    }
  }

  rsvpEvent = () => {
    if (this.props.user && !this.alreadyRSVP()) {
      this.props.rsvpEvent(this.props.groupEvent.get('id'));
    }
  }

  changeRSVP = () => {
    if (this.props.user && this.alreadyRSVP()) {
      this.props.removeRSVP(this.props.groupEvent.get('id'));
    }
  }

  alreadyRSVP() {
    if (!this.props.user) return false;
    return Boolean(this.props.user.get('joinedEvents')
      .find(gEvent => this.props.groupEvent.get('id') === gEvent.get('id')));
  }

  cancelEvent = () => {
    if (this.props.currentUser) {
      this.props.openConfirm(this.confirmCancelEvent);
    } else {
      this.props.openSuccess('You don\'t have permission to delete the event.');
    }
  }

  confirmCancelEvent = () => {
    this.props.cancelEvent(this.props.user.get('id'), this.props.groupEvent.get('id'));
  }

  render() {
    const { groupEvent, user } = this.props;
    if (!groupEvent) {
      return (
        <div />
      );
    }
    const eventTime = groupEvent.get('eventTime');
    const shouldBeActive = groupEvent.get('status') !== 'CANCEL' && new Date(eventTime) > Date.now();
    const status = (function getStatus() {
      if (eventTime < Date.now()) {
        return 'Finished';
      } else if (groupEvent.get('status') === 'CANCEL') {
        return 'Cancelled';
      } else {
        return 'On Schedule';
      }
    }());

    return (
      <div className="event-parent">
        <div className="event-details">
          <div className="upper-container">
            <div className="upper-inner">
              {this.editTitle()}
              <div className="event-sub">
                <div className="event-time-info">
                  <div className="date-and-time">
                    <h3>{moment(eventTime).format('dddd, MMMM DD, YYYY')}</h3>
                    <p>{moment(eventTime).format('hh:mm a')}</p>
                    <p>Status:  {status}</p>
                  </div>
                  <div id="location">
                    <h4>{groupEvent.get('street')}</h4>
                    <p>{`${groupEvent.get('city')}, ${groupEvent.get('state')} ${groupEvent.get('zip')}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="event-map">
              <div className="event-detail-map-container">
                {
                  user && user.get('id') === groupEvent.get('hostId') && shouldBeActive &&
                    <button className="cancel-event" onClick={this.cancelEvent}>Cancel Event</button>
                }
              </div>
              {
                this.props.groupEvent.get('eventTime') &&
                  <EventMap lat={groupEvent.get('lat')} lng={groupEvent.get('lng')} />
              }
            </div>
          </div>
          {this.editDescription()}
        </div>
        <div className="rsvp-member">
          {
            shouldBeActive &&
              (<div className="rsvp-buttons">
              <div id="title">Interested?</div>
              <div>{this.toggleEventButton()}</div>
              </div>)
          }
          <div className="event-participants">
            <h4>{`${groupEvent.get('eventUsers').size} ${shouldBeActive ? ' are going' : ' has gone'}:`}</h4>
            <ul className="participant-list">
              {
                immutableSample(groupEvent.get('eventUsers'), 8).map((participant) => {
                  return (<li key={participant.get('id')} >
                    <div
                      className='mini-pic'
                      style={{
                        backgroundImage: `url(${participant.get('imageUrl')})`,
                        backgroundSize: 'cover'
                      }}></div>
                    <div className="ev-name">{participant.get('name')}</div>
                  </li>);
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
