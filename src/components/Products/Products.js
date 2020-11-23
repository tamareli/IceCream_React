import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Product from './Product/Product';
import axios from '../../axios';
import classes from './Products.module.css';

class Products extends Component {
  state = {
    products: [],
  };
  componentDidMount() {
    axios
      .get('product/products/' + this.props.match.params.category_id)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className={classes.ProductsPage}>
        <h1>{this.props.location.state.categoryName}</h1>
        <div className={classes.Products}>
          {this.state.products.map((product) => {
            return (
              <Link
                to={{
                  pathname: '/ProductBuilder/' + product.productId,
                  state: {
                    categoryId: this.props.match.params.category_id,
                  },
                }}
                key={product.productId}
              >
                <Product selectedProduct={product} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(Products);
