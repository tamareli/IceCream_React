import React, { Component } from 'react';
import classes from '../../../css/OrderSummary.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as cartActions from '../../../store/actions/cart';
import uuid from 'react-uuid';

class OrderSummary extends Component {
  state = {
    okClicked: false,
  };

  onClickedChangehandler = () => {
    this.setState({ okClicked: true });
    this.props.addToCart(
      this.props.product,
      this.props.totalPrice,
      this.props.toppings,
      this.props.size,
      this.props.orders
    );
    this.props.initProductBuilder();
  };
  render() {
    let transformedToppings = null;
    if (this.props.toppings)
      transformedToppings = Object.keys(this.props.toppings).map((igKey) => {
        return [...Array(this.props.toppings[igKey]['amount'])].map(
          (_, index) => {
            return (
              <div key={this.props.toppings[igKey]['toppingId'] + index}>
                {this.props.toppings[igKey]['toppingName']}
              </div>
            );
          }
        );
      });
    let pname = null;
    let productImage = null;
    if (this.props.product) {
      pname = this.props.product.productName;
      productImage = require(`../../../assets/images/products/${this.props.product.image}`);
    }
    let summary = (
      <div className={classes.OrderSummary}>
        <div className={classes.DetailsContainer}>
          <h3>:תוספות</h3>
          {transformedToppings}
          <h3>{this.props.totalPrice} :מחיר סופי</h3>
          <button
            className={classes.Button}
            onClick={this.onClickedChangehandler}
          >
            אישור
          </button>
        </div>
        <div className={classes.ProductContainer}>
          <h2>{pname}</h2>
          <div
            className={classes.Img}
            style={{
              backgroundImage: 'url(' + productImage + ')',
            }}
          ></div>
        </div>
      </div>
    );
    let buttons = (
      <div>
        {' '}
        <div>
          <p>המוצר התווסף לסל בהצלחה</p>
          <hr />
        </div>
        <div className={classes.Buttons}>
          <Link to='/OrdersSummary'>
            <button className={classes.Button}>קופה</button>
          </Link>
          <Link to='/'>
            <button className={classes.Button}>המשך קניה</button>
          </Link>
        </div>
      </div>
    );
    return (
      <div className={classes.OrderSummary}>
        {this.state.okClicked !== true ? summary : buttons}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (newProduct, totalprice, newToppings, newSize, orders) => {
      let newOrder = {
        id: uuid(),
        product: newProduct,
        price: totalprice,
        toppings: newToppings,
        size: newSize,
        amount: 1,
      };
      dispatch(cartActions.addOrder(orders, newOrder));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.cart.cartItems,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
