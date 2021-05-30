import React, { Component } from 'react';
import classes from '../../../css/OrderSummary.module.css';
import { connect } from 'react-redux';
import * as cartActions from '../../../store/actions/cart';
import uuid from 'react-uuid';

class OrderSummary extends Component {
  onClickedChangehandler = () => {
    this.props.purchaseHandler();
    this.props.addToCart(
      this.props.product,
      this.props.totalPrice,
      this.props.toppings,
      this.props.size,
      this.props.orders,
      this.props.toppingsAmount,
      this.props.toppingsPrice
    );
    this.props.initProductBuilder();
  };
  render() {
    /***/
    let transformedToppings = null;
    if (this.props.toppings) {
      transformedToppings = this.props.toppings.map((top) => {
        return top.toppingName;
      });
    }

    let pname = null;
    let productImage = null;
    if (this.props.product) {
      pname = this.props.product.productName;
      productImage = require(`../../../assets/images/products/${this.props.product.image}`);
    }

    return (
      <div className='row'>
        <p>סיכום הזמנה</p>
        <hr></hr>
        <div className={[classes.DetailsContainer, 'col-md-7'].join(' ')}>
          <h4>:תוספות</h4>
          <p style={{ textAlign: 'right' }}>{transformedToppings.join(', ')}</p>
          <h4>{this.props.totalPrice} :מחיר סופי</h4>
          <button
            className='PinkWhiteButton'
            onClick={this.onClickedChangehandler}
          >
            אישור
          </button>
        </div>
        <div className={[classes.ProductContainer, 'col-md-5'].join(' ')}>
          <h4 style={{ textAlign: 'center' }}>{pname}</h4>
          <div
            className={classes.Img}
            style={{
              backgroundImage: 'url(' + productImage + ')',
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (newProduct, totalprice, newToppings, newSize, orders, toppingsAmount, toppingsPrice) => {
      let newOrder = {
        id: uuid(),
        product: newProduct,
        price: totalprice,
        toppings: newToppings,
        size: newSize,
        amount: 1,
        toppingsAmount: toppingsAmount,
        toppingsPrice: toppingsPrice
      };
      dispatch(cartActions.addOrder(orders, newOrder));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.cart.cartItems,
    toppings: state.productBuilder.toppings,
    toppingsAmount: state.productBuilder.toppingsAmount,
    toppingsPrice: state.productBuilder.toppingsPrice,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
