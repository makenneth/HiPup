var React = require('react'),
		CurrentUserState = require("../../mixin/currentUserState"),
		HashHistory require('react-router').hashHistory;
//Temporarily use geolocation for lat and lng, have to look up how to set cities
var GroupForm = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			lat: 0,
			lng: 0,
			title: "",
			description: "",
			image_url: "",
			creator_id: ""
		};
	},
	componentDidMount: function() {
		if (!this.state.currentUser){
			HashHistory.push("/session/new");
		}
		this.creator_id = this.state.currentUser.id;
	},
	_onChange: function() {

	},
	_updateTitle: function() {

	},
	render: function() {
		return (
			<div />
		);
	}

});

module.exports = GroupForm;