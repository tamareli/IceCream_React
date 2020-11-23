import React from 'react';
import classes from './OrderSummary.module.css';
import { Link } from 'react-router-dom';

const OrderSummary = (props) => {
  return (
    <div className={classes.OrderSummary}>
      <h2> {props.match.params.product_id + ' מוצר'}</h2>
      <h3>:תוספות</h3>
      {/*props.toppings.map((top) => {
        return <p>top.name</p>;
      })*/}
      <h3> :מחיר סופי{/*props.totalPrice*/}</h3>
      <Link to='/OrdersSummary'>
        <button>קופה</button>
      </Link>
      <Link to='/'>
        <button>המשך קניה</button>
      </Link>
    </div>
  );
};

export default OrderSummary;
