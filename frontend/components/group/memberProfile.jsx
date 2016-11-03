const React = require('react');
const MemberStore = require('../../stores/memberStore');
const ClientActions = require('../../actions/clientActions');
const ReverseGeoMixin = require('../../mixin/reverseGeoMixin');

const MemberProfile = React.createClass({
	mixins: [ReverseGeoMixin],
	getInitialState: function() {
		return {
			member: {}
		};
	},
	componentDidMount: function() {
		this.memberListener = MemberStore.addListener(this._updateUser);
		ClientActions.fetchMember(this.props.userId);
	},
	componentWillUnmount: function() {
		if (this.memberListener){
			this.memberListener.remove();
		}
	},
	_updateUser: function() {
		const member = MemberStore.find(this.props.userId);
		this.setState({ member });
	},
	render: function() {
		const member = this.state.member;
		return (
			<div className="user-profile">
			<div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
				<div className="user-name">My name is {member.name}</div>
				<div className="profile-detail">
					<div className="profile-pic">
						<img src={member.image_url} width="250px" height="auto"/>
					</div>
					<div className="user-detail">
						<ul>
							<li><label>Owner's Name:</label><div>{member.owner_name}</div></li>
							<li><label>Location:</label><div>{member.city}, {member.state}</div></li>
							<li><label>Member Since:</label><div>{member.member_since}</div></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = MemberProfile;
