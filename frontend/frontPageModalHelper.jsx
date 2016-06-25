var React = require('react');
module.exports = {
  getInitialState: function() {
    return {
      logInModalOpen: false,
      signUpModalOpen: false,
      searchModalOpen: false,
    };
  },
  openLogInModal: function() {
    this.setState({ logInModalOpen: true,
                    signUpModalOpen: false, navModalOpen: false });
  },
  closeLogInModal: function() {
    this.setState({ logInModalOpen: false });
  },
  openSignUpModal: function() {
    this.setState({ signUpModalOpen: true,
                    logInModalOpen: false });
  },
  closeSignUpModal: function() {
    this.setState({ signUpModalOpen: false });
  },

  openSearchModal: function(e){
    this.setState({ searchModalOpen: true });
  },
  closeSearchModal: function() {
    this.setState({ searchModalOpen: false });
  }
};