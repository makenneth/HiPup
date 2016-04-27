var React = require('react'),
		HashHistory = require('react-router'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupNav = require('./groupNav');

var GroupDetail = React.createClass({
	getInitialState: function() {
		return {
			group: {
				title: undefined,
				description: undefined
			}
		};
	},
	componentDidMount: function() {
		this.groupListener = GroupStore.addListener(this._loadDetail);
		ClientActions.fetchSingleGroup(this.props.params.groupId);
	},
	_loadDetail: function(){
		this.setState({group: GroupStore.find(this.props.params.groupId)});
	},
	componentWillUnmount: function() {
		this.groupListener.remove();
	},
	render: function() {
		return (
			<div>
				<GroupNav groupId={this.state.group.id}/>
				<div>
					<h5>{this.state.group.title}</h5>
					<p>{this.state.group.description}</p>
					{this.props.children}
				</div>
			</div>

		);
	}

});

module.exports = GroupDetail;