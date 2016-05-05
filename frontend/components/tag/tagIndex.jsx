var React = require('react'),
		TagStore = require('../../stores/tagStore'),
		ClientActions = require('../../actions/clientActions');

var TagIndex = React.createClass({
	getInitialState: function() {
		return {
			tags: [] 
		};
	},
	componentDidMount: function() {
		this.tagIdxListener = TagStore.addListener(this._onReceive);
		$("#tag-list").on("click", ".tag-div", function(e){
			var $target = $(e.target).find('ul');
			$target.hide().removeClass("hidden").slideDown("slow");
		}) //using jquery temporarily
		// var tagListDiv = document.getElementById("tag-list");
		// this.clickListener = tagListDiv.addEventListener("click", this._showGroup);
		ClientActions.fetchTags();
	},
	componentWillUnmount: function() {
		if (this.tagIdxListener){
			this.tagIdxListener.remove();
		}
	},
	_onReceive: function(){
		this.setState({tags: TagStore.all()});
	},

	_showGroup: function(e){
		// e.target.children[0].className = "slow-show";
	},
	render: function() {
		//should show by how many per location (maybe top 3)
		//first..when user sign up, convert their location to city and store them
		//(also store lat and lng), this is to save convert time
		//since sign up is not likely to be tested
		//click title should show tag-show
		return (
			<div>
				<div className="close-icon" onClick={this.props.closeModal}>&#10006;</div>
				<div className="tag-list cf" id="tag-list">
				{
					this.state.tags.map(function(tag){
						return <div className="tag-div" key={tag.id} onClick={this._clickTag}>{tag.name}
								<ul className="hidden">
									{
										tag.groups.map(function(group){
											return <li key={group.id}><a href={"#/groups/" + group.id + "/home"}>{group.title}</a></li>;
										})
									}
								</ul>
						</div>;
					})
				}
				</div>
			</div>
		);
	}

});

module.exports = TagIndex;