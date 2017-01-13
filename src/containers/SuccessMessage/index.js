import React, { Component } from 'react';
import { connect } from "react-redux";
import { closeModal } from "redux/modules/success";

import './styles.scss';

@connect(({ success }) => ({
  message: success.get('message'),
  open: success.get('open'),
}),
  { close: closeModal }
)
export default class SuccessMessage extends Component {
  componentDidMount() {
    setTimeout(this.props.close, 3000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
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
