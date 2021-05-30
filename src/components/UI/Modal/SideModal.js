import React, { Component } from 'react';
import classes from './SideModal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class SideModal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          <i className={["fas fa-times fa-3x", classes.Close].join(' ')}
              onClick={this.props.modalClosed}
          ></i>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default SideModal;
