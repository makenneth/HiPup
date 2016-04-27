var React = require('react'),
		HashHistory = require('react-router').hashHistory;

var GroupIndexItem = React.createClass({
	showDetail: function() {
		HashHistory.push("groups/" + this.props.group.id);
	},
	render: function() {
		var imgUrl = this.props.group.image_url;
		return (
			<div href="#" className="group-index-item" onClick={this.showDetail} 
					 style={ { backgroundImage: 'url(' + imgUrl + ')'} }>
					 <div className="image-mask"></div>
				<h4>{this.props.group.title}</h4>
			</div>
		);
	}

});

module.exports = GroupIndexItem;