var React = require('react'),
    FaSearch = require('react-icons/lib/fa/search'),
    FaTags = require('react-icons/lib/fa/tags'),
    FaLocationArrow = require('react-icons/lib/fa/location-arrow'),
    FaCalendar = require('react-icons/lib/fa/calendar'),
    FaUser = require("react-icons/lib/fa/user"),
    HashHistory = require('react-router').hashHistory;


var MainNav = React.createClass({
  getInitialState: function() {
    return {
       
    };
  },
  componentDidMount: function() {
    this.changeToSolid();
    var searchIcon = document.getElementsByClassName("search-icon")[0],
        searchBar = document.getElementById("search-box");
    searchIcon.addEventListener("mouseover", function(){
      searchBar.focus();
    });
  },
  changeToSolid: function(){
    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if (height > 490){
        $(".main-nav").addClass("main-nav-solid");
        $(window).off("scroll");
        this.changeToTransparent();
      }
    }.bind(this));
  },
  changeToTransparent: function(){
    $(window).scroll(function() {
      var height = $(window).scrollTop();
      if (height < 490){
        $(".main-nav").removeClass("main-nav-solid");
        $(window).off("scroll");
        this.changeToSolid();
      }
    }.bind(this));
  },
  link: function(url) {
    HashHistory.push(url);
  },
  render: function(){
    return <div className="main-nav">
        <ul className="nav-icons">
          <li className="location-icon"><FaLocationArrow />
            { this.props.locationTooltip() }
          </li>
          <li className="search-icon"><FaSearch />
            { this.props.searchTooltip() }
          </li>
          <li className="tag-icon"><FaTags />
            { this.props.tagTooltip() }
          </li>
          <li onClick={this.props.openDateModal}><FaCalendar /></li>
          {
            this.props.currentUser ? 
              <li className="tag-icon" onClick={this.link.bind(null, "/user/profile") }>
                <FaUser />
              </li> : " "

          }
        </ul>
        { this.props.userButtons() }
      </div>;
  }
})


module.exports = MainNav;