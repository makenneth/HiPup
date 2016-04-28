var React = require('react'),
		TagStore = require('../../stores/tagStore'),
		ClientActions = require('../../actions/clientActions');

var TagIndex = React.createClass({
	getInitialState: function() {
		return {
			tags: [] 
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
			<div>
				<div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
				<div className="tag-list cf">
				{
					this.state.tags.map(function(tag){
						return <div key={tag.id}>{tag.name}</div>;
					})
				}
				</div>
			</div>
		);
	}

});

module.exports = TagIndex;