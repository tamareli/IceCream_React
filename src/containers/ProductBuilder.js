import React, { Component } from 'react';
import BuildControls from '../components/ProductInOrder/BuildControls/BuildControls';
import ProductInOrder from '../components/ProductInOrder/ProductInOrder';
import classes from '../css/ProductBuilder.module.css';
import Modal from '../components/UI/Modal/Modal';
import SelectSize from '../components/ProductInOrder/SelectSize/SelectSize';
import OrderSummary from '../components/ProductInOrder/OrderSummary/OrderSummary';
import { connect } from 'react-redux';
import * as productBuilderActions from '../store/actions/productBuilder';
import * as cartActions from '../store/actions/cart';
import PinkButton from '../components/UI/Button/PinkButton';
import GreenButton from '../components/UI/Button/GreenButton';
import NextStep from '../components/ProductInOrder/OrderSummary/NextStep';

class ProductBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseble: false,
      preferenceClicked: false,
      purchased: false,
    };
  }

  componentDidMount() {
    console.log('cmd');
    if (this.props.edit !== undefined) {
      this.props.setProduct(this.props.productId);
      this.props.setClickedCategory(this.props.categoryId);
      this.props.setToppingsCatgs(this.props.categoryId);
      this.props.setSizes(this.props.categoryId);
      this.props.setToppings(this.props.toppingsEdit);
      this.props.setSelectedSize(this.props.size);
      console.log('edit');
    } else {
      this.props.setProduct(this.props.match.params.product_id);
      this.props.setClickedCategory(this.props.match.params.catg_id);
      this.props.setToppingsCatgs(this.props.match.params.catg_id);
      this.props.setSizes(this.props.match.params.catg_id);
      this.props.setToppings([]);
    }
  }

  editOkClickedHandler = () => {
    this.props.addToCart(
      this.props.product,
      this.props.startingPrice + this.props.toppingsPrice,
      this.props.toppings,
      this.props.selectedSize,
      this.props.orders,
      this.props.editItemId,
      this.props.amount
    );
    this.props.setEditToFalse();
  };

  sizeClickHandler = (size) => {
    this.props.setSelectedSize(size);
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

  addToppingHandler = (topping) => {
    console.log('addToppingHandler');
    this.props.addTopping(topping, 1);
    this.props.updatePriceAdd(topping.toppingId);
  };

  removeToppingHandler = (topping) => {
    this.props.updatePriceRemove(topping.toppingId);

    this.props.addTopping(topping, -1);
  };
  purchaseHandler = () => {
    this.setState({ purchased: true, purchaseble: false });
  };
  render() {
    if (
      this.props.toppingsCatgsLoading === true ||
      this.props.toppingsForCatgsLoading === true
    ) {
      return <div>loading...</div>;
    }
    return (
      <div className={['container', classes.ProductBuilder].join(' ')}>
        <Modal
          show={this.state.purchaseble}
          modalClosed={this.purchasableCanceleddHandler}
        >
          <OrderSummary
            product={this.props.product}
            totalPrice={this.props.startingPrice + this.props.toppingsPrice}
            size={this.props.selectedSize}
            initProductBuilder={this.props.initProductBuilder}
            purchaseHandler={this.purchaseHandler}
          />
        </Modal>
        <Modal show={this.state.purchased}>
          <NextStep />
        </Modal>
        <Modal
          show={this.state.preferenceClicked}
          modalClosed={this.preferenceCanceleddHandler}
        >
          <SelectSize
            sizes={this.props.sizes}
            sizeClicked={this.sizeClickHandler}
            selectedSize={this.props.selectedSize}
            onClose={this.preferenceCanceleddHandler}
          />
        </Modal>
        <div className='row'>
          <div className='col-md-3 d-flex flex-column justify-content-center align-items-center'>
            <div style={{ margin: '1rem' }}>
              <GreenButton text='בחר גודל' onClick={this.preferenceHandler} />
            </div>
            <div className={classes.Summary}>
              <p style={{ textAlign: 'right' }}>
                {this.props.selectedSize !== null ? (
                  <>
                    {' '}
                    <b>גודל: </b>
                    <span>{this.props.selectedSize.sizeName}</span>
                  </>
                ) : null}
              </p>
              <p style={{ textAlign: 'right' }}>
                <b>מחיר: </b>
                <span>
                  &#8362;{this.props.startingPrice + this.props.toppingsPrice}
                </span>
              </p>
            </div>
            <div style={{ margin: '1rem' }}>
              {this.props.edit !== undefined ? (
                <PinkButton text='אישור' onClick={this.editOkClickedHandler} />
              ) : (
                <PinkButton text='סיום' onClick={this.purchasableHandler} />
              )}
            </div>
          </div>
          <div className='col-md-5'>
            <ProductInOrder
              toppings={this.props.toppings}
              product={this.props.product}
              freeToppingsAmount={this.props.freeToppingsAmount}
            />
          </div>
          <div className='col-md-4'>
            <BuildControls
              addTopping={this.addToppingHandler}
              removeTopping={this.removeToppingHandler}
              productId={
                this.props.match !== undefined
                  ? this.props.match.params.product_id
                  : this.props.productId
              }
              toppingsCatgs={this.props.toppingsCatgs}
              toppingsForCategories={this.props.toppingsForCategories}
              openSize={this.chooseSizeClickedHandler}
              toppings={this.props.toppings}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.productBuilder.category,
    product: state.productBuilder.product,
    toppingsCatgs: state.productBuilder.toppingsCatgs,
    toppingsForCategories: state.productBuilder.toppingsForCatgs,
    sizes: state.productBuilder.sizes,
    freeToppingsAmount: state.productBuilder.freeToppingsAmount,
    toppings: state.productBuilder.toppings,
    startingPrice: state.productBuilder.startingPrice,
    toppingsPrice: state.productBuilder.toppingsPrice,
    toppingsAmount: state.productBuilder.toppingsAmount,
    selectedSize: state.productBuilder.selectedSize,
    toppingsCatgsLoading: state.productBuilder.toppingsCatgsLoading,
    toppingsForCatgsLoading: state.productBuilder.toppingsForCatgsLoading,
    orders: state.cart.cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditToFalse: () => dispatch(cartActions.setEditFalse()),
    addToCart: (
      newProduct,
      totalprice,
      newToppings,
      newSize,
      orders,
      id,
      amount
    ) => {
      let newOrder = {
        id: id,
        product: newProduct,
        price: totalprice,
        toppings: newToppings,
        size: newSize,
        amount: amount,
      };
      dispatch(cartActions.addOrder(orders, newOrder));
    },

    initProductBuilder: () => {
      dispatch(productBuilderActions.initProductBuilder());
    },

    setProduct: (productId) => {
      dispatch(productBuilderActions.initSelectedProduct(productId));
    },
    setClickedCategory: (category) => {
      dispatch(productBuilderActions.setSelectedCategory(category));
    },
    setToppingsCatgs: (catgId) => {
      dispatch(productBuilderActions.initToppingsCategories(catgId));
    },
    setSizes: (catgId) => {
      dispatch(productBuilderActions.initSizes(catgId));
    },
    setFreeToppingsAmount: () => {
      dispatch(productBuilderActions.initFreeToppingsAmount());
    },
    setToppings: (toppings) => {
      dispatch(productBuilderActions.initToppings(toppings));
    },
    setSelectedSize: (size) => {
      dispatch(productBuilderActions.setSelectedSize(size));
    },
    addTopping: (toppingId, amount) => {
      dispatch(productBuilderActions.addToppping(toppingId, amount));
    },
    updatePriceAdd: (toppingId) => {
      dispatch(productBuilderActions.updatePriceAdd(toppingId));
    },
    updatePriceRemove: (toppingId) => {
      dispatch(productBuilderActions.updatePriceRemove(toppingId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBuilder);
