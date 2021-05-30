import React from 'react';
import Toppings from './Toppings';
import classes from '../../css/Orders.module.css';

export default function OrderItem(props) {

  const productImage = require(`../../assets/images/products/${props.item.image}`);

  return (
    <div className={[classes.OrderItem, 'row'].join(' ')}>
      <p className='col-md-4'>{props.item.productName}
      <img src={productImage} width= '100' height= '100'/></p>
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
