import React, { Component } from 'react';

export default class LogInForm extends Component {
  state = {
    username: "",
    usernameError: null,
    password: "",
    passwordError: null,
  };

  componentDidMount() {
    document.getElementsByTagName('body')[0].className = 'modal-open';
    setTimeout(() => {
      this.refs["username"].focus()
    }, 100);
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].className = '';
  }

  validate() {
    return this.validateUsername() && this.validatePassword();
  }

  handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.validate()) {
      const data = {
        user: {
          username: this.state.username,
          password: this.state.password,
        }
      };
      this.props.logIn(data).then(() => {
        this.props.closeModal();
      });
    }
  }

  validateUsername = () => {
    const hasError = this.state.username.length === 0;
    this.setState({ usernameError: hasError });
    return !hasError;
  }
  validatePassword = () => {
    const hasError = this.state.password.length === 0;
    this.setState({ passwordError: hasError });
    return !hasError;
  }

  guestLogin = (ev) => {
    ev.preventDefault();
    this.setState({ username: "", password: "" });
    this.ghostFill();
  }

  ghostFill() {
    const sampleUsername = "sampleuser";
    const samplePassword = "password";
    let usernameCount = 0;
    let passwordCount = 0;
    const intervalKey = setInterval(() => {
      if (usernameCount < 10) {
        this.setState({
          username: this.state.username + sampleUsername[usernameCount]
        });
        usernameCount++;
      } else if (passwordCount < 8) {
        this.setState({
          password: this.state.password + samplePassword[passwordCount]
        });
        passwordCount++;
      } else {
        clearInterval(intervalKey);
        this.handleSubmit();
      }
    }, 100);
  }
  render() {
    const isDisabled = this.state.password.length >= 8;
        // <div className="log-in-errors">{UserStore.errors().join(", ")}</div>
    return (
      <div className="form-div">
        <div className="close-form" onClick={this.props.closeModal}>&#10006;</div>
        <h3>Log In</h3>
        <form className="user-forms" onSubmit={this.handleSubmit}>
          <div className="form-line cf">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              ref="username"
              className={this.state.usernameError ? 'error-field' : ''}
              value={this.state.username}
              onBlur={this.validateUsername}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <p className="hint">{ this.state.usernameError && 'Username can\'t be empty' }</p>
          </div>
          <div className="form-line cf">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={this.state.passwordError ? 'error-field' : ''}
              value={this.state.password}
              onBlur={this.validatePassword}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <p className="hint">{ this.state.passwordError && 'Password can\'t be empty' }</p>
          </div>
          <div className="form-btn-div cf">
            <input type="submit" className="button-login" value="Log In" disabled={!isDisabled}/>
            <button className="guest-login" onClick={this.guestLogin}>Guest Login</button>
          </div>
        </form>
        <div className="redirect">Don't have an account yet? <a onClick={this.redirectToSignUp}>Sign Up</a></div>
      </div>
    );
  }
};
