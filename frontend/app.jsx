var React = require('react'),
    ReactDOM = require('react-dom'),
    Modal = require('react-modal');
    

var UserActions = require('./actions/userActions'),
    CurrentUserStateMixin = require('./mixin/currentUserState'),
    FrontPageModalHelper = require('./frontPageModalHelper'),
    ReverseGeoMixin = require('./mixin/reverseGeoMixin'),
    Navbar = require('./components/navbar'),
    UserStore = require('./stores/userStore'),
    UserServerActions = require('./actions/userServerActions');
    FormStyle = require('./modal/formStyle'),
    NavStyle= require('./modal/navStyle'),
    SearchStyle = require('./modal/searchStyle'),
    LogInForm = require('./components/user/logInForm'),
    SignUpForm = require('./components/user/signUpForm'),
    Search = require('./components/search/search'),
    MainNav = require("./components/mainNav");


var App = React.createClass({
  mixins: [CurrentUserStateMixin, ReverseGeoMixin, FrontPageModalHelper],
  componentDidMount: function() {
    $.ajax({
      url: "https://api.ipify.org/",
      success: function(ip){
        UserActions.findLocationWithIp(ip);
      }
    })
  },
  redirectToSignUp: function(){
    this.setState({logInModalOpen: false,
      signUpModalOpen: true});
  },
  logOut: function() {
    UserActions.logOut();
  },
  userButtons: function() {
    if ((/^\/\w*\/?$/).test(this.props.location.pathname)){
      if (this.state.currentUser){
        return (<ul className="user-button">
          <li><a href="#/user/profile">
                Welcome, {this.state.currentUser.name}!
              </a></li>
          <li><a href="#" onClick={this.logOut}>Log Out</a></li>
        </ul>);
      } else {
        return (<ul className="user-button">
          <li onClick={this.openLogInModal}><a href="#">Log In</a></li>
          <li onClick={this.openSignUpModal}><a href="#">Sign Up</a></li>
        </ul>);
      }
    } else {
      var buttonDiv = !this.state.currentUser ? (<ul className="user-profile-login-text">
            <li onClick={this.openLogInModal}><a href="#">Log In</a></li>
            <li onClick={this.openSignUpModal}><a href="#">Sign Up</a></li>
          </ul>) : (<ul className="user-profile-logout-text">
                    <li><a href="#/user/profile">Profile</a></li>
                    <li><a href="#" onClick={this.logOut}>Log Out</a></li>
                  </ul>);
      var img = this.state.currentUser ? this.state.currentUser.image_url : "/dogpaw.gif";
      var color = this.state.currentUser ? "black" : "white";
      return (<div className="user-text-button">
          <div className="user-text" style={{backgroundImage: "url(" +  img + ")", backgroundStyle: "cover",  backgroundColor: color}}>
            {buttonDiv}
          </div>
        </div>)
    }
  },
  managePageStyle: function(){
    if (this.props.location.pathname === "/user/events"){
      return {
              backgroundImage: "url(" + "/dog-board-mini.png" + ")", 
              backgroundSize: "contain",
              height: "200px",
              width: 'auto',
              position: "fixed",
              backgroundRepeat: "repeat-x"
            };
    }
  },
  menuIcon: function() {
    if (this.props.location.pathname !== "/"){
      return <div className="menu-icon" onClick={this.openNavModal}>&#9776;</div>
    }
    
  },
  render: function() {
    return (
      <div>
        <div class="page-container" style={this.managePageStyle()}>
            {this.props.children}
        </div>
          {this.menuIcon()}
          <MainNav userButtons={ this.userButtons }/>
        <Navbar />
        <Modal isOpen={this.state.logInModalOpen}
               onRequestClose={this.closeLogInModal}
               style={FormStyle}>
          <LogInForm closeModal={this.closeLogInModal} redirectToSignUp={this.redirectToSignUp} />
        </Modal>
        <Modal isOpen={this.state.signUpModalOpen}
               onRequestClose={this.closeSignUpModal}
               style={FormStyle}>
          <SignUpForm closeModal={this.closeSignUpModal}/>
        </Modal>
        <Modal isOpen={ this.state.searchModalOpen }
               onRequestClose={this.closeSearchModal}
               style={SearchStyle}>
          <Search groups={ this.state.groups }
                  searchString={ this.state.searchString }
                  closeModal={this.closeSearchModal}/>
        </Modal>
      </div>
    );
  }
});


module.exports = App;