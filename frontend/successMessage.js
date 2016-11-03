const React = require('react');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const SuccessMessage = React.createClass({
	componentDidMount: function() {
		setTimeout(this.props.closeModal, 3000);
	},
	render: function() {
		return (
			<ReactCSSTransitionGroup transitionName="page"
				transitionAppear={true} transitionAppearTimeout={500}
					transitionEnterTimeout={300} transitionLeaveTimeout={300}>
				<div id="success-message">
					<p>{this.props.message}</p>
					<button className="ok" onClick={this.props.closeModal}>Ok</button>
				</div></ReactCSSTransitionGroup>
		);
	}
});

module.exports = SuccessMessage;


