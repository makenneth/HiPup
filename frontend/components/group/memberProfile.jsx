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
	_getLocation: function(user) {
		this._getCityAndCountry(user.lat, user.lng, this._setLocation);
	},
	componentWillUnmount: function() {
		if (this.memberListener){
			this.memberListener.remove();
		}
	},
	_updateUser: function() {
		var member = MemberStore.find(this.props.userId);
		this.setState({member: member});
		this._getLocation(member);
	},
	render: function() {
		var member = this.state.member;
		return (
			<div className="user-profile">
				<div className="user-name">Name: {member.name}</div>
				<div className="profile-pic">
					<img src={member.image_url} width="250px" height="auto"/>
				</div>
				<div className="user-detail">
					<ul>
						<li><label>Owner's Name:</label><div>{member.owner_name}</div></li>
						<li><label>Username:</label><div>{member.username}</div></li>
						<li><label>Location:</label><div>{this.state.location.join(", ")}</div></li>
					</ul>
				</div>
			</div>
		);
	}

});

module.exports = MemberProfile;