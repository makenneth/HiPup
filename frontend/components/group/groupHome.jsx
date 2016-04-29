var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		HashHistory = require('react-router').hashHistory;


var GroupHome = React.createClass({
	_showTag: function(id) {
		HashHistory.push("tags/" + id);
	},
	render: function() {
		var group = this.props.group;
		return (
			<div>
					<h2>Description: </h2>
					<p>{group.description}</p>
					<div className="group-tags">
						<h3>tags</h3>
						<ul>
						{
							group.tags.slice(0, 3).map(function(tag){
								return <li key={tag.id} tag={tag}>
													<a onClick={this._showTag.bind(null, tag.id)}>
														{tag.name}
													</a>
												</li>;
							}.bind(this))
						}
						</ul>
					</div>
			</div>
		);
	}

});

module.exports = GroupHome;