import React, { Component } from 'react';
import Categories from '../components/Categories/Categories';
import classes from '../css/MainPage.module.css';
import { connect } from 'react-redux';
import * as generalActions from '../store/actions/general';

export class MainPage extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <div className={classes.MainPage}>
        <div className={classes.ImageContainer}></div>
        <h1 className={classes.Header}>Choose your favorite toppings</h1>
        <div className={classes.Container}>
          <Categories categories={this.props.categories} />
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);