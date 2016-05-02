var React = require('react'),
		CurrentUserState = require("../../mixin/currentUserState"),
		HashHistory = require('react-router').hashHistory,
		ClientActions = require('../../actions/clientActions'),
		GroupStores = require('../../stores/groupStore'),
		Autocomplete = require('../../mixin/autoComplete'),
		UserStore = require('../../stores/userStore');
var GroupForm = React.createClass({
	mixins: [CurrentUserState, Autocomplete],
	getInitialState: function() {
		return {
			lat: 0,
			lng: 0,
			title: "",
			description: "",
			image_url: "",
			creator_id: "",
			city: "",
			state: ""
		};
	},
	componentDidMount: function() {
		this.gfListener = UserStore.addListener(this._userFetched);
		this.groupStoreListener = GroupStores.addListener(this._successInCreation);
	},
	componentWillUnmount: function() {
		if (this.gfListener) this.gfListener.remove();
	},
	_userFetched: function() {
		if (!this.state.currentUser){
			HashHistory.push("/");
		}	
	},
	_setLocation: function(position) {
	},
	updateField: function(field, e){
		var fieldObj = {};
		fieldObj[field] = e.target.value;
		this.setState(fieldObj);
	},
	_handleSubmit: function(e){
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
															 creator_id: this.state.creator_id
															});
	},
	_successInCreation: function(){
		this._back();
	},
	_back: function(e){
		if (e) e.preventDefault();
		HashHistory.goBack();
	},

	render: function() {
		return (
			<div className="group-form-container">
				  <div className="group-form-title">New Group</div>
				  <div className="group-form-parent">
						<form className="group-form" onSubmit={this._handleSubmit}>
							<div className="form-line">
								<label for="title">Title</label>
								<input type="text" value={this.state.title} 
											 onChange={this.updateField.bind(null, "title")} id="title" required/>
							</div>
							<div className="form-line">
								<label for="image">Image Url</label>
								<input type="url" value={this.state.image_url} 
										 	 onChange={this.updateField.bind(null, "image_url")} id="image"/>
							</div>
							<div className="form-line">
								<label for="autocomplete">Primary city</label>
								<input className="city" id="autocomplete" 
											onChange={this.updateField.bind(null, "city")}  value={this.state.city} />
							</div>
							<div className="form-line">
								<label for="state">Primary state</label>
								<input className="state" id="state" 
											onChange={this.updateField.bind(null, "state")} value={this.state.state} />
							</div>
							<div className="form-line">
								<label for="description">Description</label>
								<textarea value={this.state.description} 
											  	onChange={this.updateField.bind(null, "description")} 
											  	id="description" rows="5" required/>
							</div>

							<input className="create-group-button" type="submit" value="Create New Group" />
							<button className="back-button" type="back">Back</button>
						</form>
					</div>
			</div>
		);
	}

});

module.exports = GroupForm;