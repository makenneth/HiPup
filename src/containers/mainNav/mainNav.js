import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { TagIndex } from 'components';
import { openLogIn, openSignUp } from 'redux/modules/form';
import { logOut } from 'redux/modules/auth';
import { changeAllTags, toggleTag } from 'redux/modules/tags';
import FaSearch from 'react-icons/lib/fa/search';
import FaTags from 'react-icons/lib/fa/tags';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaUser from 'react-icons/lib/fa/user';

@connect(
  ({ tags }) => ({
    tags: tags.tags,
    tagsLoaded: tags.loaded,
    selected: tags.selected,
  }),
  {
    openLogIn,
    openSignUp,
    logOut,
    changeAllTags,
    toggleTag
  }
)
export default class MainNav extends Component {
  componentDidMount() {
    this.changeToSolid();
    const searchIcon = document.getElementsByClassName('search-icon')[0];
    const searchBar = document.getElementById('search-box');
    searchIcon.addEventListener('mouseover', () => {
      searchBar.focus();
    });
  }

  changeToSolid() {
    $(window).scroll(() => {
      const height = $(window).scrollTop();
      if (height > 490) {
        $('.main-nav').addClass('main-nav-solid');
        $(window).off('scroll');
        this.changeToTransparent();
      }
    });
  }

  changeToTransparent() {
    $(window).scroll(() => {
      const height = $(window).scrollTop();
      if (height < 490){
        $('.main-nav').removeClass('main-nav-solid');
        $(window).off('scroll');
        this.changeToSolid();
      }
    });
  }

  userButtons() {
    if ((/^\/\w*\/?$/).test(window.location.pathname)) {
      if (this.props.user){
        return (<ul className="user-button">
          <li>
            <Link to="#/user/profile">
              Welcome, {this.props.user.name}!
            </Link>
          </li>
          <li><a onClick={this.props.logOut}>Log Out</a></li>
        </ul>);
      }

      return (<ul className="user-button">
        <li onClick={this.props.openLogIn}><a>Log In</a></li>
        <li onClick={this.props.openSignUp}><a>Sign Up</a></li>
      </ul>);
    } else {
      const buttonDiv = !this.props.user ?
        (<ul className="user-profile-login-text">
          <li onClick={this.props.openLogIn}><a>Log In</a></li>
          <li onClick={this.props.openSignUp}><a>Sign Up</a></li>
        </ul>) :
        (<ul className="user-profile-logout-text">
          <li><Link to="#/user/profile">Profile</Link></li>
          <li><a onClick={this.props.logOut}>Log Out</a></li>
        </ul>);
      const img = this.props.user ? this.props.user.image_url : '/dogpaw.gif';
      const color = this.props.user ? 'black' : 'white';
      return (<div className="user-text-button">
        <div className="user-text" style={{backgroundImage: `url(${img})`, backgroundStyle: 'cover',  backgroundColor: color}}>
          {buttonDiv}
        </div>
      </div>);
    }
  }

  link(url) {
    hashHistory.push(url);
  }

  render() {
    return <div className="main-nav">
      <ul className="nav-icons">
        <li className="location-icon">
          <FaLocationArrow />
          {this.props.locationTooltip()}
        </li>
        <li className="search-icon">
          <FaSearch />
          {this.props.searchTooltip()}
        </li>
        <li className="tag-icon">
          <FaTags />
          <TagIndex
            toggleTag={this.props.toggleTag}
            tags={this.props.tags}
            selected={this.props.selected}
            changeAllTags={this.props.changeAllTags}
          />
        </li>
        <li onClick={this.props.openDateModal}><FaCalendar /></li>
        {
          this.props.currentUser &&
            <li className="tag-icon" onClick={() => hashHistory.push("/user/profile")}>
              <FaUser />
            </li>
        }
      </ul>
      {this.userButtons()}
    </div>;
  }
};
