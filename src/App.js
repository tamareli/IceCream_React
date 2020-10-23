import React from 'react';
import ProductBuilder from './containers/ProductBuilder/ProductBuilder';
import LogIn from './components/LogIn/LogIn';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Route } from 'react-router-dom';
import BuildControls from './components/Product/BuildControls/BuildControls';
import OrderSummary from './components/Product/OrderSummary/OrderSummary';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path='/' exact component={ProductBuilder} />
        <Route path='/LogIn' exact component={LogIn} />
        <Route path='/OrderSummary' exact component={OrderSummary} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
