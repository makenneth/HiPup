import React, { Component } from 'react';
import { hashHistory } from "react-router";
import { connect } from "react-redux";

@connect(({ auth: { user } }) => { user }, { createEvent })
export default class NewEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: "",
      time: "",
      description: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      lat: "",
      lng: "",
      group_id: "",
      host_id: ""
    };
  }
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
      street: street ? street[1] : "",
      city: city ? city[1] : "",
      state: state ? state[1] : "",
      zip: zip ? zip[1] : "",
      lat: street ? location.lat() : 0,
      lng: street ? location.lng() : 0
    })
  }
  // _createdEvent() {
  //   var newEventId = GroupEventStore.last();
  //   this.props.closeModal();
  //   HashHistory.push("groups/" + this.props.groupId + "/events/" + newEventId);
  // }
  updateField = (field, e) => {
    var fieldObj = {}
    fieldObj[field] = e.target.value;
    this.setState(fieldObj);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.state.host_id = this.state.user.id;
    this.state.group_id = this.props.groupId;
    var obj = this.state;
    delete obj["currentUser"]
    this.props.createEvent(obj);
  }
  render() {
    return (
      <div className="event-form-div">
      <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <div className="title">New Event</div>
        <form className="event-form" onSubmit={this.handleSubmit} >
          <div className="form-line"><label for="title">Title</label>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.updateField.bind(null, "title")}
          /></div>
          <div className="form-line"><label for="description">Description</label>
          <textarea
            id="descrption"
            value={this.state.description}
            onChange={this.updateField.bind(null, "description")}
          /></div>
          <div className="form-line"><label for="date">Date</label>
          <input
            type="date"
            id="date"
            value={this.state.date}
            onChange={this.updateField.bind(null, "date")}
          /></div>
            <div className="form-line"><label for="time">Time</label>
          <input
            type="time"
            id="time"
            value={this.state.time}
            onChange={this.updateField.bind(null, "time")}
          /></div>
          <div className="form-line"><label for="autocomplete">Street Address</label>
          <input
            type="text"
            id="autocomplete"
            value={this.state.street}
            onChange={this.updateField.bind(null, "street")}
           /></div>
          <div className="form-line"><label for="city">City</label>
          <input
            type="text"
            id="city"
            value={this.state.city}
            onChange={this.updateField.bind(null, "city")}
          /></div>
          <div className="form-line"><label for="state">State</label>
          <input
            type="text"
            id="state"
            value={this.state.state}
            onChange={this.updateField.bind(null, "state")}
          /></div>
          <div className="form-line"><label for="zip">Zip</label>
          <input
            type="text"
            id="zip"
            value={this.state.zip}
            onChange={this.updateField.bind(null, "zip")}
          /></div>
          <input type="submit" className="submit-button" onSubmit={this.handleSubmit} value="New Event" />
        </form>
      </div>
    );
  }
};
