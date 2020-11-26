import React from 'react';
import classes from './ServingPreference.module.css';
import Sizes from './Sizes/Sizes';
import Serving from './Serving/Serving';
function ServingPreference(props) {
  return (
    <div className={classes.Container}>
      <Sizes sizes={props.sizes} sizeClicked={props.sizeClicked} />
      <Serving />
      <button onClick={props.modalClosed}>המשך</button>
    </div>
  );
}

export default ServingPreference;
