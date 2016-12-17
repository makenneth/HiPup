import React, { Component } from 'react';

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
      errorFields: {}
    };

    this.errorMessages = {
      name: 'Name field cannot be empty',
      username: 'Username has to be at least 6 characters long',
      owner_name: 'Owner name cannot be empty',
      email: 'Not a valid email address',
      password: 'Password has to be at least 8 characters long',
      state: 'State cannot be empty',
      city: 'City cannot be empty',
    };

    this.validateConditions = {
      name: 'this.state.name.length > 0',
      email: 'new RegExp(".+@.+..+", "i").test(this.state.email)',
      username: 'this.state.username.length >= 6',
      owner_name: 'this.state.owner_name.length > 0',
      password: 'this.state.password.length >= 8',
      state: 'this.state.state.length > 0',
      city: 'this.state.city.length > 0',
    };
  }
  componentDidMount() {
    document.getElementsByTagName('body')[0].className = 'modal-open';
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

  componentWillUnmount() {
    if (this.acListener) this.acListener.remove();
    document.getElementsByTagName('body')[0].className = '';
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

  updateField = (field, e) => {
    const stateObj = {};
    stateObj[field] = e.target.value;
    this.setState(stateObj);
  }

  validateField = (field) => {
    if (field === email) {

    }
    const isValid = eval(this.validateConditions[field]);

    this.setState({
      errorFields: {
        ...this.state.errorFields,
        [field]: isValid ? false : true,
      }
    })
  }

  validate() {
    let errorFields = {};
    const emailRegex = new RegExp(".+@.+..+", "i");

    if (this.state.name.length == 0) {
      errorFields.name = true;
    }

    if (!emailRegex.test(this.state.email)) {
      errorFields.email = true;
    }
    if (this.state.username.length < 6) {
      errorFields.username = true;
    }
    if (this.state.owner_name.length == 0) {
      errorFields.owner_name = true;
    }
    if (this.state.password.length < 8) {
      errorFields.password = true;
    }
    if (this.state.state.length == 0) {
      errorFields.state = true;
    }
    if (this.state.city.length == 0) {
      errorFields.city = true;
    }

    return errorFields;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();

    if (err) {
      this.setState({ errorFields: err });
    } else {
      const { error, ...others } = this.state
      this.props.signUp(others).then(() => {
        this.props.closeModal();
      });
    }
  }

  render() {
    return (
      <div className="form-div">
        <div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
        <h3>Sign Up</h3>
        <form className="user-forms" onSubmit={this.handleSubmit}>
          <div className="form-line cf">
            <label htmlFor="name">My Name</label>
            <input
              type="text"
              id="name"
              value={this.state.name}
              className={this.state.errorFields.name ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'name')}
              onChange={this.updateField.bind(this, 'name')}
            />
            <p className="hint">{this.state.errorFields.name && this.errorMessages.name}</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="ownername">Owner's Name</label>
            <input
              type="text"
              id="ownername"
              value={this.state.owner_name}
              className={this.state.errorFields.owner_name ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'owner_name')}
              onChange={this.updateField.bind(this, 'owner_name')}
            />
            <p className="hint">{this.state.errorFields.owner_name && this.errorMessages.owner_name}</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              className={this.state.errorFields.username ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'username')}
              onChange={this.updateField.bind(this, 'username')}
            />
            <p className="hint">{this.state.errorFields.username && this.errorMessages.username}</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              className={this.state.errorFields.email ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'email')}
              onChange={this.updateField.bind(this, 'email')}
            />
            <p className="hint">{this.state.errorFields.email && this.errorMessages.email}</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              className={this.state.errorFields.password ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'password')}
              onChange={this.updateField.bind(this, 'password')}
            />
            <p className="hint">{this.state.errorFields.password && this.errorMessages.password}</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="autocomplete">City</label>
            <input
              type="text"
              id="autocomplete"
              value={this.state.city}
              className={this.state.errorFields.city ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'city')}
              onChange={this.updateField.bind(this, 'city')}
            />
            <p className="hint">{this.state.errorFields.city && this.errorMessages.city}</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="state">State</label>
             <input
              type="text"
              id="state"
              value={this.state.state}
              className={this.state.errorFields.state ? 'error-field' : ''}
              onBlur={this.validateField.bind(this, 'state')}
              onChange={this.updateField.bind(this, 'state')}
            />
            <p className="hint">{this.state.errorFields.state && this.errorMessages.state}</p>
          </div>
          <input type="submit" className="button-create" value="Create Account" />
        </form>
      </div>
    );
  }
}
