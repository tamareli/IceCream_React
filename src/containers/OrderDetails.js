import classes from '../css/Form.module.css';
import React, { Component } from 'react';
import axios from '../axios';
import DeliveryTypes from '../components/OrderDetails/DeliveryTypes';
import { connect } from 'react-redux';
import * as cartActions from '../store/actions/cart';
import * as authActions from '../store/actions/auth';
import Input from '../components/UI/Input/Input';

class OrderDetails extends Component {
  state = {
    userId: 0,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    deliveryTypes: [],
    deliverySelects: [],
    deliveryType: null,
    deliveryPrice: 0,
  };
  componentDidMount() {
    axios
      .get('deliveryTypes/types')
      .then((res) => {
        const options = res.data.map((type) => {
          return {
            value: type.deliveryTypeId,
            label: type.deliveryDescription,
          };
        });
        this.setState({ deliverySelects: options });
        this.setState({ deliveryTypes: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    if (this.props.isAuthenticated) {
      axios
        .get('user/GetUser', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
          console.log('user data:', res.data);
          this.setState({
            ...this.state,
            userId: res.data.userId,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            phone: res.data.phone,
            email: res.data.email,
            address: res.data.address,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  handleChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  };
  setupOrder = (userId) => {
    let newOrderItems = JSON.parse(localStorage.getItem('cartItems'));

    newOrderItems = newOrderItems.map((item) => {
      let newToppings = Object.values(item.toppings).map((top) => {
        return {
          toppingId: top.toppingId,
          price: top.price,
          amount: top.amount,
        };
      });
      return {
        productId: item.product.productId,
        sizeId: item.size.sizeId,
        toppings: newToppings,
        price: item.price,
        amount: item.amount,
      };
    });

    const order = {
      deliveryTypeId: this.state.deliveryType,
      orderItems: newOrderItems,
      finalPrice: this.state.deliveryPrice + 100,
      clientId: userId,
    };

    axios
      .post('order/order', order, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.onPay();
    alert('...ההזמנה בדרך אליך :)');
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (this.props.isAuthenticated === false) {
      const guestUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
        password: 'guestUser',
      };
      axios
        .post('user/register', guestUser)
        .then((res) => {
          console.log(res.data);
          this.props.setUserId(res.data);
          return res.data;
        })
        .then((userId) => {
          console.log(userId);
          this.setupOrder(userId);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('from else', this.props.userId);
      this.setupOrder(this.state.userId);
    }
  };

  handleSelectChange = (selectedOption) => {
    this.setState({ deliveryType: selectedOption.value });
    const typeObj = this.state.deliveryTypes.find(
      (type) => type.deliveryTypeId === selectedOption.value
    );
    this.setState({ deliveryPrice: typeObj.price });
  };

  render() {
    return (
      <div className={classes.OrderDetails}>
        <h2>פרטים אישיים להזמנה</h2>
        <form onSubmit={this.submitHandler} className={classes.Form}>
          <Input
            type='text'
            name='first-name'
            value={this.state.firstName}
            id='first-name'
            inputtype='input'
            label='שם פרטי'
            onChange={this.handleChange('firstName')}
            readOnly={this.props.isAuthenticated ? true : false}
          />
          <Input
            type='text'
            name='last-name'
            value={this.state.lastName}
            id='last-name'
            inputtype='input'
            label='שם משפחה'
            onChange={this.handleChange('lastName')}
            readOnly={this.props.isAuthenticated ? true : false}
          />
          <Input
            type='text'
            name='phone'
            value={this.state.phone}
            id='phone'
            inputtype='input'
            label='טלפון'
            onChange={this.handleChange('phone')}
            readOnly={this.props.isAuthenticated ? true : false}
          />
          <Input
            type='text'
            name='email'
            value={this.state.email}
            id='email'
            inputtype='input'
            label='אימייל'
            onChange={this.handleChange('email')}
            readOnly={this.props.isAuthenticated ? true : false}
          />
          <label htmlFor='delivery-type'>סוג משלוח</label>
          <DeliveryTypes
            delTypes={this.state.deliverySelects}
            handleSelectChange={(selectedOption) =>
              this.handleSelectChange(selectedOption)
            }
            selectedOption={this.state.deliveryType}
          />
          <p>{this.state.deliveryPrice} :מחיר המשלוח</p>
          <Input
            type='text'
            name='address'
            value={this.state.address}
            id='address'
            inputtype='input'
            label='כתובת'
            onChange={this.handleChange('address')}
            readOnly={this.props.isAuthenticated ? true : false}
          />
          <button className={classes.Button} type='submit'>
            תשלום
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPay: () => dispatch(cartActions.clearCart()),
    setUserId: (id) => dispatch(authActions.setUserId(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
