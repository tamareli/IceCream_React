import React from 'react';
import ProductBuilder from './containers/ProductBuilder/ProductBuilder';
import LogIn from './components/Authentication/LogIn/LogIn';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Route } from 'react-router-dom';
import BuildControls from './components/ProductInOrder/BuildControls/BuildControls';
import OrderSummary from './components/ProductInOrder/OrderSummary/OrderSummary';
import OrderDetails from './components/OrderDetails/OrderDetails';
import ForgetPassword from './components/Authentication/LogIn/ForgetPassword/ForgetPassword';
import Authenticate from './components/Authentication/Authenticate';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path='/' exact component={MainPage} />
        <Route path='/ProductBuilder' exact component={ProductBuilder} />
        <Route path='/Authenticate' exact component={Authenticate} />
        <Route path='/OrderSummary' exact component={OrderSummary} />
        <Route path='/OrderDetails' exact component={OrderDetails} />
        <Route path='/ForgetPassword' exact component={ForgetPassword} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
