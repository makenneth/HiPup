var React = require('react'),
		MemberStore = require('../../stores/memberStore'),
		ClientActions = require('../../actions/clientActions'),
		ReverseGeoMixin = require('../../mixin/reverseGeoMixin');

var MemberProfile = React.createClass({
	mixins: [ReverseGeoMixin],
	getInitialState: function() {
		return {
			member: {
							 id: null,
							 name: null,
							 owner_name: null,
							 image_url: null
							}
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
		var member = MemberStore.find(this.props.userId);
		this.setState({member: member});
	},
	render: function() {
		var member = this.state.member;
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
