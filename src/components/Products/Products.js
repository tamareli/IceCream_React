import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Product from './Product/Product';
import classes from '../../css/Products.module.css';
import { connect } from 'react-redux';
import * as productBuilderActions from '../../store/actions/productBuilder';

class Products extends Component {
  componentDidMount() {
    this.props.setCategory(this.props.match.params.catg_id);
    this.props.setProductsForCatg(this.props.match.params.catg_id);
  }
  render() {
    console.log(this.props.category);

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
        <div className={classes.ProductsPage}>
          <div
            className={classes.BgIllu}
            style={{
              backgroundImage: 'url(' + bgIllu + ')',
              top: '100px',
              left: '100px',
              transform: 'rotate(340deg)',
            }}
          ></div>
          <div
            className={classes.BgIllu}
            style={{
              backgroundImage: 'url(' + bgIllu + ')',
              top: '500px',
              left: '150px',
            }}
          ></div>
          <div
            className={classes.BgIllu}
            style={{
              backgroundImage: 'url(' + bgIllu + ')',
              top: '90px',
              right: '100px',
              transform: 'rotate(10deg)',
            }}
          ></div>
          {/*<div
            className={classes.Img}
            style={{
              backgroundImage: 'url(' + bgImage + ')',
            }}
          ></div>*/}
          <div className={classes.txtContent}>
            <h1>{this.props.category.categoryName}</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className={classes.Products}>{products}</div>
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
