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
		LogInForm = require('./components/user/logInForm'),
		SignUpForm = require('./components/user/signUpForm'),
		GroupForm = require('./components/group/groupForm'),
		CurrentUserStateMixin = require('./mixin/currentUserState'),
		Navbar = require('./components/navbar'),
		GroupDetail = require('./components/group/groupDetail'),
		GroupHome = require('./components/group/groupHome'),
		GroupMembers = require('./components/group/groupMembers'),
		GroupPhotos = require('./components/group/groupPhotos'),
		GroupEvents = require('./components/group/groupEvents');
var App = React.createClass({
	render: function() {
		return (
			<div>

				<div class="page-container">
					{this.props.children}
				</div>
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
			<Route path="groups/new" component={GroupForm} />
			<Route path="groups/:groupId" component={GroupDetail}>
				<Route path="home" component={GroupHome}/>
				<Route path="members" component={GroupMembers}/>
				<Route path="photos" component={GroupPhotos}/>
				<Route path="events" component={GroupEvents}/>
			</Route>
		</Route>
);

document.addEventListener("DOMContentLoaded", function(){
	ReactDOM.render(<Router history={HashHistory}>{routes}</Router>, document.getElementById("root"));
});

