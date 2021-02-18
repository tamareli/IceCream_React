import React from 'react';
import Toppings from './Toppings';
import classes from '../../css/Orders.module.css';

export default function OrderItem(props) {
  return (
    <div className={[classes.OrderItem, 'row'].join(' ')}>
      <p className='col-md-4'>{props.item.productName}</p>
      <div className='col-md-4'>
        <Toppings toppings={props.item.toppings} />
      </div>
      <div className='col-md-4'>
        <p> מחיר: &#8362;{props.item.price} </p>
        <p>כמות: {props.item.amount}</p>
      </div>
    </div>
  );
}
