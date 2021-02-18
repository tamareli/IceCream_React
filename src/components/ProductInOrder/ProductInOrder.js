import classes from '../../css/ProductInOrder.module.css';
import ProductTopping from './ProductTopping/ProductTopping';
import React from 'react';
import Canvas from '../../containers/Canvas';
import { Component } from 'react';

class Product extends Component {
  render() {
    let transformedToppings = null;
    if (this.props.toppings) {
      transformedToppings = this.props.toppings.map((topping) => {
        return {
          key: topping.toppingId,
          reference: topping.toppingId,
          image: require(`../../assets/images/toppings/${topping.image}`),
        };
      });
    }
    console.log('toppings from productInOrder', this.props.toppings);
    let pname = null;
    let productImage = null;
    if (this.props.product) {
      pname = this.props.product.productName;
      productImage = require(`../../assets/images/products/build/${this.props.product.image}`);
    }
    return (
      <div className={classes.Product}>
        <h1> הרכבת {pname}</h1>
        <p>
          במוצר זה כלול {this.props.freeToppingsAmount.sauces} רטבים חינמיים
        </p>
        <p>ו{this.props.freeToppingsAmount.others} תוספות שונות</p>
        <Canvas
          productImagePath={productImage}
          toppings={transformedToppings}
        ></Canvas>
      </div>
    );
  }
}

export default Product;
