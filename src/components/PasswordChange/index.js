import React, { Component } from 'react';
import Immutable from 'immutable';
import './styles.less';

export default class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
      errors: new Immutable.Map(),
    };
  }

  componentDidUpdate(nextProps, nextState) {
    console.log(nextState.errors);
  }

  setOldPassword = (ev) => {
    this.setState(
      { oldPassword: ev.target.value },
      this.validateOldPassword,
    );
  }

  setNewPassword = (ev) => {
    this.setState(
      { newPassword: ev.target.value },
      this.validateNewPassword,
    );
  }

  setNewPasswordRepeat = (ev) => {
    this.setState(
      { newPasswordRepeat: ev.target.value },
      this.validateNewPasswordRepeat,
    );
  }

  validateOldPassword(allowEmpty = true) {
    if (this.state.oldPassword.length === 0) {
      this.setState({
        errors: this.state.errors
          .set('oldPassword', allowEmpty ? '' : 'Old password cannot be empty'),
      });

      return false;
    }

    this.setState({
      errors: this.state.errors.set('oldPassword', ''),
    });

    return true;
  }

  validateNewPassword(allowEmpty = true) {
    const { newPassword, newPasswordRepeat } = this.state;
    let isValid = false;
    let errors = this.state.errors;
    if (newPassword.length === 0) {
      errors = errors.set('newPassword', allowEmpty ? '' : 'Password cannot be empty');
    } else {
      errors = errors.set('newPassword', '');
      isValid = true;
    }

    if (newPasswordRepeat.length > 0 && newPassword !== newPasswordRepeat) {
      errors = errors.set('newPasswordRepeat', 'Passwords have to match');
    } else if (errors.get('newPasswordRepeat') && newPassword === newPasswordRepeat) {
      isValid = isValid & true;
      errors = errors.set('newPasswordRepeat', null);
    }

    this.setState({ errors });
    return isValid;
  }

  validateNewPasswordRepeat(allowEmpty = true) {
    const { newPassword, newPasswordRepeat } = this.state;
    if (newPasswordRepeat.length === 0) {
      this.setState({
        errors: this.state.errors
          .set('newPasswordRepeat', allowEmpty ? '' : 'Password repeat cannot be empty'),
      });
      return false;
    } else if (newPassword !== newPasswordRepeat) {
      this.setState({
        errors: this.state.errors.set('newPasswordRepeat', 'Passwords have to match'),
      });

      return false;
    }

    this.setState({
      errors: this.state.errors.set('newPasswordRepeat', ''),
    });

    return true;
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    if (this.triggerValidate()) {
      this.props.updateUser({
        new_password: this.state.newPassword,
        old_password: this.state.oldPassword
      }).then(() => {
        this.props.showSuccessMessage('Password has been updated!');
      });
    }
  }

  triggerValidate = () => {
    let isValid = true;
    isValid &= this.validateOldPassword(false);
    isValid &= this.validateNewPassword(false);
    isValid &= this.validateNewPasswordRepeat(false);

    return isValid;
  }

  render() {
    return (
      <div className="password-modal">
        <div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
        <h3>Update Password</h3>
        <div className="password-errors">
          {
            // this.state.errors.map((error, i) => {
            //   return <li key={"error" + i}>{error}</li>;
            // })
          }
        </div>
        <form id="change-password" onSubmit={this.handleSubmit}>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            type="password"
            value={this.state.oldPassword}
            onChange={this.setOldPassword}
          />
          <p className="hint">{this.state.errors.get('oldPassword')}</p>
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={this.state.newPassword}
            onChange={this.setNewPassword}
          />
          <p className="hint">{this.state.errors.get('newPassword')}</p>
          <label htmlFor="newPasswordRepeat">Repeat Your Password</label>
          <input
            id="newPasswordRepeat"
            type="password"
            value={this.state.newPasswordRepeat}
            onChange={this.setNewPasswordRepeat}
          />
          <p className="hint">{this.state.errors.get('newPasswordRepeat')}</p>
          <input type="submit" value="Change Password" onMouseEnter={this.triggerValidate} />
        </form>
      </div>
    );
  }
};
