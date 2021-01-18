import React from 'react';
import classes from '../../../css/SelectSize.module.css';
import Sizes from './Sizes/Sizes';
function ServingPreference(props) {
  return (
    <div className={classes.Container}>
      <h3>:גודל רצוי</h3>
      <Sizes
        sizes={props.sizes}
        sizeClicked={props.sizeClicked}
        selectedSize={props.selectedSize}
      />
      <div className={classes.Btn} onClick={props.onClose}>
        אישור
      </div>
    </div>
  );
}

export default ServingPreference;
