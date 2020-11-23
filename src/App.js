import React from 'react';
import ProductBuilder from './containers/ProductBuilder/ProductBuilder';
import Layout from './hoc/Layout/Layout';
import OrderSummary from './components/ProductInOrder/OrdersSummary/OrderSummary/OrderSummary';
import OrderDetails from './components/OrderDetails/OrderDetails';
import ForgetPassword from './components/Authentication/LogIn/ForgetPassword/ForgetPassword';
import Authenticate from './components/Authentication/Authenticate';
import MainPage from './components/MainPage/MainPage';
import Products from './components/Products/Products';
import SignIn from './components/Authentication/SignIn/SignIn';
import OrdersSummary from './components/ProductInOrder/OrdersSummary/OrdersSummary';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/AboutUs/Contact/Contact';
import ServingPreference from './components/ProductInOrder/ServingPreference/ServingPreference';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path='/' exact component={MainPage} />
        <Route
          path='/ProductBuilder/:product_id'
          exact
          component={ProductBuilder}
        />
        <Route path='/Authenticate' exact component={Authenticate} />
        <Route path='/SignIn' exact component={SignIn} />
        <Route
          path='/OrderSummary/:product_id'
          exact
          component={OrderSummary}
        />
        <Route path='/OrdersSummary' exact component={OrdersSummary} />
        <Route path='/OrderDetails' exact component={OrderDetails} />
        <Route path='/ForgetPassword' exact component={ForgetPassword} />
        <Route path='/Products/:category_id' exact component={Products} />
        <Route path='/AboutUs' exact component={AboutUs} />
        <Route path='/Contact' exact component={Contact} />
        <Route path='/ServingPreference' exact component={ServingPreference} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
