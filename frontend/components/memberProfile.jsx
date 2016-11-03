const React = require('react');
const MemberStore = require('../stores/memberStore');
const ClientActions = require('../actions/clientActions');

const MemberProfile = React.createClass({
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
		this.setState({ member: MemberStore.find(this.props.params.userId) });
	},
	render: function() {
		return (
			<div />
		);
	}
});

module.exports = MemberProfile;
