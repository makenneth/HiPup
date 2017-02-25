import React, { Component } from "react";
import { findDOMNode } from 'react-dom';
import { connect } from "react-redux";
import { browserHistory } from "react-router";

export default class Navbar extends Component {
  state = {
    active: 0,
  };

  handleClick(ev) {
    if (this.state.dropdownOpen && !findDOMNode(this).contains(ev.target)) {
      this.setState({ dropdownOpen: false });
    }
  }
  setTab = (tab, url) => {
    this.setState({ active: tab });
    browserHistory.push(url);
    this.props.closeModal();
  }

  openLogInModal = () => {
    this.props.closeModal();
    this.props.openLogIn();
  }

  buttonsForLoggedIn() {
    const active = this.state.active;
    return (this.props.user && <ul className="nav-list-user">
      <li
        className={active === 2 ? "active" : ""}
        onClick={() => this.setTab(2, "groups/new")}
      >
        Create Your Group
      </li>
      <li
        className={active === 3 ? "active" : ""}
        onClick={() => this.setTab(3, "user/profile")}
      >
        Profile
      </li>
      <li className="log-out" onClick={this.props.logOut}>Log Out</li>
    </ul>);
  }

  render() {
    return (
      <nav className="nav-main">
        <ul className="nav-list cf">
          <li
            className={this.state.active === 0 ? "active" : ""}
            onClick={this.setTab.bind(null, 0, "/")}
          >Home</li>
          {
            !this.props.user &&
              <li onClick={this.openLogInModal}>Please Sign In</li>
          }
          {this.buttonsForLoggedIn()}
        </ul>
      </nav>
    );
  }
};
