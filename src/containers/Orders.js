import React, { Component } from 'react';
import axios from '../axios';
import Order from '../components/Orders/Order';
import { connect } from 'react-redux';
import classes from '../css/Orders.module.css';
import Spinner from '../components/UI/Spinner/Spinner'
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorMessage from '../components/UI/Error/ErrorMessage'
import Layout from '../hoc/Layout/Layout';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      orders: null,
      hasError: false
    };
  }

  componentDidMount() {
    if (this.props.token !== null) {
      this.setState({isLoading: true});
      axios
        .get('order/orders', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((response) => {
          this.setState({ orders: response.data, isLoading: false });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.setState({isLoading: true});
      axios
        .get('order/orders', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((response) => {
          this.setState({ orders: response.data, isLoading: false  });
        }).catch(err =>{
          this.setState({hasError: true})
        });
    }
  }
  render() {
    if(this.state.hasError){
      return <Layout>
              <div className={classes.OrdersContent}>
               <ErrorMessage />
              </div>
            </Layout>
    }
    let orders = <Spinner />;
    if(this.state.orders !== null){
      if(this.state.orders.length <= 0)
        orders= <p>עוד לא ביצעת הזמנות</p>
        else{
          orders= <div className={[classes.Orders,'col-md-5', 'col-sm-12'].join(' ')}>
          {this.state.orders.map((order) => {
            return <ErrorBoundary key={order.orderId}><Order order={order} /></ErrorBoundary>;
          })}
        </div>
        }
    }
    return (
      <Layout>
        <div className={classes.OrdersContent}>
          <h3>ההזמנות האחרונות שלך</h3>
          {orders}
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    products: state.productBuilder.products,
    sizes: state.productBuilder.sizes,
    toppings: state.productBuilder.toppings,
  };
};
export default connect(mapStateToProps)(Orders);
