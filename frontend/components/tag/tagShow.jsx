const React = require('react');
const TagStore = require('../../stores/tagStore');
const ClientActions = require('../../actions/clientActions');

const TagShow = React.createClass({
	getInitialState: function() {
		return {
			tag: TagStore.find(this.props.params.tagId) || {groups: []}
		};
	},
	componentDidMount: function() {
		this.tagShowListener = TagStore.addListener(this._receiveTag);
		if (!this.state.tag.groups.length) {
			ClientActions.fetchTag(this.props.params.tagId);
		}
	},
	_receiveTag: function() {
		this.setState({ tag: TagStore.find(this.props.params.tagId) })
	},
	componentWillUnmount: function() {
		if (this.tagShowListener) {
			this.tagShowListener.remove();
		}
	},
	render: function() {
		return (
			<div>
				<ul className="tag-groups">
					{
						this.state.tag.groups.map((group) => {
							return <li key={group.id}>{group.title}</li>;
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = TagShow;