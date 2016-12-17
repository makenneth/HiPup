import React, { Component } from "react";
import { asyncConnect } from "redux-async-connect";
import { connect } from "react-redux";
// import Modal from 'react-modal';
import { loadAuth, logOut, isLoaded as isAuthLoaded } from "redux/modules/auth";
import { loadLocation, isLoaded as isLocationLoaded } from "redux/modules/geolocation";
import { openLogIn, openSignUp, closeLogIn, closeSignUp } from "redux/modules/form";
import { Navbar, LogInForm, SignUpForm, MainNav } from 'components';
import './formStyle.less'

@asyncConnect([
  {
    promise: ({ store }) => {
      let promises = [];

      if (!isAuthLoaded(store.getState())) {
        promises.push(store.dispatch(loadAuth()));
      }
      if (!isLocationLoaded(store.getState())) {
        promises.push(store.dispatch(loadLocation()));
      }

      return Promise.all(promises);
    }
  }
])
@connect(
  ({ auth: { user }, form }) => ({ user, loginOpen: form.login, signupOpen: form.signup }),
  { logOut, openSignUp, openLogIn, closeSignUp, closeLogIn })
export default class Main extends Component {
  managePageStyle() {
    if (this.props.location.pathname === "/user/events") {
      return {
        backgroundImage: "url(" + "/dog-board-mini.png" + ")",
        backgroundSize: "contain",
        height: "200px",
        width: 'auto',
        position: "fixed",
        backgroundRepeat: "repeat-x"
      };
    }
  }
  loader() {
    return (<div className="page-load">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>);
  }

  render() {
    return (
      <div>
        {this.loader()}
        <div className="page-container" style={this.managePageStyle()}>
            {
              React.Children.map(this.props.children, (child) => {
                if (child.type.displayName === "GroupIndex") {
                  return React.cloneElement(child, {
                    userButtons: this.userButtons
                  })
                } else {
                  return child;
                }
              })
            }
        </div>
        {
          this.props.location.pathname !== "/" &&
            <div className="menu-icon" onClick={this.openNavModal}>&#9776;</div>
        }
        <Navbar user={this.props.user} logOut={this.props.logOut} />
        {
          this.props.loginOpen &&
            (<div className="overlay">
              <LogInForm
                closeModal={this.props.closeLogIn}
                redirectToSignUp={this.props.openSignUp}
              />
            </div>)
        }
      </div>
    );
  }
};
      // <Modal
      //   isOpen={this.props.signupOpen}
      //   onRequestClose={this.closeSignUpModal}
      //   style={FormStyle}
      // >
      //   <SignUpForm closeModal={this.closeSignUp} />
      // </Modal>
