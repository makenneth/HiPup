var ReactRouter = require('react-router'),
		Route = ReactRouter.Route,
		Router = ReactRouter.Router,
		IndexRoute = ReactRouter.IndexRoute,
		HashHistory = ReactRouter.hashHistory,
		Link = ReactRouter.Link,
		Modal = require('react-modal'),
		EasyTransition = require('react-easy-transition'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group');


var React = require('react'),
		ReactDOM = require('react-dom'),
		GroupIndex = require('./components/group/groupIndex'),
		UserActions = require('./actions/userActions'),
		LogInForm = require('./components/user/logInForm'),
		SignUpForm = require('./components/user/signUpForm'),
		NewGroupForm = require('./components/group/newGroupForm'),
		CurrentUserStateMixin = require('./mixin/currentUserState'),
		ReverseGeoMixin = require('./mixin/reverseGeoMixin'),
		Navbar = require('./components/navbar'),
		GroupDetail = require('./components/group/groupDetail'),
		GroupHome = require('./components/group/groupHome'),
		GroupMembers = require('./components/group/groupMembers'),
		GroupPhotos = require('./components/group/groupPhotos'),
		GroupEvents = require('./components/group/groupEvents'),
		CurrentUserProfile = require('./components/user/currentUserProfile'),
		UserStore = require('./stores/userStore'),
		FormStyle = require('./modal/formStyle'),
		NavStyle= require('./modal/navStyle'),
		SearchStyle = require('./modal/searchStyle'),
		Search = require('./components/search/search')
		TagShow = require('./components/tag/tagShow'),
		EventShow = require('./components/events/eventShow'),
		ManageEvents = require('./components/user/manageEvents');

var App = React.createClass({
	mixins: [CurrentUserStateMixin, ReverseGeoMixin],
	getInitialState: function() {
		return {
			logInModalOpen: false,
			signUpModalOpen: false,
			navModalOpen: false,
			searchModalOpen: false,
		};
	},
	componentDidMount: function() {
		this.posListener = navigator.geolocation.watchPosition(this.updateLatLng);
	},
	updateLatLng: function(position){
		var coords = position.coords;
		var lat = coords.latitude,
				lng = coords.longitude;
		var	timeZone = position.timestamp;
		UserStore.setCurrentCoords({lat: lat, lng: lng});
		UserActions.getTimeZone(lat, lng, position.timestamp);
		UserActions.getCityAndState(lat, lng);
	},
	_setPlace: function(result){
		UserStore.setCurrentPlace(result.join(", "));
	},
	openLogInModal: function() {
		this.setState({ logInModalOpen: true,
									  signUpModalOpen: false });
	},
	closeLogInModal: function() {
		this.setState({ logInModalOpen: false });
	},
	openSignUpModal: function() {
		this.setState({ signUpModalOpen: true,
									  logInModalOpen: false });
	},
	closeSignUpModal: function() {
		this.setState({ signUpModalOpen: false });
	},
	openNavModal: function() {
		this.setState({ navModalOpen: true });
	},
	closeNavModal: function() {
		this.setState({ navModalOpen: false});
	},
	openSearchModal: function(e){
		this.setState({ searchModalOpen: true });
	},
	closeSearchModal: function() {
		this.setState({ searchModalOpen: false });
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
				return (<ul className="user-button cf">
					<li><a href="#/user/profile">
								Welcome, {this.state.currentUser.name}!
							</a></li>
					<li><a href="#" onClick={this.logOut}>Log Out</a></li>
				</ul>);
			} else {
				return (<ul className="user-button cf">
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
			return (<div className="user-text-button"><div className="user-text">
					{buttonDiv}
				</div></div>)
		}
	},
	render: function() {
		return (
			<div>
				<div class="page-container">
						{this.props.children}
				</div>
					{this.userButtons()}
				<div className="menu-icon" onClick={this.openNavModal}>&#9776;</div>
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
				<Modal isOpen={this.state.navModalOpen}
							onRequestClose={this.closeNavModal}
							style={NavStyle}>
							<ReactCSSTransitionGroup transitionName="nav-modal"
								transitionEnterTimeout={300} transitionLeaveTimeout={300}>
								<Navbar closeModal={this.closeNavModal}/>
							</ReactCSSTransitionGroup>
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



var routes = (
		<Route path="/" component={App}>
			<IndexRoute component={GroupIndex} />
			<Route path="groups" component={GroupIndex} />
			<Route path="session/new" component={LogInForm} />
			<Route path="user/new" component={SignUpForm} />
			<Route path="user/profile" component={CurrentUserProfile} />
			<Route path="user/events" component={ManageEvents} />
			<Route path="tags/:tagId" component={TagShow} />
			<Route path="groups/new" component={NewGroupForm} />
			<Route path="groups/:groupId" component={GroupDetail}>
				<Route path="home" component={GroupHome}/>
				<Route path="photos" component={GroupPhotos}/>
				<Route path="events/:eventId" component={EventShow} />
			</Route>
		</Route>
);

document.addEventListener("DOMContentLoaded", function(){
	Modal.setAppElement(document.body);
	ReactDOM.render(<Router history={HashHistory}>{routes}</Router>, document.getElementById("root"));
});
