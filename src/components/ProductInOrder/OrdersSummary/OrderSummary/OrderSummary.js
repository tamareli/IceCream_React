import React from 'react';
import classes from './OrderSummary.module.css';
import { Link } from 'react-router-dom';

const OrderSummary = (props) => {
  let transformedToppings = Object.keys(props.toppings).map((igKey) => {
    return [...Array(props.toppings[igKey]['amount'])].map((_, index) => {
      return <div>{props.toppings[igKey]['toppingName']}</div>;
    });
  });

  return (
    <div className={classes.OrderSummary}>
      <h2>{props.product.productName}</h2>
      <h3>:תוספות</h3>
      {transformedToppings}
      <h3>{props.totalPrice} :מחיר סופי</h3>
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
