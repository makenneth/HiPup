var React = require('react');

var GroupIndexItem = React.createClass({

	render: function() {
		return (
			<div className="group-index-item">
				<h4>{this.props.group.title}</h4>
				<img  className="group-index-photos"
							src={this.props.group.image_url} 
							alt={this.props.group.title}/>
			</div>
		);
	}

});

module.exports = GroupIndexItem;