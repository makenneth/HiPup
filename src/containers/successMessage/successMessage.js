import React, { Component } from 'react';
import { connect } from "react-redux";
import { closeModal } from "redux/modules/success";

@connect(({ success: { message, open } }), { close: closeModal })
export default class SuccessMessage extends Component {
  componentDidMount() {
    setTimeout(this.props.close, 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.close && !this.props.close) {
      setTimeout(this.props.close, 3000);
    }
  }
  render() {
    return (
      <div id="success-message">
        <p>{this.props.message}</p>
        <button className="ok" onClick={this.props.close}>Ok</button>
      </div>
    );
  }
};
