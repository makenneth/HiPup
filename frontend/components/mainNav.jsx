const React = require('react');
const FaSearch = require('react-icons/lib/fa/search');
const FaTags = require('react-icons/lib/fa/tags');
const FaLocationArrow = require('react-icons/lib/fa/location-arrow');
const FaCalendar = require('react-icons/lib/fa/calendar');
const FaUser = require("react-icons/lib/fa/user");
const { HashHistory } = require('react-router').hashHistory;

const MainNav = React.createClass({
  componentDidMount: function() {
    this.changeToSolid();
    const searchIcon = document.getElementsByClassName("search-icon")[0];
    const searchBar = document.getElementById("search-box");
    searchIcon.addEventListener("mouseover", () => {
      searchBar.focus();
    });
  },
  changeToSolid: function() {
    $(window).scroll(() => {
      const height = $(window).scrollTop();
      if (height > 490) {
        $(".main-nav").addClass("main-nav-solid");
        $(window).off("scroll");
        this.changeToTransparent();
      }
    });
  },
  changeToTransparent: function() {
    $(window).scroll(() => {
      const height = $(window).scrollTop();
      if (height < 490){
        $(".main-nav").removeClass("main-nav-solid");
        $(window).off("scroll");
        this.changeToSolid();
      }
    });
  },
  link: function(url) {
    HashHistory.push(url);
  },
  render: function() {
    return <div className="main-nav">
      <ul className="nav-icons">
        <li className="location-icon">
          <FaLocationArrow />
          { this.props.locationTooltip() }
        </li>
        <li className="search-icon">
          <FaSearch />
          { this.props.searchTooltip() }
        </li>
        <li className="tag-icon">
          <FaTags />
          { this.props.tagTooltip() }
        </li>
        <li onClick={this.props.openDateModal}><FaCalendar /></li>
        {
          this.props.currentUser &&
            <li className="tag-icon" onClick={this.link.bind(null, "/user/profile") }>
              <FaUser />
            </li>
        }
      </ul>
      { this.props.userButtons() }
    </div>;
  }
});

module.exports = MainNav;
