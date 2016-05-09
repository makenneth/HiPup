
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
	toggleSelect: function(box, e){
		var tags = this.state.tags,
				selectedId = e.target.value;
		
		tags[box] = selectedId;
		this.setState({tags: tags});
	},
	moreTags: function() {
		this.setState({numOfTags: this.state.numOfTags + 1});
	},
	isSelected: function(tag) {
		return this.state.tags.indexOf(tag) > -1;
	},
	selectDiv: function(id) {
		return (<select class="form-tag-checkbox" onChange={this.toggleSelect.bind(null, id)} key={id}>
								<option value={null}></option>
								{
									this.state.allTags.map(function(tag){
										return (<option key={tag.id} value={tag.id}>
														 {tag.name}</option>);
									}.bind(this))
								}
							</select>);
		
	},
	multipleCheckBox: function(id){
		return <div id="multiple-checkbox-div">
							{
								Array.from(Array(this.state.numOfTags), function(a,i){
										return this.selectDiv(i);}.bind(this))
							}
					</div>;
	},
	_back: function(e){
		if (e) e.preventDefault();
		HashHistory.goBack();
	},
	_home: function(e){
		e.preventDefault();
		HashHistory.push("/");
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
							<div className="form-line">
								<label for="tag">Tags</label>
								{this.multipleCheckBox()}
							</div>
							<a onClick={this.moreTags} style={{alignSelf: 'flex-end'}}>Add More tags</a> 

							<input className="create-group-button" type="submit" value="Create New Group" />
						</form>
						<div className="back-button" onClick={this._home}></div>
					</div>);
	}
};