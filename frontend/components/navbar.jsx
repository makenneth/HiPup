var React = require('react');

var Navbar = React.createClass({
	getInitialState: function() {
		return {
			active: 0 
		};
	},
	setTab: function(tab) {
		this.setState({active: tab});
	},
	render: function() {
		return (
			<nav className="navbar navbar-inverse">
				<ul className="nav navbar-nav">
					<li className={this.state.active === 0 ? "active" : ""}
							onClick={this.setTab.bind(null, 0)}><a>Home</a></li>
					<li className={this.state.active === 1 ? "active" : ""}
							onClick={this.setTab.bind(null, 1)}><a>Groups</a></li>
				</ul>
				<ul className="nav navbar-nav navbar-right">
					<li><a>Log In</a></li>
					<li><a>Sign Up</a></li>
				</ul>
			</nav>
		);
	}

});

module.exports = Navbar;