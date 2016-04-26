var ReactRouter = require('react-router'),
		Route = ReactRouter.Route,
		Router = ReactRouter.Router,
		IndexRoute = ReactRouter.IndexRoute,
		HashHistory = ReactRouter.hashHistory,
		Link = ReactRouter.Link;

var React = require('react'),
		ReactDOM = require('react-dom'), 
		GroupIndex = require('./components/group/groupIndex'),
		LogInForm = require('./components/user/logInForm'),
		SignUpForm = require('./components/user/signUpForm'),
		GroupForm = require('./components/group/groupForm'),
		CurrentUserStateMixin = require('./mixin/currentUserState'),
		Navbar = require('./components/navbar');

var App = React.createClass({
	render: function() {
		return (
			<div>
			<Navbar />
				<div class="page-container">
					<h1>Home Page</h1>
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
		</Route>
);

document.addEventListener("DOMContentLoaded", function(){
	ReactDOM.render(<Router history={HashHistory}>{routes}</Router>, document.getElementById("root"));
});

