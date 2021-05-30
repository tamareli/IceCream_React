import React from 'react';
import classes from '../../../css/SelectSize.module.css';
import Sizes from './Sizes/Sizes';
import PinkButton from '../../UI/Button/PinkButton';
import { Component } from 'react';
import ErrorMessage from '../../UI/Error/ErrorMessage';

class ServingPreference extends Component {
  constructor(props){
    super(props)
    this.state = {
      size: props.selectedSize,
    }
  }
  sizeClickedHandler = (size) => {
    this.setState({ size: size });
  };
  render() {
    if(this.props.sizesError){
      return <ErrorMessage />
    }
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
