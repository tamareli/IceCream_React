import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Product from './Product/Product';
import classes from '../../css/Products.module.css';
import { connect } from 'react-redux';
import * as productBuilderActions from '../../store/actions/productBuilder';
import ProductsNavigation from './ProductsNavigation';

class Products extends Component {
  componentDidMount() {
    console.log('componentDidMount', this.props.match.params.catg_id);
    this.props.setCategory(this.props.match.params.catg_id);
    this.props.setProductsForCatg(this.props.match.params.catg_id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.catg_id !== prevProps.match.params.catg_id) {
      this.props.setCategory(this.props.match.params.catg_id);
      this.props.setProductsForCatg(this.props.match.params.catg_id);
    }
  }
  render() {
    let products = null;
    if (this.props.products)
      products = this.props.products.map((product) => {
        return (
          <Link
            to={{
              pathname:
                '/ProductBuilder/' +
                this.props.match.params.catg_id +
                '/' +
                product.productId,
            }}
            key={product.productId}
          >
            <Product selectedProduct={product} />
          </Link>
        );
      });
    if (this.props.category) {
      const bgImage = require(`../../assets/images/categories/${this.props.category.image}`);
      const bgIllu = require(`../../assets/images/${this.props.category.image}`);
      return (
        <div className='container'>
          <div
            className={['row', classes.Bg].join(' ')}
            style={{
              backgroundColor: 'var(--green-color)',
              position: 'relative',
            }}
          >
            <h1 style={{ color: 'var(--bg-color)', fontWeight: '600' }}>
              {this.props.category.categoryName}
            </h1>
            <h4 style={{ color: 'var(--bg-color)' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h4>
            <div
              className={classes.BgIllu}
              style={{
                backgroundImage: 'url(' + bgIllu + ')',
                top: '150px',
                left: '-10px',
                transform: 'rotate(350deg)',
                zIndex: 3,
              }}
            ></div>
            <div
              className={classes.BgIllu}
              style={{
                backgroundImage: 'url(' + bgIllu + ')',
                top: '50px',
                left: '-25px',
                transform: 'rotate(340deg)',
                zIndex: 3,
                width: '100px',
              }}
            ></div>

            <div
              className={classes.BgIllu}
              style={{
                backgroundImage: 'url(' + bgIllu + ')',
                top: '-10px',
                right: '10px',
                transform: 'rotate(10deg)',
                zIndex: 3,
              }}
            ></div>
          </div>
          <div className={classes.Container}>
            <ProductsNavigation />
            <div className={classes.Products}>{products}</div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.productBuilder.category,
    products: state.productBuilder.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProductsForCatg: (catgId) => {
      dispatch(productBuilderActions.initProducts(catgId));
    },
    setCategory: (catgId) => {
      dispatch(productBuilderActions.setSelectedCategory(catgId));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Products));
