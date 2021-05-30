import React from 'react';
import Category from './Category/Category';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import ErrorMessage from '../UI/Error/ErrorMessage'

class categories extends Component {
  render() {
    if(this.props.hasError){
      return <ErrorMessage />
    }
    return (
      <div className='row justify-content-center'>
        {this.props.categories.map((category) => {
          return (
            
              <Link
                key={category.categoryId}
                to={{
                  pathname: '/products/' + category.categoryId,
                }}
                style={{ textDecoration: 'none' }}
                className='col-md-3'
              >
                <ErrorBoundary>
                <Category
                  name={category.categoryName}
                  description={category.description}
                />
                </ErrorBoundary>
              </Link>
            
          );
        })}
      </div>
    );
  }
}

export default categories;
