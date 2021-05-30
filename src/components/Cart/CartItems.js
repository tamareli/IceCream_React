import React from 'react';
import CartItem from './CartItem';
import classes from '../../css/Cart.module.css';
import SideModal from '../UI/Modal/SideModal';
import ProductBuilder from '../../containers/ProductBuilder';
import { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import DeleteOrderMessage from './DeleteOrderMessage';
import Modal from '../UI/Modal/Modal';

class CartItems extends Component {
  state = {
    editClicked: false,
    editItem: null,
    isDeleteClicked: false,
    deletedItemIndex: null
  };
  editClickedHandler = (item) => {
    this.props.setEditToTrue();
    this.setState({ editItem: item });
  };
  modalClosedHandler = () => {
    this.props.setEditToFalse();
    this.setState({ editItem: null });
  };
  deleteClickedHandler = (index) => {
    this.setState({ isDeleteClicked: true , deletedItemIndex: index });
  };
  deleteModalClosedHandler = () => {
    this.setState({ isDeleteClicked: false, deletedItemIndex: null});
  };
  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.CartItems}>
          {this.state.editItem !== null ? (
            <SideModal
              show={this.props.editClicked}
              modalClosed={this.modalClosedHandler}
            >
              <ErrorBoundary>
                <ProductBuilder
                  edit={true}
                  categoryId={this.state.editItem.product.categoryId}
                  productId={this.state.editItem.product.productId}
                  toppingsEdit={this.state.editItem.toppings}
                  size={this.state.editItem.size}
                  editItemId={this.state.editItem.id}
                  amount={this.state.editItem.amount}
                  toppingsPriceEdit={this.state.editItem.toppingsPrice}
                  toppingsAmountEdit={this.state.editItem.toppingsAmount}
                />
              </ErrorBoundary>
            </SideModal>
          ) : null}

          {this.state.deletedItemIndex !== null ? (
            <Modal
              show={this.state.isDeleteClicked}
              modalClosed={this.deleteModalClosedHandler}
            >
              <ErrorBoundary>
                <DeleteOrderMessage
                  deleteOrder= {() => {
                    this.props.deleteItem(this.props.cartItems, this.state.deletedItemIndex)
                    this.deleteModalClosedHandler()
                  }

                  }
                  cancelDelete= {this.deleteModalClosedHandler}
                />
              </ErrorBoundary>
            </Modal>
          ) : null}

          {this.props.cartItems.map((item, index) => {
            return (
              <ErrorBoundary key={index}>
              <React.Fragment>
                <CartItem
                  cartItem={item}
                  deleteOrder={() =>{
                   this.deleteClickedHandler(index)
                  }

                  }
                  increaseOrderAmount={() => {
                    this.props.updateOrderAmount(
                      this.props.cartItems,
                      index,
                      1
                    );
                  }}
                  decreaseOrderAmount={() => {
                    if(item.amount -1 === 0)
                      this.deleteClickedHandler(index)    
                    else {
                      this.props.updateOrderAmount(
                      this.props.cartItems,
                      index,
                      -1
                    );
                    }

                  }}
                  editClicked={() => this.editClickedHandler(item)}
                />
                {index === this.props.cartItems.length - 1 ? null : <hr></hr>}
              </React.Fragment>
              </ErrorBoundary>
            );
          })}
        </div>
      </div>
    );
  }
}
export default CartItems;
