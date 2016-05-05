var React = require('react'),
		MemberStore = require('../stores/memberStore'),
		ClientActions = require('../actions/clientActions');

var MemberProfile = React.createClass({
	getInitialState: function() {
		return {
			member: null
		};
	},
	componentDidMount: function() {
		MemberStore.addListener(this._updateUser);
		ClientActions.fetchMember(this.props.params.userId);
	},
	_updateUser: function() {
		this.setState({member: MemberStore.find(this.props.params.userId)});
	},
	render: function() {
		return (
			<div />
		);
	}

});

module.exports = MemberProfile;
