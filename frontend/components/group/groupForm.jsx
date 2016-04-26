var React = require('react'),
		CurrentUserState = require("../../mixin/currentUserState"),
		HashHistory = require('react-router').hashHistory,
		GroupFormMixin = require('../../mixin/groupFormMixin'),
		ClientActions = require('../../actions/clientActions'),
		GroupStores = require('../../stores/groupStore');
//Temporarily use geolocation for lat and lng, have to look up how to set cities
var GroupForm = React.createClass({
	mixins: [CurrentUserState, GroupFormMixin],
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
		this.state.creator_id = this.state.currentUser.id;
		navigator.geolocation.getCurrentPosition(this._setLocation);
		GroupStores.addListener(this._successInCreation);
	},
	_setLocation: function(position) {
		var coords = position.coords;
		this.setState({lat: coords.latitude, lng: coords.longitude});
	},
	_handleSubmit: function(e){
		e.preventDefault();
		ClientActions.createGroup(this.state);
	},
	_successInCreation: function(){
		this.setState({			
			lat: 0,
			lng: 0,
			title: "",
			description: "",
			image_url: "",
			creatorId: ""
		});
		HashHistory.goBack();
	},
	render: function() {
		return (
			<div>
				<h3>New Group</h3>
				{this._form()}
			</div>
		);
	}

});

module.exports = GroupForm;