var Modal = require('react-modal'),
    ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var React = require('react'),
    ReactDOM = require('react-dom'),
    router = require('./router');


document.addEventListener("DOMContentLoaded", function(){
  Modal.setAppElement(document.body);
  ReactDOM.render(router(), document.getElementById("root"));
});
