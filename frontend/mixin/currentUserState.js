var UserStore = require('../stores/userStore'),
	  UserActions = require('../actions/userActions');
module.exports = {
	getInitialState: function() {
		return {
			currentUser: null,
			errors: [] 
		};
	},
	componentDidMount: function() {
		UserStore.addListener(this._updateUser);
		if (!this.state.currentUser){
			UserActions.fetchCurrentUser();
		}
	},
	_updateUser: function() {
		this.setState({
			currentUser: UserStore.currentUser(),
			errors: UserStore.errors()	
		});
	}
};