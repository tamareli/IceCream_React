import React from 'react';
import classes from './Button.module.css';

export default function Button(props) {
  if (props.type === 'submit') {
    return (
      <input
        className={[classes.Button, classes.GreenButton, 'btn'].join(' ')}
        type='submit'
        value={props.text}
        disabled={props.disabled}
        style={{ backgroundColor: props.bgColor }}
      />
    );
  }
  return (
    <div
      className={[classes.Button, classes.GreenButton, 'btn'].join(' ')}
      onClick={props.onClick}
      style={{ backgroundColor: props.bgColor }}
    >
      {props.text}
    </div>
  );
}
