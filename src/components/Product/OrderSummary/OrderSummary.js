import React from 'react';
import classes from './OrderSummary.module.css';

const OrderSummary = (props) => {
  return (
    <div className={classes.OrderSummary}>
      <h2>מוצר {/*props.product*/}</h2>
      <h3>:תוספות</h3>
      {/*props.toppings.map((top) => {
        return <p>top.name</p>;
      })*/}
      <h3> :מחיר סופי{/*props.totalPrice*/}</h3>
    </div>
  );
};

export default OrderSummary;
