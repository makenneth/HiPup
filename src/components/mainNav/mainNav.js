import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import FaTags from 'react-icons/lib/fa/tags';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';
import FaCalendar from 'react-icons/lib/fa/calendar';
import FaUser from 'react-icons/lib/fa/user';
import { hashHistory } from 'react-router';

export default class MainNav extends Component {
  componentDidMount() {
    this.changeToSolid();
    const searchIcon = document.getElementsByClassName("search-icon")[0];
    const searchBar = document.getElementById("search-box");
    searchIcon.addEventListener("mouseover", () => {
      searchBar.focus();
    });
  }
  changeToSolid() {
    $(window).scroll(() => {
      const height = $(window).scrollTop();
      if (height > 490) {
        $(".main-nav").addClass("main-nav-solid");
        $(window).off("scroll");
        this.changeToTransparent();
      }
    });
  }
  changeToTransparent() {
    $(window).scroll(() => {
      const height = $(window).scrollTop();
      if (height < 490){
        $(".main-nav").removeClass("main-nav-solid");
        $(window).off("scroll");
        this.changeToSolid();
      }
    });
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
          {this.props.tagTooltip()}
        </li>
        <li onClick={this.props.openDateModal}><FaCalendar /></li>
        {
          this.props.currentUser &&
            <li className="tag-icon" onClick={() => hashHistory.push("/user/profile")}>
              <FaUser />
            </li>
        }
      </ul>
      {this.props.userButtons()}
    </div>;
  }
};
