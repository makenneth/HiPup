var React = require('react'),
		TagStore = require('../../stores/tagStore'),
		ClientActions = require('../../actions/clientActions');

var TagShow = React.createClass({
	getInitialState: function() {
		return {
			tag: {
				name: null,
				groups: [],
			}
		};
	},
	componentDidMount: function() {
		this.tagShowListener = TagStore.addListener(this._receiveTag)
		ClientActions.fetchTag(this.props.params.tagId);
	},
	receiveTag: function() {
		this.setState({tag: TagStore.find(this.props.params.tagId)})
	},
	componentWillUnmount: function() {
		if (this.tagShowListener){
			this.tagShowListener.remove();
		}
	},
	render: function() {
		return (
			<div>
				{
					this.state.tag.groups.map(function(group){
						return <li key={group.id}>{group.name}</li>;
					})
				}
			</div>
		);
	}

});

module.exports = TagShow;