import React, { Component } from 'react';
import BuildControls from '../../components/ProductInOrder/BuildControls/BuildControls';
import Product from '../../components/ProductInOrder/ProductInOrder';
import classes from './ProductBuilder.module.css';

const TOPPINGS_PRICES = {
  1: 2,
  2: 3,
  3: 4,
  4: 2,
  5: 5,
  6: 3,
  7: 1,
  8: 2,
};

class ProductBuilder extends Component {
  state = {
    productId: 1,
    toppings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    },
    totalPrice: 10, // the starting price should be according to the product (Get Call)
    freeToppingsAmount: {
      // should be getting from an api to a certain product,
      1: 2,
      2: 3,
    },
    toppingsAmount: {
      1: 0, //רטבים
      2: 0, // תוספות
    },
  };

  addToppingHandler = (toppingId, catgId) => {
    //עדכון כמות התוספות או הרטבים הכללית שנבחרה
    let currToppingCount = this.state.toppingsAmount[catgId];
    currToppingCount++;
    let updatedToppingsAmount = { ...this.state.toppingsAmount };
    updatedToppingsAmount[catgId] = currToppingCount;
    //עדכון כמות תוספת מסוימת
    const updateToppings = { ...this.state.toppings };
    updateToppings[toppingId] += 1;
    //עדכון המחיר הכללי
    let updatedTotalPrice = this.state.totalPrice;
    updatedTotalPrice =
      currToppingCount > this.state.freeToppingsAmount[catgId]
        ? updatedTotalPrice + TOPPINGS_PRICES[toppingId]
        : updatedTotalPrice;
    // עדכון הסטייט
    this.setState({
      toppings: updateToppings,
      totalPrice: updatedTotalPrice,
      toppingsAmount: updatedToppingsAmount,
    });
  };
  // needs work
  removeToppingHandler = (toppingId, catgId) => {
    // עדכון הכמות הכללית של הרטבים או התוספות שנבחרה
    let currToppingCount = this.state.toppingsAmount[catgId];
    currToppingCount--;
    let updatedToppingsAmount = { ...this.state.toppingsAmount };
    updatedToppingsAmount[catgId] = currToppingCount;
    //עדכון כמות שהוזמנה מתוספת מסוימת
    let updatedCount = this.state.toppings[toppingId];
    if (updatedCount <= 0) return;
    updatedCount -= 1;
    const updateToppings = { ...this.state.toppings };
    updateToppings[toppingId] = updatedCount;
    //עדכון המחיר הכללי
    let updatedTotalPrice = this.state.totalPrice;
    updatedTotalPrice =
      currToppingCount >= this.state.freeToppingsAmount[catgId]
        ? updatedTotalPrice - TOPPINGS_PRICES[toppingId]
        : updatedTotalPrice;
    this.setState({
      toppings: updateToppings,
      totalPrice: updatedTotalPrice,
      toppingsAmount: updatedToppingsAmount,
    });
  };
  render() {
    console.log(
      'sauces:' +
        this.state.toppingsAmount[1] +
        '   ' +
        'toppings:' +
        this.state.toppingsAmount[2] +
        '   ' +
        'totalPrice:' +
        this.state.totalPrice
    );
    return (
      <div className={classes.ProductBuilder}>
        <BuildControls
          addTopping={this.addToppingHandler}
          removeTopping={this.removeToppingHandler}
        />
        <Product toppings={this.state.toppings} />
      </div>
    );
  }
}

export default ProductBuilder;
