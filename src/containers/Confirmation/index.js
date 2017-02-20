import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeConfirm } from 'redux/modules/confirmation';

import './styles.scss';

@connect(
  ({ confirmation }) => ({
    callback: confirmation.get('callback'),
    isOpen: confirmation.get('isOpen')
  }),
  { closeConfirm })
export default class Confirmation extends Component {
  handleConfirm = () => {
    this.props.closeConfirm();
    this.props.callback();
  }

  render() {
    if (!this.props.isOpen) {
      return (<div></div>);
    }

    return (
      <div className="overlay">
        <div className="confirmation-modal">
          <div className="confirmation-alert">
            <h3>Are you sure?</h3>
            <div className="button-div">
              <button onClick={this.handleConfirm}>Yes</button>
              <button onClick={this.props.closeConfirm}>No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};