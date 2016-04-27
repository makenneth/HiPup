var React = require('react');

var GroupPhotos = React.createClass({
	getInitialState: function() {
		return {
			group: this.props.group 
		};
	},
	render: function() {
		return (
			<div>
				<h1>Group Photos</h1>
				<ul>
					{
						this.state.group.images.map(function(image){
							return <li key={image.id}><img className="group-images" 
												      src={image.image_url} /></li>;
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = GroupPhotos;