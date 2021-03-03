import React from 'react';
import classes from '../../../css/SelectSize.module.css';
import Sizes from './Sizes/Sizes';
import PinkButton from '../../UI/Button/PinkButton';
import { Component } from 'react';
class ServingPreference extends Component {
  state = {
    selectedSize: null,
  };
  sizeClickedHandler = (size) => {
    console.log('size: ', size);

    this.setState({ size: size });
  };
  render() {
    return (
      <div className={classes.Container}>
        <h3>בחר/י גודל רצוי</h3>
        <Sizes
          sizes={this.props.sizes}
          sizeClicked={(size) => {
            this.sizeClickedHandler(size);
          }}
          selectedSize={this.props.selectedSize}
        />
        <div
          className='PinkWhiteButton'
          onClick={() => {
            this.props.onClose();
            this.props.sizeClicked(this.state.size);
          }}
        >
          אישור
        </div>
      </div>
    );
  }
}

export default ServingPreference;
