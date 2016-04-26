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
		CurrentUserStateMixin = require('./mixin/currentUserState'),
		Navbar = require('./components/navbar');

var App = React.createClass({
	mixins: [CurrentUserStateMixin],
	logInForm: function() {
		HashHistory.push("session/new");
	},
	signUpForm: function() {
		HashHistory.push("user/new");
	},
	render: function() {
		var contents;  //Refactor this to navbar??
		if (this.state.currentUser){
			contents = (
				<div>
				  <h3>Welcome, {this.state.currentUser.name}!</h3>
					<button className="btn btn-danger" 
									onClick={UserActions.logOut}>Log Out</button>
				</div>
				)
		} else {
			contents = (
				<div>
					<button className="btn btn-success" 
									onClick={this.logInForm}>Log In</button>
					<button className="btn btn-primary" 
									onClick={this.signUpForm}>Sign Up</button>
				</div>
				)
		}
		return (
			<div>
				<Navbar />
				<h1>Home Page</h1>
				{contents}
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

