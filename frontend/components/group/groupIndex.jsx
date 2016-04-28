var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem'),
		Search = require('../search/search'),
		Modal = require('react-modal'),
		SearchStyle = require('../../modal/searchStyle');
var banner = "http://cdn.thebolditalic.com/paperclip/articles/6006/rect_images/original/Lantern2800.png?1412726396";

var GroupIndex = React.createClass({
	getInitialState: function() {
		return {
			groups: [],
			searchModalOpen: false,
			searchString: ""
		};
	},
	componentDidMount: function() {
		GroupStore.addListener(this._onLoad);
		ClientActions.fetchAllGroups();
	},
	_onLoad: function() {
		this.setState({groups: GroupStore.all()});
	},
	openSearchModal: function(e){
		this.setState({ searchModalOpen: true, searchString: e.target.value});
	},
	closeSearchModal: function() {
		this.setState({ searchModalOpen: false });
	},
	render: function() {
		return (
			<div>
				<div className="banner"><img src={banner} /></div>
				<div className="search-bar">
					<input type="text" onChange={this.openSearchModal} 
								 value={this.state.searchString} />
				</div>
				<Modal isOpen={ this.state.searchModalOpen } 
							 onRequestClose={this.closeSearchModal}
							 style={SearchStyle}>
					<Search groups={ this.state.groups } 
									searchString={ this.state.searchString } 
									closeModal={this.closeSearchModal}/>
				</Modal>
				<div className="group-index cf">
					{
						this.state.groups.map(function(group){
							return <GroupIndexItem group={group} key={group.id} />;
						})
					}
				</div>
			</div>
		);
	}

});

module.exports = GroupIndex;