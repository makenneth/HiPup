
var React = require('react'),
	  HashHistory = require('react-router').hashHistory;

module.exports = {
	_userFetched: function() {
		if (!this.state.currentUser){
			HashHistory.push("/");
		}	
	},
	updateField: function(field, e){
		var fieldObj = {};
		fieldObj[field] = e.target.value;
		this.setState(fieldObj);
	},
	_back: function(e){
		if (e) e.preventDefault();
		HashHistory.goBack();
	},
	_form: function(){
				return (<div className="group-form-parent">
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
					</div>);
	}
};