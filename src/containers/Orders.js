import React, { Component } from 'react';
import axios from '../axios';
import Order from '../components/Orders/Order';
import { connect } from 'react-redux';
import classes from '../css/Orders.module.css';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }

  componentDidMount() {
    if (this.props.token !== null) {
      axios
        .get('order/orders', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((response) => {
          console.log(response.data, 'cdm');
          this.setState({ orders: response.data });
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      axios
        .get('order/orders', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((response) => {
          console.log(response.data, 'cdu');
          this.setState({ orders: response.data });
        });
    }
  }
  render() {
    return (
      <div className={classes.OrdersContent}>
        <h3>ההזמנות האחרונות שלך</h3>
        {this.state.orders !== null ? (
          <div className={classes.Orders}>
            {this.state.orders.map((order) => {
              return <Order key={order.orderId} order={order} />;
            })}
          </div>
        ) : null}
      </div>
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
