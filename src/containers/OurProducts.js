import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as generalActions from '../store/actions/general';
import Categories from '../components/Categories/Categories';
import classes from '../css/OurProducts.module.css';
import Spinner from '../components/UI/Spinner/Spinner';
import Layout from '../hoc/Layout/Layout';

class OurProducts extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <Layout>
        <div className={['container', classes.OurProducts].join(' ')}>
          <div
            className={['row', classes.Bg].join(' ')}
            style={{ paddingTop: '4rem' }}
          >
            <h1
              className='text-center'
              style={{ fontWeight: '600', color: 'var(--bg-color' }}
            >
              הרכב/י לך מנה עם התוספות האהובות עליך
            </h1>
          </div>
          {this.props.isLoading ? <Spinner /> : <Categories categories={this.props.categories} hasError={this.props.hasError} />}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.general.categories,
    isLoading: state.general.isLoading,
    hasError: state.general.hasError
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      dispatch(generalActions.initCategories());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OurProducts);
