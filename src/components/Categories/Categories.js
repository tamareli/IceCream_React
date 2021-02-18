import React from 'react';
import Category from './Category/Category';
import { Link } from 'react-router-dom';

import { Component } from 'react';

class categories extends Component {
  render() {
    return (
      <div className='row'>
        {this.props.categories.map((category) => {
          return (
            <Link
              key={category.categoryId}
              to={{
                pathname: '/products/' + category.categoryId,
              }}
              style={{ textDecoration: 'none' }}
              className='col-md-4'
            >
              <Category
                name={category.categoryName}
                description={category.description}
              />
            </Link>
          );
        })}
      </div>
    );
  }
}

export default categories;
