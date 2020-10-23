import classes from './BuildControl.module.css';
import React from 'react';

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <h4>{props.title}</h4>
      <button onClick={props.addClicked}>+</button>
      <button onClick={props.removeClicked}>-</button>
    </div>
  );
};

export default BuildControl;
