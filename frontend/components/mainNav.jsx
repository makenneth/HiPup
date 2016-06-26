var React = require('react'),
    FaSearch = require('react-icons/lib/fa/search'),
    FaTags = require('react-icons/lib/fa/tags'),
    FaLocationArrow = require('react-icons/lib/fa/location-arrow'),
    FaCalendar = require('react-icons/lib/fa/calendar');


var MainNav = React.createClass({
  getInitialState: function() {
    return {
       
    };
  },
  componentDidMount: function() {
    this.changeToSolid();
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
  render: function(){
    return <div className="main-nav">
        <ul className="nav-icons">
          <li><FaLocationArrow /></li>
          <li><FaSearch /></li>
          <li><FaTags /></li>
          <li><FaCalendar /></li>
        </ul>
        {this.props.userButtons()}
      </div>;
  }
})


module.exports = MainNav;