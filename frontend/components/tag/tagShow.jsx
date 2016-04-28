var React = require('react'),
		TagStore = require('../../stores/tagStore'),
		ClientActions = require('../../actions/clientActions');

var TagShow = React.createClass({
	getInitialState: function() {
		return {
			tag: TagStore.find(this.props.params.tagId) || {groups: []}
		};
	},
	componentDidMount: function() {
		this.tagShowListener = TagStore.addListener(this._receiveTag);
		if (!this.state.tag.groups.length){ //just in case tags were not fetched
			ClientActions.fetchTag(this.props.params.tagId);
		}
	},
	_receiveTag: function() {
		this.setState({ tag: TagStore.find(this.props.params.tagId) })
	},
	componentWillUnmount: function() {
		if (this.tagShowListener){
			this.tagShowListener.remove();
		}
	},
	render: function() {
		return (
			<div>
				<ul>
				{
					this.state.tag.groups.map(function(group){
						return <li key={group.id}>{group.name}</li>;
					})
				}
				</ul>
			</div>
		);
	}

});

module.exports = TagShow;