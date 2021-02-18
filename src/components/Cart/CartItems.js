import React from 'react';
import CartItem from './CartItem';
import classes from '../../css/Cart.module.css';
import SideModal from '../UI/Modal/SideModal';
import ProductBuilder from '../../containers/ProductBuilder';
import { Component } from 'react';

class CartItems extends Component {
  state = {
    editClicked: false,
    editItem: null,
  };
  editClickedHandler = (item) => {
    this.props.setEditToTrue();
    this.setState({ editItem: item });
  };
  modalClosedHandler = () => {
    this.props.setEditToFalse();
    this.setState({ editItem: null });
  };
  render() {
    if (this.state.editItem !== null) {
      console.log(this.state.editItem.toppings, 'toppings');
    }
    return (
      <div className={classes.Container}>
        <div className={classes.CartItems}>
          {this.state.editItem !== null ? (
            <SideModal
              show={this.props.editClicked}
              modalClosed={this.modalClosedHandler}
            >
              {console.log('top', this.state.editItem.toppings)}
              <ProductBuilder
                edit={true}
                categoryId={this.state.editItem.product.categoryId}
                productId={this.state.editItem.product.productId}
                toppingsEdit={this.state.editItem.toppings}
                size={this.state.editItem.size}
                editItemId={this.state.editItem.id}
                amount={this.state.editItem.amount}
              />
            </SideModal>
          ) : null}

          {this.props.cartItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <CartItem
                  cartItem={item}
                  deleteOrder={() =>
                    this.props.deleteItem(this.props.cartItems, index)
                  }
                  increaseOrderAmount={() => {
                    this.props.updateOrderAmount(
                      this.props.cartItems,
                      index,
                      1
                    );
                  }}
                  decreaseOrderAmount={() => {
                    this.props.updateOrderAmount(
                      this.props.cartItems,
                      index,
                      -1
                    );
                  }}
                  editClicked={() => this.editClickedHandler(item)}
                />
                {index === this.props.cartItems.length - 1 ? null : <hr></hr>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
export default CartItems;
