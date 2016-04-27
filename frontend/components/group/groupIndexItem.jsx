var React = require('react'),
		HashHistory = require('react-router').hashHistory;

var GroupIndexItem = React.createClass({
	showDetail: function() {
		HashHistory.push("groups/" + this.props.group.id);
	},
	render: function() {
		return (
			<div className="group-index-item" onClick={this.showDetail}>
				<h4>{this.props.group.title}</h4>
				<img  className="group-index-photos"
							src={this.props.group.image_url} 
							alt={this.props.group.title}/>
			</div>
		);
	}

});

module.exports = GroupIndexItem;