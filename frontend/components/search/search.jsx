var React = require('react');

var Search = React.createClass({
	getInitialState: function() {
		return {
			searchString: "" 
		};
	},
	filter: function() {
		var search = this.searchString.trim();
		this.props.groups.filter(function(group){
			return search.toLowerCase() === group.title.toLowerCase();
		});
	},
	updateSearch: function(e) {
		this.setState({searchString: e.target.value})
	},
	render: function() {
		return (
			<div>
				<div>
					<input type="text" onChange={this.updateSearch} value={this.state.searchString} />
				</div>
				<div>
					{
						this.filter().map(function(group){
							return <li>{group.title}</li>;
						});
					}
				</div>
			</div>
		);
	}

});

module.exports = Search;