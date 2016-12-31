import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { TagIndex } from 'components';
import { openLogIn, openSignUp } from 'redux/modules/form';
import { logOut } from 'redux/modules/auth';
import FaSearch from 'react-icons/lib/fa/search';
import FaTags from 'react-icons/lib/fa/tags';
import FaPlus from 'react-icons/lib/fa/plus';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaUser from 'react-icons/lib/fa/user';
import {
  toggleTag,
  changeRange,
  changeSearchString,
  clearSearchString,
  changeAllTags,
} from 'redux/modules/query';

@connect(
  ({ tags, query, geolocation, auth }) => ({
    user: auth.get('user'),
    tags: tags.get('tags'),
    selected: query.get('tags'),
    range: query.get('range'),
    searchString: query.get('searchString'),
    locationError: geolocation.get('error'),
    hasLocation: query.get('location'),
  }),
  {
    openLogIn,
    openSignUp,
    logOut,
    changeAllTags,
    toggleTag,
    changeSearchString,
    clearSearchString,
    changeRange,
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
            <Link to="/user/profile">
              Welcome, {this.props.user.get('name')}!
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
      const img = this.props.user ? this.props.user.get('imageUrl') : '/dogpaw.gif';
      const color = this.props.user ? 'black' : 'white';
      return (<div className="user-text-button">
        <div className="user-text" style={{backgroundImage: `url(${img})`, backgroundStyle: 'cover',  backgroundColor: color}}>
          {buttonDiv}
        </div>
      </div>);
    }
  }

  render() {
    return <div className="main-nav">
      <ul className="nav-icons">
        <li className="location-icon">
          <FaLocationArrow />
          <div className="location-tooltip">
            <p>Searching within {this.props.range} Miles</p>
            {
              this.props.hasLocation ?
                (<input
                  id="distance-range"
                  type="range"
                  min="25"
                  max="300"
                  step="25"
                  value={this.props.range}
                  onChange={ev => this.props.changeRange(ev.target.value)}
                />) : <p>'Could not detect your location'</p>
            }
          </div>
        </li>
        <li className="search-icon">
          <FaSearch />
          <div className="search-tooltip">
            <div className="search-container-sm cf">
              <img className="search-icon-sm" src="/search-icon-2.png"/>
              <input
                id="search-box"
                type="text"
                autoFocus
                onChange={ev => this.props.changeSearchString(ev.target.value)}
                value={this.props.searchString}
                placeholder="Find a pet event"
              />
            </div>
          </div>
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
          this.props.user &&
            <li className="tag-icon" onClick={() => browserHistory.push('/user/profile')}>
              <FaUser />
            </li>
        }
        {
          this.props.user &&
            <li className="tag-icon" onClick={() => browserHistory.push('/groups/new')}>
              <FaPlus />
            </li>
        }
      </ul>
      {this.userButtons()}
    </div>;
  }
};
