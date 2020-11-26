import React, { Component } from 'react';
import BuildControls from '../../components/ProductInOrder/BuildControls/BuildControls';
import ProductInOrder from '../../components/ProductInOrder/ProductInOrder';
import classes from './ProductBuilder.module.css';
import axios from '../../axios';
import Modal from '../../components/UI/Modal/Modal';
import ServingPreference from '../../components/ProductInOrder/ServingPreference/ServingPreference';
import OrderSummary from '../../components/ProductInOrder/OrdersSummary/OrderSummary/OrderSummary';

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
    preferenceClicked: false,
    product: {},
    toppingsCatgs: [],
    toppings: {
      //toppings (not categoriesToppings) allowed according to product
    },
    startingPrice: 0, //according to size
    toppingsPrice: 0,
    sizes: [],
    freeToppingsAmount: {
      // should be getting from an api to a certain product,
      1: 2,
      2: 3,
    },
    toppingsAmount: {
      1: 0, //רטבים
      2: 0, // תוספות
    },
    purchaseble: false,
  };
  componentDidMount() {
    axios
      .get('product/product/' + this.props.match.params.product_id)
      .then((res) => {
        this.setState({ product: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        'category/toppingsCategoriesForProductCategory/' +
          this.props.location.state.categoryId
      )
      .then((res) => {
        this.setState({ toppingsCatgs: res.data });
      })
      .catch((err) => console.log(err));
    axios
      .get(
        'topping/toppingsByCatgProduct/' + this.props.location.state.categoryId
      )
      .then((res) => {
        const updatedToppings = res.data.map((topping) => {
          return {
            ...topping,
            amount: 0,
          };
        });
        const toppingsObject = this.arrayToObject(updatedToppings);
        this.setState({ toppings: toppingsObject });
      });
    axios
      .get('size/sizes/' + this.props.location.state.categoryId)
      .then((res) => {
        this.setState({ sizes: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  arrayToObject = (array) =>
    array.reduce((obj, item) => {
      obj[item.toppingId] = item;
      return obj;
    }, {});
  preferenceCanceleddHandler = () => {
    this.setState({ preferenceClicked: false });
  };
  preferenceHandler = () => {
    this.setState({ preferenceClicked: true });
  };
  purchasableCanceleddHandler = () => {
    this.setState({ purchaseble: false });
  };
  purchasableHandler = () => {
    this.setState({ purchaseble: true });
  };
  addToppingHandler = (toppingId, catgId) => {
    //עדכון כמות התוספות או הרטבים הכללית שנבחרה
    let currToppingCount = this.state.toppingsAmount[catgId];
    currToppingCount++;
    let updatedToppingsAmount = { ...this.state.toppingsAmount };
    updatedToppingsAmount[catgId] = currToppingCount;
    //עדכון כמות תוספת מסוימת
    const updateToppings = { ...this.state.toppings };
    updateToppings[toppingId].amount += 1;
    //עדכון המחיר הכללי
    let updatedtoppingsPrice = this.state.toppingsPrice;
    updatedtoppingsPrice =
      currToppingCount > this.state.freeToppingsAmount[catgId]
        ? updatedtoppingsPrice + updateToppings[toppingId]['price']
        : updatedtoppingsPrice;
    // עדכון הסטייט
    this.setState({
      toppings: updateToppings,
      toppingsPrice: updatedtoppingsPrice,
      toppingsAmount: updatedToppingsAmount,
    });
  };
  sizeClickHandler = (price) => {
    this.setState({ startingPrice: price });
  };
  // needs work
  removeToppingHandler = (toppingId, catgId) => {
    // עדכון הכמות הכללית של הרטבים או התוספות שנבחרה
    let currToppingCount = this.state.toppingsAmount[catgId];
    currToppingCount--;
    let updatedToppingsAmount = { ...this.state.toppingsAmount };
    updatedToppingsAmount[catgId] = currToppingCount;
    //עדכון כמות שהוזמנה מתוספת מסוימת
    let updatedCount = this.state.toppings[toppingId]['amount'];
    if (updatedCount <= 0) return;
    updatedCount -= 1;
    const updateToppings = { ...this.state.toppings };
    updateToppings[toppingId]['amount'] = updatedCount;
    //עדכון המחיר הכללי
    let updatedtoppingsPrice = this.state.toppingsPrice;
    updatedtoppingsPrice =
      currToppingCount >= this.state.freeToppingsAmount[catgId]
        ? updatedtoppingsPrice - TOPPINGS_PRICES[toppingId]
        : updatedtoppingsPrice;
    this.setState({
      toppings: updateToppings,
      toppingsPrice: updatedtoppingsPrice,
      toppingsAmount: updatedToppingsAmount,
    });
  };
  render() {
    return (
      <div className={classes.ProductBuilder}>
        <Modal
          show={this.state.preferenceClicked}
          modalClosed={this.preferenceCanceleddHandler}
        >
          <ServingPreference
            modalClosed={this.preferenceCanceleddHandler}
            sizes={this.state.sizes}
            sizeClicked={this.sizeClickHandler}
          />
        </Modal>
        <Modal
          show={this.state.purchaseble}
          modalClosed={this.purchasableCanceleddHandler}
        >
          <OrderSummary
            toppings={this.state.toppings}
            product={this.state.product}
            totalPrice={this.state.startingPrice + this.state.toppingsPrice}
          />
        </Modal>
        <BuildControls
          addTopping={this.addToppingHandler}
          removeTopping={this.removeToppingHandler}
          productId={this.props.match.params.product_id}
          toppingsCatgs={this.state.toppingsCatgs}
          openPref={this.preferenceHandler}
          openSize={this.chooseSizeClickedHandler}
          openSummary={this.purchasableHandler}
        />
        <ProductInOrder
          toppings={this.state.toppings}
          product={this.state.product}
        />
      </div>
    );
  }
}

export default ProductBuilder;
