const Modal = require('react-modal');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const React = require('react');
const ReactDOM = require('react-dom');

const router = require('./router');


document.addEventListener("DOMContentLoaded", () => {
  Modal.setAppElement(document.body);
  ReactDOM.render(router(), document.getElementById("root"));
});
