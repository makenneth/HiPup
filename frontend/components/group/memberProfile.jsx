var React = require('react'),
		MemberStore = require('../stores/memberStore'),
		ClientActions = require('../actions/clientActions');

var MemberProfile = React.createClass({
	getInitialState: function() {
		return {
			member: {id: null}
		};
	},
	componentDidMount: function() {
		MemberStore.addListener(this._updateUser);
		ClientActions.fetchMember(this.props.userId);
	},
	_updateUser: function() {
		this.setState({member: MemberStore.find(this.props.params.userId)});
	},
	render: function() {
		return (
			<div>{this.state.member.id}</div>
		);
	}

});

module.exports = MemberProfile;