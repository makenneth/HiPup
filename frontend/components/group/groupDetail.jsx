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
				description: undefined,
				tags: []
			}
		};
	},
	componentDidMount: function() {
		this.groupListener = GroupStore.addListener(this._loadDetail);
		ClientActions.fetchSingleGroup(this.props.params.groupId);
	},
	_loadDetail: function(){
		this.setState({
			group: GroupStore.find(this.props.params.groupId)
		});
	},
	componentWillUnmount: function() {
		if (this.groupListener){
			this.groupListener.remove();
		}
	},
	render: function() {
		var children = !this.props.children ? this.props.children :
			React.cloneElement(this.props.children, { group: this.state.group } );
		
		return (
			<div>
				<GroupNav groupId={this.state.group.id}/>
				<div className="group-detail">
					{children}
				</div>
			</div>

		);
	}

});

module.exports = GroupDetail;