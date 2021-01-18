import React from 'react';
import ProductBuilder from './containers/ProductBuilder';
import Layout from './hoc/Layout/Layout';
import OrderDetails from './containers/OrderDetails';
import ForgetPassword from './components/Authentication/ForgetPassword/ForgetPassword';
import Authenticate from './containers/Authenticate';
import MainPage from './containers/MainPage';
import Products from './components/Products/Products';
import SignIn from './components/Authentication/SignIn/SignIn';
import OrdersSummary from './containers/Cart';
import AboutUs from './containers/AboutUs';
import Contact from './containers/Contact';
import Logout from './components/Authentication/Logout/Logout';
import OurProducts from './containers/OurProducts';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/auth';
import { Component } from 'react';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route path='/' exact component={MainPage} />
          <Route
            path='/ProductBuilder/:catg_id/:product_id'
            exact
            component={ProductBuilder}
          />
          <Route path='/Authenticate' exact component={Authenticate} />
          <Route path='/Logout' exact component={Logout} />
          <Route path='/ourProducts' exact component={OurProducts} />

          <Route path='/SignIn' exact component={SignIn} />
          <Route path='/OrdersSummary' exact component={OrdersSummary} />
          <Route path='/OrderDetails' exact component={OrderDetails} />
          <Route path='/ForgetPassword' exact component={ForgetPassword} />
          <Route path='/Products/:catg_id' exact component={Products} />
          <Route path='/AboutUs' exact component={AboutUs} />
          <Route path='/Contact' exact component={Contact} />
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionTypes.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
