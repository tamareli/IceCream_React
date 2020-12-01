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
    category: {},
    product: {},
    toppingsCatgs: [],
    sizes: [],
    toppings: {},
    selectedSize: {},
    ServingPreference: '',
    startingPrice: 0, //according to size
    toppingsPrice: 0,
    freeToppingsAmount: {
      // should be getting from an api to a certain product,
      sauces: 2,
      others: 3,
    },
    toppingsAmount: {
      sauces: 0, //רטבים
      others: 0, // תוספות
    },
    purchaseble: false,
    preferenceClicked: false,
  };
  componentDidMount() {
    //product
    axios
      .get('product/product/' + this.props.match.params.product_id)
      .then((res) => {
        this.setState({ product: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    //category
    axios
      .get('category/category/' + this.props.location.state.categoryId)
      .then((res) => {
        let updateFreeToppingsAmount = this.state.freeToppingsAmount;
        updateFreeToppingsAmount['sauces'] =
          res.data.freeToppingsForSaucesAmount;
        updateFreeToppingsAmount['others'] =
          res.data.freeToppingsForOthersAmount;
        this.setState({
          category: res.data,
          freeToppingsAmount: updateFreeToppingsAmount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //toppingsCategories
    axios
      .get(
        'category/toppingsCategoriesForProductCategory/' +
          this.props.location.state.categoryId
      )
      .then((res) => {
        this.setState({ toppingsCatgs: res.data });
      })
      .catch((err) => console.log(err));
    //toppings id:{...},id:{...}
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
    //sizes
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
  sizeClickHandler = (price) => {
    this.setState({ startingPrice: price });
  };
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
  GetCurrToppingCount = (catgType, amountUpdate) => {
    let currToppingCount = this.state.toppingsAmount[catgType];
    currToppingCount += amountUpdate;
    return currToppingCount;
  };
  updateOrderedToppingsAmount = (currToppingCount, catgType) => {
    //עדכון כמות התוספות או הרטבים הכללית שנבחרה
    let updatedToppingsAmount = { ...this.state.toppingsAmount };
    updatedToppingsAmount[catgType] = currToppingCount;
    return updatedToppingsAmount;
  };
  updateOrderedToppingAmount = (toppingId, amountUpdate) => {
    let updatedCount = this.state.toppings[toppingId]['amount'];
    if (amountUpdate < 0) {
      if (updatedCount <= 0) return;
    }
    updatedCount += amountUpdate;
    const updateToppings = { ...this.state.toppings };
    updateToppings[toppingId]['amount'] = updatedCount;
    return updateToppings;
  };

  addToppingHandler = (toppingId, catgId) => {
    let catgType = this.state.toppingsCatgs.find(
      (catg) => catg.categoryId === catgId
    ).categoryName;
    if (catgType === 'רטבים') catgType = 'sauces';
    else catgType = 'others';
    let currToppingCount = this.GetCurrToppingCount(catgType, 1);
    let updatedToppingsAmount = this.updateOrderedToppingsAmount(
      currToppingCount,
      catgType
    );
    let updateToppings = this.updateOrderedToppingAmount(toppingId, 1);
    //עדכון המחיר הכללי
    let updatedtoppingsPrice = this.state.toppingsPrice;
    updatedtoppingsPrice =
      currToppingCount > this.state.freeToppingsAmount[catgType]
        ? updatedtoppingsPrice + updateToppings[toppingId]['price']
        : updatedtoppingsPrice;
    // עדכון הסטייט
    this.setState({
      toppings: updateToppings,
      toppingsPrice: updatedtoppingsPrice,
      toppingsAmount: updatedToppingsAmount,
    });
    console.log(updatedToppingsAmount);
    console.log(updatedtoppingsPrice);
  };

  removeToppingHandler = (toppingId, catgId) => {
    let catgType = this.state.toppingsCatgs.find(
      (catg) => (catg.categoryId = catgId)
    ).categoryName;
    if (catgType === 'רטבים') catgType = 'sauces';
    else catgType = 'others';
    let currToppingCount = this.GetCurrToppingCount(catgType, -1);
    let updatedToppingsAmount = this.updateOrderedToppingsAmount(
      currToppingCount,
      catgType
    );
    let updateToppings = this.updateOrderedToppingAmount(toppingId, -1);
    //עדכון המחיר הכללי
    let updatedtoppingsPrice = this.state.toppingsPrice;
    updatedtoppingsPrice =
      currToppingCount >= this.state.freeToppingsAmount[catgType]
        ? updatedtoppingsPrice - updateToppings[toppingId]['price']
        : updatedtoppingsPrice;
    //עדכון הסטייט
    this.setState({
      toppings: updateToppings,
      toppingsPrice: updatedtoppingsPrice,
      toppingsAmount: updatedToppingsAmount,
    });
  };
  render() {
    console.log(this.state.freeToppingsAmount);
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
