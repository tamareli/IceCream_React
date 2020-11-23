import classes from './Product.module.css';
import React from 'react';

export default function Product(props) {
  return (
    <div className={classes.Product}>
      <h2>{props.selectedProduct.productName}</h2>
      <p>{props.selectedProduct.description}</p>
    </div>
  );
}
