import React from 'react';
import classes from './Button.module.css';
import Radium from 'radium';


 function Button(props) {
  const style = {
    backgroundColor: props.bgColor,
    ':hover': {
      color: props.fontColor,
    },
  };
  if (props.type === 'submit') {
    return (
      <input
        className={[classes.Button, classes.GreenButton, 'btn'].join(' ')}
        type='submit'
        value={props.text}
        disabled={props.disabled}
        style={style}
      />
    );
  }
  return (
    <div
      className={[classes.Button, classes.GreenButton, 'btn'].join(' ')}
      onClick={props.onClick}
      style={style}
    >
      {props.text}
    </div>
  );
}
export default Radium(Button);
