import classes from '../../css/ProductInOrder.module.css';
import ProductTopping from './ProductTopping/ProductTopping';
import React from 'react';

const Product = (props) => {
  //canvas
  let transformedToppings = null;
  if (props.toppings)
    transformedToppings = Object.keys(props.toppings)
      .map((igKey) => {
        return [...Array(props.toppings[igKey]['amount'])].map((_, index) => {
          return <ProductTopping key={igKey + '' + index} title={igKey} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  let pname = null;
  let productImage = null;
  if (props.product) {
    pname = props.product.productName;
    productImage = require(`../../assets/images/products/${props.product.image}`);
  }
  return (
    <div className={classes.Product}>
      <h1> {pname}</h1>
      <p>במוצר זה כלול {props.freeToppingsAmount.sauces} רטבים חינמיים</p>
      <p>ו{props.freeToppingsAmount.others} תוספות שונות</p>

      <div
        className={classes.productImage}
        style={{
          backgroundImage: 'url(' + productImage + ')',
        }}
      ></div>
      {transformedToppings}
      <div>
        מחיר: <span>&#8362;{props.price}</span>
      </div>
      <div>
        {props.selectedSize !== null
          ? `גודל: ${props.selectedSize.sizeName}`
          : null}
      </div>
    </div>
  );
};

export default Product;
