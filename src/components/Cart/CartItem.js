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
  const sizeImage = require(`../../assets/images/sizes/${props.cartItem.size.image}`);

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
              className={classes.sizeImg}
              style={{
                backgroundImage: 'url(' + sizeImage + ')',
              }}
            ></div>
            <p style={{ fontWeight: '500', marginTop: 0 }}>
              {props.cartItem.size.sizeName}
            </p>
          </div>
        </div>
        <div className={classes.Description}>
          <div>
            <h3>{props.cartItem.product.productName}</h3>
            {props.cartItem.toppings.length <= 0 ? null : (
              <>
                {' '}
                <p className={classes.Header} style={{ marginBottom: '5px' }}>
                  תוספות:
                </p>
                {transformedToppings}
              </>
            )}
          </div>
        </div>{' '}
        <div className={classes.AmountPrice}>
          <p className={classes.Remove}>
            <b
              onClick={props.deleteOrder}
            >
            <i className={["fas fa-times fa-lg"].join(' ')} style={{ color: 'var(--pink-color)' }}></i>
            </b>
          </p>

          <div className={classes.Price}>
            <p className={classes.Header} style={{ marginBottom: '5px' }}>
              מחיר:
            </p>
            <p> &#8362;{props.cartItem.price}</p>
          </div>
          <div className={classes.AmountEditContainer}>
            <div className={classes.Edit} onClick={props.editClicked}>
              <i className='fa fa-pen fa-md'></i>
            </div>
            <div className={classes.Amount}>
              <div className={classes.Plus} onClick={props.increaseOrderAmount}>
                <b style={{ fontSize: '20px' }}>+</b>
              </div>
              <span style={{ zIndex: '2' }}>
                <b>{props.cartItem.amount}</b>
              </span>
              <div
                className={classes.Minus}
                onClick={props.decreaseOrderAmount}
              >
                <b style={{ fontSize: '25px' }}>-</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
