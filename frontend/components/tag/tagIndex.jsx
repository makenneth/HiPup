var React = require('react'),
		TagStore = require('../../stores/tagStore'),
		ClientActions = require('../../actions/clientActions');

var TagIndex = React.createClass({
	getInitialState: function() {
		return {
			tags: TagStore.all() || []
		};
	},
	componentDidMount: function() {
		this.tagIdxListener = TagStore.addListener(this._onReceive);
		ClientActions.fetchTags();
	},
	componentWillUnmount: function() {
		if (this.tagIdxListener){
			this.tagIdxListener.remove();
		}
	},
	_onReceive: function(){
		this.setState({tags: TagStore.all()});
	},
	render: function() {
		return (
			<ul className="tag-list">
			{
				this.state.tags.map(function(tag){
					return <li key={tag.id} onClick={this.props.selectTag.bind(null, tag.name)}><div>{tag.name}
					<input type="checkbox" /></div></li>;
				}.bind(this))
			}
			</ul>
		);
	}

});

module.exports = TagIndex;