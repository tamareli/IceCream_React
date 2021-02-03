import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as generalActions from '../store/actions/general';
import Categories from '../components/Categories/Categories';
import classes from '../css/OurProducts.module.css';

class OurProducts extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <div className={['container', classes.OurProducts].join(' ')}>
        <div className='row'>
          <h2 className='text-center'>הרכב/י לך מנה עם התוספות האהובות עליך</h2>
        </div>
        <Categories categories={this.props.categories} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.general.categories,
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
