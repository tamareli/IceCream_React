import classes from './Product.module.css';
import React from 'react';
import PinkButton from '../../UI/Button/GreenButton';

export default function Product(props) {
  console.log(props.selectedProduct);
  const productImage = require(`../../../assets/images/products/${props.selectedProduct.image}`);
  return (
    <div className={classes.Product}>
      <div
        className={classes.Img}
        style={{
          backgroundImage: 'url(' + productImage + ')',
        }}
      ></div>
      <div className={classes.Content}>
        {' '}
        <div className={classes.description}>
          <h2>{props.selectedProduct.productName}</h2>
          <p>{props.selectedProduct.description}</p>
        </div>
        <PinkButton text='הרכב מנה' bgColor='white' />
      </div>
    </div>
  );
}
