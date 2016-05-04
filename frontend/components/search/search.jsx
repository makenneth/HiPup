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
				<div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
				<div>
					<div className="search-container cf">
						<img className="search-icon"
								src="http://www.endlessicons.com/wp-content/uploads/2015/08/search-icon-2.png"/>
						<input type="text" onChange={this.updateSearch} 
									value={this.state.searchString} id="searchBox"/>
					</div>
					<ul>
					{
						this.filter().map(function(group){
							return <li key={group.id}><a href={"/#/groups/" + group.id}>{group.title}</a></li>;
						})
					}
					</ul>
				</div>
			</div>
		);
	}

});

module.exports = Search;