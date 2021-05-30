import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from '../css/Cart.module.css';
import { Component } from 'react';
import * as cartActions from '../store/actions/cart';
import CartItems from '../components/Cart/CartItems';
import Pay from '../components/Cart/PayButton';
import PinkButton from '../components/UI/Button/PinkButton';
import ErrorBoundary from '../components/ErrorBoundary';
import Layout from '../hoc/Layout/Layout';



class OrdersSummary extends Component {
  render() {
    let path = '/Authenticate?redirectTo=/OrderDetails';
    return (
      <Layout>
      <div className={classes.Content}>
        <h3 style={{ paddingBottom: '2rem' }}>פירוט הזמנה</h3>

        <div className={classes.OrdersSummary}>
          {this.props.cartItems.length === 0 ? (
            <div className={classes.Empty}>
              <p>...העגלה שלך ריקה</p>
              <i
                style={{ fontSize: '11rem' }}
                className='fa fa-shopping-cart'
              ></i>
              <Link to='/Products' style={{ margin: '1rem' }}>
                <PinkButton text='הוסף מוצרים לעגלה' />
              </Link>
            </div>
          ) : (
            <>
            <ErrorBoundary>
              <Pay
                path={path}
                length={this.props.cartItems.length}
                finalPrice={this.props.finalPrice}
              />
            </ErrorBoundary>
            
              <CartItems
                cartItems={this.props.cartItems}
                deleteItem={this.props.deleteItem}
                updateOrderAmount={this.props.updateOrderAmount}
                updateOrderAmount={this.props.updateOrderAmount}
                setEditToTrue={this.props.setEditToTrue}
                setEditToFalse={this.props.setEditToFalse}
                editClicked={this.props.editClicked}
              />
              <div style={{display:'block'}}>
                <PinkButton text='נקה עגלה' onClick={this.props.clearCart}/>
              </div>

            </>
          )}
        </div>
      </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
    finalPrice: state.cart.finalPrice,
    isAuthenticated: state.auth.token !== null,
    editClicked: state.cart.editClicked,
  };
};
const mapDispatcToProps = (dispatch) => {
  return {
    deleteItem: (orders, index) =>
      dispatch(cartActions.deleteOrder(orders, index)),
    updateOrderAmount: (orders, index, amount) =>
      dispatch(cartActions.updateOrderAmount(orders, index, amount)),
    setEditToTrue: () => dispatch(cartActions.setEditTrue()),
    setEditToFalse: () => dispatch(cartActions.setEditFalse()),
    clearCart: ()=> dispatch(cartActions.clearCart())
  };
};
export default connect(mapStateToProps, mapDispatcToProps)(OrdersSummary);
