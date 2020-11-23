import classes from './ProductInOrder.module.css';
import ProductTopping from './ProductTopping/ProductTopping';
import React from 'react';

const Product = (props) => {
  let transformedToppings = Object.keys(props.toppings)
    .map((igKey) => {
      return [...Array(props.toppings[igKey])].map((_, index) => {
        return <ProductTopping key={igKey + '' + index} title={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  return (
    <div className={classes.Product}>
      <h1> {props.product.productName}</h1>
      {transformedToppings}
    </div>
  );
};

export default Product;
