import React, { Component } from 'react';
import { browserHistory } from "react-router";

import './styles.scss';

export default class NewEventForm extends Component {
  state = {
    title: '',
    date: '',
    time: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    lat: '',
    lng: '',
  };

  componentDidMount() {
    const options = {
      types: ['address'],
      componentRestrictions: {
        country: "us"
      }
    };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    this.nefListener = this.autocomplete.addListener('place_changed', this.parseAddress);
  }

  componentWillReceiveProps(nextProps) {
    const group = nextProps.group;
    if (group !== this.props.group) {
      const newId = group.get('groupEvents').maxBy(g => g.get('id'));
      browserHistory.push(`/groups/${group.get('id')}/events/${newId}`);
      this.props.closeModal();
    }
  }

  componentWillUnmount() {
    if (this.nefListener) this.nefListener.remove();
  }

  parseAddress = () => {
    const places = this.autocomplete.getPlace();
    if (!places) return;
    const address = places.adr_address;
    const location = places.geometry.location;
    const street = address.match(/-address\">(.*?)</);
    const city = address.match(/locality\">(.*?)</);
    const state = address.match(/region\">(.*?)</);
    const zip = address.match(/postal-code\">(.*?)</);
    this.setState({
      street: street ? street[1] : '',
      city: city ? city[1] : '',
      state: state ? state[1] : '',
      zip: zip ? zip[1] : '',
      lat: street ? location.lat() : 0,
      lng: street ? location.lng() : 0
    })
  }

  updateField = (field, e) => {
    var fieldObj = {}
    fieldObj[field] = e.target.value;
    this.setState(fieldObj);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.assign({}, this.state, {
      host_id: this.props.user.get('id'),
      group_id: this.props.group.get('id'),
    });

    this.props.createEvent(data);
  }

  render() {
    return (
      <div className="event-form-div overlay">
        <form className="event-form" onSubmit={this.handleSubmit}>
          <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
          <div className="title">New Event</div>
          <div className="form-line">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.updateField.bind(null, "title")}
            />
          </div>
          <div className="form-line">
            <label for="description">Description</label>
            <textarea
              id="descrption"
              value={this.state.description}
              onChange={this.updateField.bind(null, "description")}
            />
          </div>
          <div className="form-line">
            <label for="date">Date</label>
            <input
              type="date"
              id="date"
              value={this.state.date}
              onChange={this.updateField.bind(null, "date")}
            />
          </div>
          <div className="form-line">
            <label for="time">Time</label>
            <input
              type="time"
              id="time"
              value={this.state.time}
              onChange={this.updateField.bind(null, "time")}
            />
          </div>
          <div className="form-line">
            <label for="autocomplete">Street Address</label>
            <input
              type="text"
              id="autocomplete"
              value={this.state.street}
              onChange={this.updateField.bind(null, "street")}
             />
           </div>
          <div className="form-line">
            <label for="city">City</label>
            <input
              type="text"
              id="city"
              value={this.state.city}
              onChange={this.updateField.bind(null, "city")}
            />
          </div>
          <div className="form-line">
            <label for="state">State</label>
            <input
              type="text"
              id="state"
              value={this.state.state}
              onChange={this.updateField.bind(null, "state")}
            />
          </div>
          <div className="form-line">
            <label for="zip">Zip</label>
            <input
              type="text"
              id="zip"
              value={this.state.zip}
              onChange={this.updateField.bind(null, "zip")}
            />
          </div>
          <input type="submit" className="submit-button" onSubmit={this.handleSubmit} value="New Event" />
        </form>
      </div>
    );
  }
};
