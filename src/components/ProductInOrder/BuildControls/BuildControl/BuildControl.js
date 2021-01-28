import classes from '../../../../css/BuildControl.module.css';
import React from 'react';

const BuildControl = (props) => {
  const toppingImage = require(`../../../../assets/images/toppings/${props.image}`);
  return (
    <div className={classes.BuildControl}>
      <div
        style={{
          backgroundImage: 'url(' + toppingImage + ')',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'white',
        }}
      ></div>
      <h5>{props.title}</h5>
      <div className={classes.Amount}>
        <div className={classes.Plus} onClick={props.addClicked}>
          <b>+</b>
        </div>
        <span>{props.amount}</span>
        <div className={classes.Minus} onClick={props.removeClicked}>
          <b>-</b>
        </div>
      </div>
    </div>
  );
};

export default BuildControl;
