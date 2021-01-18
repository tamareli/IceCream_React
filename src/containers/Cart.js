import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from '../css/Cart.module.css';
import CartItem from '../components/Cart/CartItem';
import { Component } from 'react';
import * as cartActions from '../store/actions/cart';
import CartItems from '../components/Cart/CartItems';
import Pay from '../components/Cart/PayButton';

class OrdersSummary extends Component {
  render() {
    let path = '/Authenticate?redirectTo=/OrderDetails';
    return (
      <div className={classes.Content}>
        <h2>פירוט הזמנה</h2>

        <div className={classes.OrdersSummary}>
          {this.props.cartItems.length === 0 ? (
            <div className={classes.Empty}>
              <p>...העגלה שלך ריקה</p>
              <i
                style={{ fontSize: '11rem' }}
                className='fa fa-shopping-cart'
              ></i>
              <Link to='/' className={classes.Button}>
                הוסף מוצרים לעגלה
              </Link>
            </div>
          ) : (
            <>
              <Pay path={path} length={this.props.cartItems.length} />

              <CartItems
                cartItems={this.props.cartItems}
                deleteItem={this.props.deleteItem}
                updateOrderAmount={this.props.updateOrderAmount}
                updateOrderAmount={this.props.updateOrderAmount}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatcToProps = (dispatch) => {
  return {
    deleteItem: (orders, index) =>
      dispatch(cartActions.deleteOrder(orders, index)),
    updateOrderAmount: (orders, index, amount) =>
      dispatch(cartActions.updateOrderAmount(orders, index, amount)),
  };
};
export default connect(mapStateToProps, mapDispatcToProps)(OrdersSummary);
