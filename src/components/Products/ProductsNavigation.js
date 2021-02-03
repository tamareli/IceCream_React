import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as generalActions from '../../store/actions/general';
import classes from '../../css/ProductsNavigation.module.css';

class ProductsNavigation extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    let navItems = null;
    if (this.props.categories.length !== 0) {
      navItems = this.props.categories.map((catg) => {
        return (
          <NavLink
            key={catg.categoryId}
            exact
            to={{
              pathname: '/products/' + catg.categoryId,
            }}
            className={classes.Item}
            activeClassName={classes.Active}
          >
            {catg.categoryName}
          </NavLink>
        );
      });
    }
    return <div className={classes.ProductsNavigation}>{navItems}</div>;
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductsNavigation);
