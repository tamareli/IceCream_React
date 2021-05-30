import classes from '../../css/ProductInOrder.module.css';
import ProductTopping from './ProductTopping/ProductTopping';
import React from 'react';
import Canvas from '../../containers/Canvas';
import OutsideToppings from './OutsideToppings';
import { Component } from 'react';

class Product extends Component {
  render() {
    let transformedToppings = null;
    let transformedOtherToppings = null;
    if (this.props.toppings) {
      transformedToppings = this.props.toppings.filter((topping) => {
       return topping.categoryId === 24 || topping.categoryId === 27
        });
        transformedToppings = transformedToppings.map((topping) => {   
          return {
            key: topping.toppingId,
            reference: topping.toppingId,
            image: require(`../../assets/images/toppings/${topping.image}`),
          };
      });

        transformedOtherToppings = this.props.toppings.filter((topping) => {
        return topping.categoryId === 23 || topping.categoryId === 28
         });
         transformedOtherToppings = transformedOtherToppings.map((topping) => {   
           return {
             key: topping.toppingId,
             image: require(`../../assets/images/toppings/${topping.image}`),
           };
       });
    }
    let pname = null;
    let productImage = null;
    if (this.props.product) {
      pname = this.props.product.productName;
      productImage = require(`../../assets/images/products/build/${this.props.product.image}`);
    }
    return (
      <div className={classes.Product}>
        <div>
          <h1 className={classes.Line} style={{ padding: '0.5rem' }}>
            {' '}
            הרכבת {pname}
          </h1>
          <p>
            במוצר זה כלול <b>{this.props.freeToppingsAmount.sauces}</b> רטבים
            חינמיים
            <br /> ו<b>{this.props.freeToppingsAmount.others}</b> תוספות שונות
          </p>
        </div>
        <Canvas
          productImagePath={productImage}
          toppings={transformedToppings}
          categoryId={this.props.categoryId}
        ></Canvas>
        <OutsideToppings toppings={transformedOtherToppings}/>
      </div>
    );
  }
}

export default Product;
