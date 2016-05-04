var React = require('react'),
		CurrentUserState = require("../../mixin/currentUserState"),
		HashHistory = require('react-router').hashHistory,
		ClientActions = require('../../actions/clientActions'),
		GroupStores = require('../../stores/groupStore'),
		Autocomplete = require('../../mixin/autoComplete'),
		UserStore = require('../../stores/userStore'),
		GroupFormMixin = require('../../mixin/groupFormMixin'),
		ErrorStore = require('../../stores/errorStore');
var GroupEditForm = React.createClass({
	mixins: [CurrentUserState, Autocomplete, GroupFormMixin],
	getInitialState: function() {
		return GroupStores.find(this.props.groupId);
	},
	componentDidMount: function() {
		this.gfListener = UserStore.addListener(this._userFetched);
		if (!this.state.title){
			this.groupStoreListener = GroupStores.addListener(this._fetchedGroup);
			ClientActions.fetchSingleGroup(this.props.groupId, UserStore.currentLocation().timeZone);
		} else {
			this.groupStoreListener = GroupStores.addListener(this._successInUpdate);
		}
	},
	_fetchedGroup: function() {
		this.setState(GroupStores.find(this.props.groupId));
		this.groupStoreListener.remove();
		this.groupStoreListener = GroupStores.addListener(this._successInUpdate);
	},
	componentWillUnmount: function() {
		if (this.gfListener) this.gfListener.remove();
		if (this.groupStoreListener) this.groupStoreListener.remove();
	},
	_successInUpdate: function(){
		this.props.setMessage("Group has been updated!");
		this.props.showSuccess();
	},
	_handleSubmit: function(e){
		e.preventDefault();
		ClientActions.updateGroup({
															 lat: this.state.lat, 
															 lng: this.state.lng, 
															 city: this.state.city, 
															 state: this.state.state,
															 title: this.state.title,
															 image_url: this.state.image_url,
															 description: this.state.description
															}, this.props.groupId);
	},
	render: function() {
		return (
			<div>
				<div className="show-errors">
					{
						ErrorStore.getError().map(function(error){
							return <li>{error}</li>;
						})
					}
				</div>
				<div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
				<div className="group-form-title">Edit Group</div>
				 {this._form()}
		 </div>
		);
	}

});

module.exports = GroupEditForm;