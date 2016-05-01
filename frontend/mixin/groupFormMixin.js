var React = require('react'),
		HashHistory = require('react-router').hashHistory;
module.exports = {
	_updateTitle: function(e) {
		this.setState({title: e.target.value});
	},
	_updateDescription: function(e) {
		this.setState({description: e.target.value});
	},
	_updateImageUrl: function(e) {
		this.setState({image_url: e.target.value});
	},
	_form: function(){
		return (<div><form onSubmit={this._handleSubmit}>
			<div className="form-group">
				<label for="title">Title</label>
				<input className="form-control" type="text" value={this.state.title} 
							 onChange={this._updateTitle} id="title"/>
			</div>
			<div className="form-group">
				<label for="description">Description</label>
				<textarea className="form-control" value={this.state.description} 
							  	onChange={this._updateDescription} id="description"/>
			</div>
			<div className="form-group">
				<label for="image">Image</label>
				<input className="form-control" type="url" value={this.state.image_url} 
						 	 onChange={this._updateImageUrl} id="image"/>
			</div>
			<input className="btn btn-success" type="submit" value="Create New Group"/>
		</form>
		<button className="btn btn-default" onClick={this._back}>Back</button></div>);
	}
};