var ReactRouter = require('react-router'),
		Route = ReactRouter.Route,
		Router = ReactRouter.Router,
		IndexRoute = ReactRouter.IndexRoute,
		HashHistory = ReactRouter.hashHistory,
		Link = ReactRouter.Link,
		Modal = require('react-modal');

var React = require('react'),
		ReactDOM = require('react-dom'), 
		GroupIndex = require('./components/group/groupIndex'),
		UserActions = require('./actions/userActions'),
		LogInForm = require('./components/user/logInForm'),
		SignUpForm = require('./components/user/signUpForm'),
		GroupForm = require('./components/group/groupForm'),
		CurrentUserStateMixin = require('./mixin/currentUserState'),
		Navbar = require('./components/navbar'),
		GroupDetail = require('./components/group/groupDetail'),
		GroupHome = require('./components/group/groupHome'),
		GroupMembers = require('./components/group/groupMembers'),
		GroupPhotos = require('./components/group/groupPhotos'),
		GroupEvents = require('./components/group/groupEvents'),
		CurrentUserProfile = require('./components/user/currentUserProfile'),
		FormStyle = require('./modal/formStyle'),
		NavStyle= require('./modal/navStyle'),
		TagShow = require('./components/tag/tagShow'),
		EventShow = require('./components/events/eventShow');

var App = React.createClass({
	mixins: [CurrentUserStateMixin],
	getInitialState: function() {
		return {
			logInModalOpen: false,
			signUpModalOpen: false,
			navModalOpen: false
		};
	},
	componentDidMount: function() {
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
	logOut: function() {
		UserActions.logOut();
	},
	userButtons: function() {
		if (this.state.currentUser){
			return (<ul className="user-button">
				<li><a href="#/user/profile">
							Welcome, {this.state.currentUser.name}!
						</a></li>
				<li><a href="#" onClick={this.logOut}>Log Out</a></li>
			</ul>);
		} else {
			return (<ul className="user-button">
				<li><a href="#" onClick={this.openLogInModal}>Log In</a></li>
				<li><a href="#" onClick={this.openSignUpModal}>Sign Up</a></li>
			</ul>);
		}
	},
	render: function() {
		return (
			<div>
				<div class="page-container">
					{this.props.children}
				</div>
				<div className="main-buttons">
					{this.userButtons()}
				</div>
				<div className="menu-icon" onClick={this.openNavModal}>&#9776;</div>
				<Modal isOpen={this.state.logInModalOpen} 
							 onRequestClose={this.closeLogInModal}
							 style={FormStyle}>
					<button onClick={this.closeLogInModal}>Close</button>
					<LogInForm closeModal={this.closeLogInModal}/>
				</Modal>
				<Modal isOpen={this.state.signUpModalOpen} 
							 onRequestClose={this.closeSignUpModal}
							 style={FormStyle}>
					<button onClick={this.closeSignUpModal}>Close</button>
					<SignUpForm closeModal={this.closeSignUpModal}/>
				</Modal>
				<Modal isOpen={this.state.navModalOpen}
							onRequestClose={this.closeNavModal}
							style={NavStyle} >
					<Navbar closeModal={this.closeNavModal}/>
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
			<Route path="tags/:tagId" component={TagShow} />
			<Route path="groups/new" component={GroupForm} />
			<Route path="groups/:groupId" component={GroupDetail}>
				<Route path="home" component={GroupHome}/>
				<Route path="members" component={GroupMembers}/>
				<Route path="photos" component={GroupPhotos}/>
				<Route path="events" component={GroupEvents}/>
				<Route path="events/:eventId" component={EventShow} />
			</Route>
		</Route>
);

document.addEventListener("DOMContentLoaded", function(){
	Modal.setAppElement(document.body);
	ReactDOM.render(<Router history={HashHistory}>{routes}</Router>, document.getElementById("root"));
});

