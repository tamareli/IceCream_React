import React from 'react';
import Product from './Product/Product';

export default function Products(props) {
  const state = {
    productarr: [
      { type: 'choklate', description: 'jfijfipe' },
      { type: 'vanila', description: 'jfijfipe' },
      { type: 'oreo', description: 'jfijfipe' },
    ],
  };

  return (
    <>
      <h1>Hiii</h1>
      {state.productarr.map((products) => {
        return (
          <button>
            <Product type={products.type} description={products.description} />
          </button>
        );
      })}
    </>
  );
}
