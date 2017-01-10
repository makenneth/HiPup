import React, { Component } from 'react';
import Immutable from 'immutable';

export default class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
      errors: new Immutable.Map(),
    };

    this.validateCond = {
      oldPassword: 'this.state.oldPassword > 0',
      newPassword: 'this.state.newPassword > 0',
      newPasswordRepeat: 'this.state.newPasswordRepeat === this.state.newPassword',
    };

    this.errorMessage = {
      oldPassword: 'Password cannot be empty.',
      newPassword: 'Password cannot be empty.',
      newPasswordRepeat: 'The passwords do not match.',
    };
  }

  setField = (ev) => {
    const fieldObj = {};
    fieldObj[ev.target.id] = ev.target.value;
    this.setState(fieldObj);
  }

  validateField = (ev) => {
    const field = ev.target.id;
    if (!eval(this.validateCond[field])) {
      this.setState({
        errors: this.state.errors.set(field, this.errorMessage[field]),
      });

      return false;
    }

    return true;
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    for (let field in this.validateCond) {
      if (!eval(this.validateCond[field])) {
        this.setState({
          errors: this.state.errors.set(field, this.errorMessage[field]),
        });

        return;
      }
    }

    this.props.updateUser({
      new_password: this.state.newPassword,
      old_password: this.state.oldPassword
    }).then(() => {
      this.props.showSuccessMessage("Password has been updated!");
    });
  }

  render() {
    return (
      <div className="password-modal">
        <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <h3>Update Password</h3>
        <div className="password-errors">
          {
            this.state.errors.map((error, i) => {
              return <li key={"error" + i}>{error}</li>;
            })
          }
        </div>
        <form id="change-password" onSubmit={this.handleSubmit}>
          <label for="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            type="password"
            value={this.state.oldPassword}
            onChange={this.setField}
            onBlur={this.validateField}
          />
          <label for="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={this.state.newPassword}
            onChange={this.setField}
            onBlur={this.validateField}
          />
          <label for="newPasswordRepeat">Repeat Your Password</label>
          <input
            id="newPasswordRepeat"
            type="password"
            value={this.state.newPasswordRepeat}
            onChange={this.setField}
            onBlur={this.validateField}
          />
          <input type="submit" value="Change Password"/>
        </form>
      </div>
    );
  }
};
