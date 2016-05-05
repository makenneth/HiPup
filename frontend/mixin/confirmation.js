var React = require('react');

var Confirmation = React.createClass({

	render: function() {
		return (
			<div className="confirmation-alert">
				<h2>Are you sure?</h2>
				<div className="button-div">
					<button onClick={this.props.confirm}>Yes</button>
					<button onClick={this.props.deny}>No</button>
				</div>

			</div>
		);
	}

});

module.exports = Confirmation;