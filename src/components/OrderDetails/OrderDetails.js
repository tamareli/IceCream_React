import classes from './OrderDetails.module.css';
import React, { Component } from 'react';

class OrderDetails extends Component {
  state = {
    userName: '',
    phone: '',
    deliveryType: '',
    address: '',
  };
  handleChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  };
  submitHandler = (event) => {
    event.preventDefault();
    alert('...ההזמנה בדרך אליך :)');
  };
  render() {
    console.log(this.state);
    return (
      <div className={classes.OrderDetails}>
        <form
          onSubmit={this.submitHandler}
          className={classes.OrderDetailsForm}
        >
          <label htmlFor='full-name'>שם מלא</label>
          <input
            type='text'
            name='full-name'
            value={this.state.userName}
            id='name'
            onChange={this.handleChange('userName')}
          />
          <label htmlFor='phone'>טלפון</label>
          <input
            type='text'
            name='phone'
            value={this.state.phone}
            id='phone'
            onChange={this.handleChange('phone')}
          />
          <label htmlFor='delivery-type'>סוג משלוח</label>
          <input
            type='text'
            name='delivery-type'
            value={this.state.deliveryType}
            id='delivery'
            onChange={this.handleChange('deliveryType')}
          />
          <label htmlFor='address'>כתובת</label>
          <input
            type='text'
            name='address'
            value={this.state.address}
            id='address'
            onChange={this.handleChange('address')}
          />
          <button type='submit'>תשלום</button>
        </form>
      </div>
    );
  }
}
export default OrderDetails;
