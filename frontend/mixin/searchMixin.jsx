var React = require('react'),
		TagIndex = require('../components/tag/tagIndex');
module.exports = {
	// componentDidMount: function() {
	// 	$(".search-bar").on("click", "div", function(e){
	// 		if (e.target.className === "calendar" || e.target.className === "divider"){
	// 			return;
	// 		} 
	// 		$("body").animate({
	// 			scrollTop: $(this).offset().top
	// 		}, 'slow');
	// 	});		

	// },
	// componentDidUpdate: function(prevProps, prevState) {
	// 	if(this.state.searchBarOpen){
	// 		$("#search-box").on("keyup", function(e){
	// 			$("body").animate({
	// 						scrollTop: $(this).offset().top
	// 					}, 'slow');	  
	// 		})
	// 	}
	// },

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
	}
}