import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Product from './Product/Product';
import classes from '../../css/Products.module.css';
import { connect } from 'react-redux';
import * as productBuilderActions from '../../store/actions/productBuilder';
import ProductsNavigation from './ProductsNavigation';
import ErrorMessage from '../UI/Error/ErrorMessage'
import Layout from '../../hoc/Layout/Layout'

class Products extends Component {
  state={
    descriptions:{
      yogurt: '.גלידת היוגורט שלנו מורכבת מיוגורט אורגני, יצרנו טעמים שונים מפירות איכותיים וטריים. מוזמנים להתרשם',
      iceCream: 'הגלידה שלנו מיוצרת על ידינו עם מתכון מיוחד הישר מאיטליה. עם הטעמים הרבים שיצרנו לכם כל אחד יוכל למצוא את הגלידה האהובה עליו. מוזמנים להתרשם',
      waffle: 'הוופל הלגי שלנו רך כמו ענן ופריך בדיוק במידה הנכונה, ועם התוספות המפנקות זו בכלל חגיגה שלימה. מוזמנים להתרשם' 
    }
  }
  componentDidMount() {
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
    let productDesc = null;
    if(this.props.match.params.catg_id == 22){
      productDesc = this.state.descriptions.yogurt;
    }
    else{
      if(this.props.match.params.catg_id == 20){
        productDesc = this.state.descriptions.iceCream;
      }
      else{
        productDesc = this.state.descriptions.waffle;
      }
    }
    let products = null;
    let productClass= 'col-md-6';
    if(this.props.productsError){
        return (
          <Layout>
            <div className="container">
              <ErrorMessage />
            </div>
          </Layout>
        )
    }
    if (this.props.products)
    {
      productClass = this.props.products.length === 1 ? 'col-md-12': 'col-md-6';
      products = this.props.products.map((product) => {
        return (
          <div className={productClass} key={product.productId}>
            <Link
              to={{
                pathname:
                  '/ProductBuilder/' +
                  this.props.match.params.catg_id +
                  '/' +
                  product.productId,
              }}
            >
              <Product selectedProduct={product} />
            </Link>
          </div>
        );
      });
    }

    if (this.props.category) {
      const bgIllu = require(`../../assets/images/${this.props.category.image}`);
      return (
        <Layout>
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
              {productDesc}
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
            <div className="container" style={{direction: 'rtl'}}>
              <div className={['row'].join(' ')}>
                {products}
              </div>
            </div>
          </div>
        </div>
        </Layout>
      );
    } else {
      return <Layout><div></div></Layout>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    category: state.productBuilder.category,
    products: state.productBuilder.products,
    productsError: state.productBuilder.productsError
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
