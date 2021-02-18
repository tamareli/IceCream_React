import React from 'react';
import classes from '../../css/Cart.module.css';
import { Link } from 'react-router-dom';

export default function PayButton(props) {
  return props.length === 0 ? null : (
    <div className={classes.Pay}>
      <p>
        מחיר סופי:<span>&#8362;{props.finalPrice}</span>
      </p>
      <Link to={props.path}>
        <button className={classes.Button}>המשך לתשלום</button>
      </Link>
    </div>
  );
}
