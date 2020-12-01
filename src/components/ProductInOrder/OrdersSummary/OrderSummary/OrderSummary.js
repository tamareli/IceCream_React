import React, { Component } from 'react';
import classes from './OrderSummary.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actionTypes';

class OrderSummary extends Component {
  state = {
    okClicked: false,
  };
  onClickedChangehandler = () => {
    this.setState({ okClicked: true });
    this.props.addToCart(
      this.props.product,
      this.props.totalPrice,
      this.props.toppings
    );
    //sending data to redux(this.props.toppings,this.props.product,this.props.price,this.props.size,this.props.pref)
  };
  render() {
    let transformedToppings = Object.keys(this.props.toppings).map((igKey) => {
      return [...Array(this.props.toppings[igKey]['amount'])].map(
        (_, index) => {
          return <div>{this.props.toppings[igKey]['toppingName']}</div>;
        }
      );
    });
    let summary = (
      <div>
        <h2>{this.props.product.productName}</h2>
        <h3>:תוספות</h3>
        {transformedToppings}
        <h3>{this.props.totalPrice} :מחיר סופי</h3>
        <button onClick={this.onClickedChangehandler}>אישור</button>
      </div>
    );
    let buttons = (
      <div>
        {' '}
        <Link to='/OrdersSummary'>
          <button>קופה</button>
        </Link>
        <Link to='/'>
          <button>המשך קניה</button>
        </Link>
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
    addToCart: (product2, totalprice, toppings2) => {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
          product: product2,
          price: totalprice,
          toppings: toppings2,
        },
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(OrderSummary);
