const React = require('react');
const CurrentUserState = require("../../mixin/currentUserState");
const router = require('react-router');
const HashHistory = router.hashHistory;
const ClientActions = require('../../actions/clientActions');
const GroupStore = require('../../stores/groupStore');
const Autocomplete = require('../../mixin/autoComplete');
const UserStore = require('../../stores/userStore');
const GroupFormMixin = require('../../mixin/groupFormMixin');
const TagStore = require('../../stores/tagStore');

const NewGroupForm = React.createClass({
	mixins: [CurrentUserState, Autocomplete, GroupFormMixin],
	getInitialState: function() {
		return {
			lat: 0,
			lng: 0,
			title: "",
			description: "",
			image_url: "",
			creator_id: "",
			city: "",
			state: "",
			allTags: TagStore.all() || [],
			tags: [],
			numOfTags: 1
		};
	},
	componentDidMount: function() {
		this.gfListener = UserStore.addListener(this._userFetched);
		this.groupStoreListener = GroupStore.addListener(this._successInCreation);
		if (!this.state.allTags.length){
			this.tagStoreListener = TagStore.addListener(this._tagsFetched);
			ClientActions.fetchTags();
		}
	},
	componentWillUnmount: function() {
		if (this.gfListener) this.gfListener.remove();
		if (this.groupStoreListener) this.groupStoreListener.remove();
		if (this.tagStoreListener) this.tagStoreListener.remove();
	},
	_tagsFetched: function(){
		this.setState({allTags: TagStore.all()});
	},
	_handleSubmit: function(e) {
		e.preventDefault();
		this.state.creator_id = this.state.currentUser.id;
		ClientActions.createGroup({
		  lat: this.state.lat,
		  lng: this.state.lng,
		  city: this.state.city,
		  state: this.state.state,
		  title: this.state.title,
		  image_url: this.state.image_url,
		  description: this.state.description,
		  creator_id: this.state.creator_id,
		  tag_ids: this.state.tags
		});
	},
	_successInCreation: function() {
		const groupId = GroupStore.last();
		HashHistory.push("groups/" + groupId + "/home");
	},
	render: function() {
		return (
			<div className="group-form-container">
				<div className="paw-print"></div>
			  <div className="group-form-title">New Group</div>
				{this._form()}
			</div>
		);
	}
});

module.exports = NewGroupForm;
