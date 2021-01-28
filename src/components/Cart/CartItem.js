import React from 'react';
import classes from '../../css/Cart.module.css';
export default function CartItem(props) {
  let transformedToppings = Object.keys(props.cartItem.toppings).map(
    (igKey) => {
      return [...Array(props.cartItem.toppings[igKey]['amount'])].map(
        (_, index) => {
          return (
            <div key={index}>
              {props.cartItem.toppings[igKey]['toppingName']}
            </div>
          );
        }
      );
    }
  );
  const productImage = require(`../../assets/images/products/${props.cartItem.product.image}`);
  return (
    <>
      <div className={classes.cartItem}>
        <div className={classes.Images}>
          <div
            className={classes.Img}
            style={{
              backgroundImage: 'url(' + productImage + ')',
            }}
          ></div>
          <div className={classes.Header}>
            גודל:
            <div
              className={classes.Img}
              style={{
                backgroundImage: 'url(' + productImage + ')',
              }}
            ></div>
            <p>{props.cartItem.size.sizeName}</p>
          </div>
        </div>
        <div className={classes.Description}>
          <div>
            <h2>{props.cartItem.product.productName}</h2>
            <p className={classes.Header}>תוספות:</p>
            {transformedToppings}
          </div>
        </div>{' '}
        <div className={classes.AmountPrice}>
          <p className={classes.Remove}>
            <b onClick={props.deleteOrder}>X</b>
          </p>

          <div className={classes.Price}>
            <p className={classes.Header}>מחיר:</p>
            <p> &#8362;{props.cartItem.price}</p>
          </div>
          <div className={classes.Amount}>
            <div className={classes.Plus} onClick={props.increaseOrderAmount}>
              <b>+</b>
            </div>
            <span>{props.cartItem.amount}</span>
            <div className={classes.Minus} onClick={props.decreaseOrderAmount}>
              <b>-</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
