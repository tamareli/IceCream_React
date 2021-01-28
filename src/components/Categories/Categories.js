import React from 'react';
import Category from './Category/Category';
import { Link } from 'react-router-dom';

import { Component } from 'react';

class categories extends Component {
  render() {
    return (
      <>
        {this.props.categories.map((category) => {
          return (
            <Link
              key={category.categoryId}
              to={{
                pathname: '/products/' + category.categoryId,
              }}
              style={{ textDecoration: 'none', width: '30%' }}
            >
              <Category
                name={category.categoryName}
                description={category.description}
              />
            </Link>
          );
        })}
      </>
    );
  }
}

export default categories;
