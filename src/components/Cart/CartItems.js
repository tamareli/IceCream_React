import React from 'react';
import CartItem from './CartItem';
import classes from '../../css/Cart.module.css';
import { Link } from 'react-router-dom';

export default function CartItems(props) {
  return (
    <div className={classes.Container}>
      <div className={classes.CartItems}>
        {props.cartItems.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <CartItem
                cartItem={item}
                deleteOrder={() => props.deleteItem(props.cartItems, index)}
                increaseOrderAmount={() => {
                  props.updateOrderAmount(props.cartItems, index, 1);
                }}
                decreaseOrderAmount={() => {
                  props.updateOrderAmount(props.cartItems, index, -1);
                }}
              />
              {index === props.cartItems.length - 1 ? null : <hr></hr>}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
