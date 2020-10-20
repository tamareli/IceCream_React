import React, { Component } from 'react';
import BuildControls from '../../components/Product/BuildControls/BuildControls';
import Product from '../../components/Product/Product';
import classes from './ProductBuilder.module.css';

class ProductBuilder extends Component {
  render() {
    return (
      <React.Fragment>
        <BuildControls />
        <Product />
      </React.Fragment>
    );
  }
}

export default ProductBuilder;
