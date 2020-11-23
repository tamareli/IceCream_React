import React from 'react';
import Category from './Category/Category';
import { Link } from 'react-router-dom';

const categories = (props) => {
  return (
    <>
      {props.categories.map((category) => {
        return (
          <Link
            key={category.categoryId}
            to={{
              pathname: '/products/' + category.categoryId,
              state: {
                categoryName: category.categoryName,
              },
            }}
            style={{ textDecoration: 'none' }}
          >
            <Category name={category.categoryName} />
          </Link>
        );
      })}
    </>
  );
};
export default categories;
