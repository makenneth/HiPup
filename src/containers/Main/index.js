import React, { Component } from 'react';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { loadAuth, logOut, isLoaded as isAuthLoaded, logIn, signUp } from 'redux/modules/auth';
import { loadLocation, isLoaded as isLocationLoaded } from 'redux/modules/geolocation';
import { openLogIn, openSignUp, closeLogIn, closeSignUp } from 'redux/modules/form';
import Confirmation from '../Confirmation';
import SuccessMessage from '../SuccessMessage';
import {
  Navbar,
  LogInForm,
  SignUpForm,
  MainNav,
} from 'components';
import './formStyle.scss'

@asyncConnect([
  {
    promise: ({ store }) => {
      let promises = [];

      if (!isAuthLoaded(store.getState())) {
        promises.push(store.dispatch(loadAuth()));
      }
      // if (!isLocationLoaded(store.getState())) {
      //   promises.push(store.dispatch(loadLocation()));
      // }

      return Promise.all(promises);
    }
  }
])
@connect(
  ({ auth, form, common }) => ({
    user: auth.get('user'),
    loginOpen: form.get('login'),
    signupOpen: form.get('signup'),
    loadCount: common.get('loadCount'),
  }),
  { logOut, openSignUp, openLogIn, closeSignUp, closeLogIn, signUp, logIn })
export default class Main extends Component {
  managePageStyle() {
    if (this.props.location.pathname === '/user/events') {
      return {
        backgroundImage: 'url(/dog-board-mini.png)',
        backgroundSize: 'contain',
        height: '200px',
        width: 'auto',
        position: 'fixed',
        backgroundRepeat: 'repeat-x'
      };
    }
  }

  loader() {
    return (this.props.loadCount > 0 && <div className="page-load">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>);
  }

  confirmation() {

  }

  render() {
    return (
      <div className="main-container">
        {this.loader()}
        <div className="page-container" style={this.managePageStyle()}>
          {this.props.children}
        </div>
        {
          this.props.location.pathname !== '/' &&
            <div className="menu-icon" onClick={this.openNavModal}>&#9776;</div>
        }
        <Navbar user={this.props.user} logOut={this.props.logOut} openLogIn={this.props.openLogIn} />
        {
          this.props.loginOpen &&
            (<div className="overlay">
              <LogInForm
                closeModal={this.props.closeLogIn}
                redirectToSignUp={this.props.openSignUp}
                logIn={this.props.logIn}
              />
            </div>)
        }
        {
          this.props.signupOpen &&
            (<div className="overlay">
              <SignUpForm closeModal={this.props.closeSignUp} signUp={this.props.signUp} />
            </div>)
        }
        {
          this.props.confirmOpen &&
            (<div className="overlay">
              <Confirmation />
            </div>)
        }
      </div>
    );
  }
};
