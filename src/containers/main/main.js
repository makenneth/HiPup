import React, { Component } from "react";
import { asyncConnect } from "redux-async-connect";
import { connect } from "react-redux";
import Modal from 'react-modal';
import { loadAuth, logOut } from "redux/modules/auth";
import { Navbar, LogInForm, SignUpForm } from 'components';

const FormStyle = require('./modal/formStyle');
const SearchStyle = require('./modal/searchStyle');
const MainNav = require("./components/mainNav");

@asyncConnect([
  {
    promise: ({ store }) => {
      let promise;

      if (!isAuthLoaded(store.getState())) {
        promise = dispatch(loadAuth());
      }

      return promise;
    }
  }
])
@connect(({ auth: user }) => ({ user }), { logOut })
export default class Main extends Component {
  redirectToSignUp() {
    this.setState({
      logInModalOpen: false,
      signUpModalOpen: true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.currentUser !== this.state.currentUser) {
      return false;
    }
    return true;
  }
  userButtons() {
    if ((/^\/\w*\/?$/).test(this.props.location.pathname)) {
      if (this.state.currentUser){
        return (<ul className="user-button">
          <li>
            <a href="#/user/profile">
              Welcome, {this.state.currentUser.name}!
            </a>
          </li>
          <li><a href="#" onClick={this.props.logOut}>Log Out</a></li>
        </ul>);
      } else {
        return (<ul className="user-button">
          <li onClick={this.openLogInModal}><a href="#">Log In</a></li>
          <li onClick={this.openSignUpModal}><a href="#">Sign Up</a></li>
        </ul>);
      }
    } else {
      const buttonDiv = !this.state.currentUser ?
        (<ul className="user-profile-login-text">
          <li onClick={this.openLogInModal}><a href="#">Log In</a></li>
          <li onClick={this.openSignUpModal}><a href="#">Sign Up</a></li>
        </ul>) :
        (<ul className="user-profile-logout-text">
          <li><a href="#/user/profile">Profile</a></li>
          <li><a href="#" onClick={this.logOut}>Log Out</a></li>
        </ul>);
      const img = this.state.currentUser ? this.state.currentUser.image_url : "/dogpaw.gif";
      const color = this.state.currentUser ? "black" : "white";
      return (<div className="user-text-button">
        <div className="user-text" style={{backgroundImage: "url(" +  img + ")", backgroundStyle: "cover",  backgroundColor: color}}>
          {buttonDiv}
        </div>
      </div>);
    }
  }
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
    return  (<div className="page-load">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>);
  }
  render() {
    return (
      <div>
        {this.loaded()}
        <div class="page-container" style={this.managePageStyle()}>
            {
              React.Children.map(this.props.children, (child) => {
                if (child.type.displayName === "GroupIndex"){
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
        <Navbar />
        <Modal isOpen={this.state.logInModalOpen}
          onRequestClose={this.closeLogInModal}
          style={FormStyle}>
          <LogInForm closeModal={this.closeLogInModal}
            redirectToSignUp={this.redirectToSignUp}
          />
        </Modal>
        <Modal isOpen={this.state.signUpModalOpen}
          onRequestClose={this.closeSignUpModal}
          style={FormStyle}>
          <SignUpForm closeModal={this.closeSignUpModal} />
        </Modal>
      </div>
    );
  }
});
