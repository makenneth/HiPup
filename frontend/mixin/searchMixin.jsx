var React = require('react'),
		TagIndex = require('../components/tag/tagIndex');
module.exports = {
	componentDidMount: function() {
		$(".search-bar").on("click", "div", function(e){
			if (e.target.className === "calendar" || e.target.className === "divider"){
				return;
			} 
			$("body").animate({
				scrollTop: $(this).offset().top
			}, 'slow');
		});		
		// $(".search-container-sm").on("keyup", "#search-box", function(e){
		// 	debugger;
		// 	if (e.target.id === "search-box"){
		// 		$("body").animate({
		// 			scrollTop: $(this).offset().top
		// 		}, 'slow');
		// 	} 
		// })
	},
	searchContainer: function(){
		if (this.state.searchBarOpen){
			return (<div className="search-container-sm cf">
			<img className="search-icon-sm" src="/search-icon-2.png"/>
			<input id="search-box" type="text" onChange={this.setSearchString}
						 autoFocus value={this.state.searchString} placeholder="Find a pet event"/>
		 	</div>)	
		} else {
			return (
				<div className="search-icon-main" onClick={this.openSearchBar}></div>
				) 
		}
	},
	searchByDistanceIcon: function(){
		if (this.state.distanceSearchOpen){
			return (<div className="searchByDistance">
					<div style={{color: "red"}}>{this.state.locationServiceError}</div>
					<div>Within  <select class="dist" value={this.state.miles} onChange={this.changeDistance}>
						<option value={null}>--</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>  miles</div>
					</div>);		
		} else {
			return <div className="search-by-dist" onClick={this.openDistanceSearch}></div>;
		}
	},
	searchByTagDiv: function(){
		if (this.state.tag){
			return (<div className="searching-by-tag">Searching By: {this.state.tag} <p onClick={this.cancelTag}>Cancel Search</p></div>);
		} else {
		 return (<div className="search-by-tag" onClick={this.openTagSearchModal}>
		 		<div className="tag-index"><TagIndex selectTag={this.selectTag} /></div>
		 </div>);
		}
	},
}