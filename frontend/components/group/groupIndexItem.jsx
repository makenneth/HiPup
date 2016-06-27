var React = require('react'),
		HashHistory = require('react-router').hashHistory;

var GroupIndexItem = React.createClass({
	showDetail: function() {
		HashHistory.push("groups/" + this.props.group.id + "/home");
	},
	render: function() {
		var tagTitles = [];
		var curGroup = this.props.group;
		curGroup.tags.forEach(function(tag){ 
			tagTitles.push(tag.name);
		});
		return (
			<div className="group-index-card" onClick={this.showDetail}>
				<div href="#" className="group-index-item front-side" 
						 style={ { backgroundImage: 'url(' + curGroup.image_url + ')', backgroundSize: "cover"} }>
						 <div className="image-mask"></div>
						<h4>{curGroup.title}</h4>
				</div>
				<div className="back-side">
					<p>We're { curGroup.participants.length } members!</p>
					<p>Location: { curGroup.city + ", " + curGroup.state }</p>
					<div id="hidden-tags">
						 {
							tagTitles.map(function(tag, index){
								return <div className="hidden-tags-tags" key={index + tag}>{tag}</div>
							})
						 }
					</div>
				</div>
			</div>
		);
	}

});

module.exports = GroupIndexItem;
