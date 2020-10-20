import React from 'react';
import ProductBuilder from './containers/ProductBuilder/ProductBuilder';
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <Layout>
      <ProductBuilder />
    </Layout>
  );
}

export default App;
