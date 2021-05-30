import classes from './Product.module.css';
import React from 'react';
import GreenButton from '../../UI/Button/GreenButton';

export default function Product(props) {
  
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
        <GreenButton text='הרכב מנה' bgColor='white' fontColor='white' />
      </div>
    </div>
  );
}
