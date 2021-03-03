import React from 'react';
import classes from '../../css/Cart.module.css';
import { Link } from 'react-router-dom';
import PinkButton from '../UI/Button/PinkButton';

export default function PayButton(props) {
  return props.length === 0 ? null : (
    <div className={classes.Pay}>
      <h5 style={{ textAlign: 'center' }}>
        מחיר סופי:<span>&#8362;{props.finalPrice}</span>
      </h5>
      <Link to={props.path}>
        <button className='PinkWhiteButton'>המשך לתשלום</button>
      </Link>
    </div>
  );
}
