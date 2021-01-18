import React, { Component } from 'react';
import BuildControls from '../components/ProductInOrder/BuildControls/BuildControls';
import ProductInOrder from '../components/ProductInOrder/ProductInOrder';
import classes from '../css/ProductBuilder.module.css';
import Modal from '../components/UI/Modal/Modal';
import SelectSize from '../components/ProductInOrder/SelectSize/SelectSize';
import OrderSummary from '../components/ProductInOrder/OrderSummary/OrderSummary';
import { connect } from 'react-redux';
import * as productBuilderActions from '../store/actions/productBuilder';

class ProductBuilder extends Component {
  state = {
    purchaseble: false,
    preferenceClicked: false,
  };
  componentDidMount() {
    this.props.setProduct(this.props.match.params.product_id);
    this.props.setClickedCategory(this.props.match.params.catg_id);
    this.props.setToppingsCatgs(this.props.match.params.catg_id);
    this.props.setSizes(this.props.match.params.catg_id);
    this.props.setToppings(this.props.match.params.catg_id);
  }

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

  addToppingHandler = (toppingId, catgId) => {
    this.props.addTopping(toppingId, 1);
    this.props.updatePriceAdd(toppingId);
  };

  removeToppingHandler = (toppingId, catgId) => {
    this.props.addTopping(toppingId, -1);
    this.props.updatePriceRemove(toppingId);
  };
  render() {
    console.log(this.props.selectedSize, 'selectedSize');
    return (
      <div className={classes.ProductBuilder}>
        <Modal
          show={this.state.purchaseble}
          modalClosed={this.purchasableCanceleddHandler}
        >
          <OrderSummary
            toppings={this.props.toppings}
            product={this.props.product}
            totalPrice={this.props.startingPrice + this.props.toppingsPrice}
            size={this.props.selectedSize}
          />
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
        <div className={classes.Middle}>
          <div
            className={classes.FinishButton}
            onClick={this.preferenceHandler}
          >
            בחר גודל
          </div>
          <div
            className={classes.FinishButton}
            onClick={this.purchasableHandler}
          >
            סיום
          </div>
        </div>
        <ProductInOrder
          toppings={this.props.toppings}
          product={this.props.product}
          price={this.props.startingPrice + this.props.toppingsPrice}
          freeToppingsAmount={this.props.freeToppingsAmount}
          selectedSize={this.props.selectedSize}
        />{' '}
        <BuildControls
          addTopping={this.addToppingHandler}
          removeTopping={this.removeToppingHandler}
          productId={this.props.match.params.product_id}
          toppingsCatgs={this.props.toppingsCatgs}
          toppingsForCategories={this.props.toppingsForCategories}
          openSize={this.chooseSizeClickedHandler}
        />
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
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
    setToppings: (catgId) => {
      dispatch(productBuilderActions.initToppings(catgId));
    },
    setSelectedSize: (size) => {
      dispatch(productBuilderActions.setSelectedSize(size));
    },
    addTopping: (toppingId, amount) => {
      dispatch(productBuilderActions.addToppping(toppingId, amount));
    },
    removeTopping: (toppingId, catgId) => {
      dispatch(productBuilderActions.removeTopping(toppingId, catgId));
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
