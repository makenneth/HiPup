var React = require('react');

var Search = React.createClass({
	getInitialState: function() {
		return {
			searchString: this.props.searchString
		};
	},
	componentDidMount: function() {
		document.getElementById("searchBox").focus();
	},
	filter: function() {
		var search = this.state.searchString.trim();
		return this.props.groups.filter(function(group){
			return group.title.match(search);
		});
	},
	updateSearch: function(e) {
		this.setState({searchString: e.target.value})
	},
	render: function() {
		return (
			<div className="search-modal">
				<div>
					<input type="text" onChange={this.updateSearch} 
									value={this.state.searchString} id="searchBox"/>
					<ul>
					{
						this.filter().map(function(group){
							return <li key={group.id}>{group.title}</li>;
						})
					}


					</ul>
				</div>
			</div>
		);
	}

});

module.exports = Search;