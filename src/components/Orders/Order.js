import React from 'react';
import OrderItem from './OrderItem';
import classes from '../../css/Orders.module.css';
import uuid from 'react-uuid';

export default function Order(props) {
  let orderDate = new Date(props.order.orderDate);
  let d = orderDate.getDate();
  let m = orderDate.getMonth() + 1;
  let y = orderDate.getFullYear();

  orderDate = d + '/' + m + '/' + y;
  return (
    <div className={classes.Order}>
      <p>
        {orderDate}
        <b> :תאריך</b>
      </p>
      <p>
        <b>סוג משלוח:</b> {props.order.deliveryTypeName}
      </p>
      <ul style={{ direction: 'rtl' }}>
        {props.order.orderItems.map((item) => {
          return (
            <li key={uuid()}>
              <OrderItem item={item} />
            </li>
          );
        })}
      </ul>
      <p>
        <b>מחיר סופי:</b> &#8362;{props.order.finalPrice}
      </p>
      <hr></hr>
    </div>
  );
}
