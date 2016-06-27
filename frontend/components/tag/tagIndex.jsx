var React = require('react');

var TagIndex = React.createClass({
	render: function() {
		return (
			<ul className="tag-list">
				<li>
					<button onClick={this.props.selectAllTags}>Select All</button>
				</li>
				<li>
					<button onClick={this.props.deselectAllTags}>Clear All</button>
				</li>
			{
				this.props.tags.map(function(tag){
					return <li key={ tag.id }>
					<div>{ tag.name }</div>
						<input type="checkbox" 
							onChange={ this.props.changeSelectedTags.bind(null, tag.id) }  
							checked={ this.props.selectedTags[tag.id] }/>
					
				</li>;
				}.bind(this))
			}
			</ul>
		);
	}

});

module.exports = TagIndex;