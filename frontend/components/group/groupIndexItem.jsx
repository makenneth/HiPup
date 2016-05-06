var React = require('react'),
		HashHistory = require('react-router').hashHistory;

var GroupIndexItem = React.createClass({
	showDetail: function() {
		HashHistory.push("groups/" + this.props.group.id + "/home");
	},
	render: function() {
		var tagTitles = [];
		this.props.group.tags.forEach(function(tag){ 
			tagTitles.push(tag.name);
		});
		var imgUrl = this.props.group.image_url;
		return (
			<div href="#" className="group-index-item" onClick={this.showDetail}
					 style={ { backgroundImage: 'url(' + imgUrl + ')', backgroundSize: "cover"} }>
					 <div className="image-mask"></div>
				<h4>{this.props.group.title}</h4>
				<div id="hidden-tags">{tagTitles ? tagTitles.join(", ") : ""}</div>
			</div>
		);
	}

});

module.exports = GroupIndexItem;
