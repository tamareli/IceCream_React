import classes from './ToppingsButton.module.css';
import React from 'react';

const ToppingsButton = (props) => {
  return (
    <div className={classes.ToppingsButton} onClick={props.clicked}>
      {props.title}
    </div>
  );
};

export default ToppingsButton;
