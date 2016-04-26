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
		SignUpForm = require('./components/user/signUpForm');

var App = React.createClass({
	logInForm: function() {
		HashHistory.push("session/new");
	},
	signUpForm: function() {
		HashHistory.push("user/new")
	},
	render: function() {
		return (
			<div>
				<h1>Home Page</h1>
				<button className="btn" onClick={this.logInForm}>Log In</button>
				<button className="btn" onClick={this.signUpForm}>Sign Up</button>
				{this.props.children}
			</div>
		);
	}
});

var routes = (
	<Router history={HashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={GroupIndex} />
			<Route path="groups" component={GroupIndex} />
			<Route path="session/new" component={LogInForm} />
			<Route path="user/new" component={SignUpForm} />
		</Route>
	</Router>
);

document.addEventListener("DOMContentLoaded", function(){
	ReactDOM.render(routes, document.getElementById("root"));
});

