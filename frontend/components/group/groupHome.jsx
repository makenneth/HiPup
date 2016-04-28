var React = require('react'),
		GroupStore = require('../../stores/groupStore');

var GroupHome = React.createClass({
	render: function() {
		var group = this.props.group;
		return (
			<div>
					<h3>{group.title}</h3>
					<p>{group.description}</p>
					<div className="group-tags">
						<h3>tags</h3>
						{
							group.tags.map(function(tag){
								return <li key={tag.id}>{tag.name}</li>;
							})
						}
					</div>
			</div>
		);
	}

});

module.exports = GroupHome;