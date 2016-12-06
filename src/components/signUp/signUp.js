import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      owner_name: "",
      email: "",
      password: "",
      state: "",
      city: "",
      lat: 0,
      lng: 0,
      error: null
    };
  }
  componentDidMount() {
    const options = {
      types: ['(regions)'],
      componentRestrictions: {country: "us"}
    };
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );
    this.acListener = this.autocomplete.addListener('place_changed', this.fillInAddress);
  }
  fillInAddress = () => {
    const place = this.autocomplete.getPlace();
    let city = place.adr_address.match(/locality\">(\w+\s?\w+)</);
    let state = place.adr_address.match(/region\">(\w+)</);
    let location = place.geometry.location;
    city = city ? city[1] : "";
    state = state ? state[1] : "";
    this.setState({
      state: state,
      city: city,
      lat: location.lat(),
      lng: location.lng()
    });
  }
  componentWillUnmount() {
    if (this.acListener) this.acListener.remove();
  }
  updateField = (field, e) => {
    const stateObj = {};
    stateObj[field] = e.target.value;
    this.setState(stateObj);
  }
  validate() {
    let error;
    let errorField;
    const emailRegex = new RegExp(".+@.+..+", "i");

    if (this.state.name.length === "") {
      errorField = "name";
      error = "Name field cannot be empty";
    } else if (this.state.username.length < 6) {
      errorField = "username";
      error = "Username has to be at least 6 characters long";
    } else if (this.state.owner_name.length === "") {
      errorField = "ownername";
      error = "Owner name cannot be empty";
    } else if (!emailRegex.test(this.state.email)) {
      errorField = "email";
      error = "Not a valid email address";
     else if (this.state.password.length < 8) {
      errorField = "password";
      error = "Password has to be at least 8 characters long";
    } else if (this.state.state.length === 0) {
      errorField = "state";
      error = "State cannot be empty";
    } else if (this.state.city.length === 0) {
      errorField = "city";
      error = "City cannot be empty";
    }
    if (error) {
      document.getElementById(errorField).addClass("error-field");
    }
    return error;
  }
  handleSubmit(e) {
    e.preventDefault();
    const err = this.validate();

    if (err) {
      this.setState({ error: err });
    } else {
      const { error, ...others } = this.state
      this.props.signUp(others).then(() => {
        this.props.closeModal();
      });
    }
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="forms"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <div className="form-div">
          <div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
          <h3>Sign Up</h3>
          <form className="user-forms" onSubmit={this.handleSubmit}>
            <div className="form-line cf">
              <label for="name">My Name</label>
              <input
                type="text"
                id="name"
                value={this.state.name}
                onChange={this.updateField.bind(this, "name")}
              />
            </div>
            <div className="form-line cf">
              <label for="ownername">Owner's Name</label>
              <input
                type="text"
                id="ownername"
                value={this.state.owner_name}
                onChange={this.updateField.bind(this, "owner_name")}
              />
            </div>
            <div className="form-line cf">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.updateField.bind(this, "username")}
              />
            </div>
            <div className="form-line cf">
              <label for="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.updateField.bind(this, "email")}
                required
              />
            </div>
            <div className="form-line cf">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                title={passwordConditions}
                value={this.state.password}
                onChange={this.updateField.bind(this, "password")}
              />
            </div>
            <div className="form-line cf">
              <label for="autocomplete">City</label>
              <input
                type="text"
                id="autocomplete"
                value={this.state.city}
                onChange={this.updateField.bind(this, "city")}
              />
            </div>
            <div className="form-line cf">
              <label for="state">State</label>
               <input
                type="text"
                id="state"
                value={this.state.state}
                onChange={this.updateField.bind(this, "state")}
              />
            </div>
            <div className="errors">{this.state.error}</div>
            <input type="submit" className="button-create" value="Create Account" />
          </form>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}
