import classes from '../css/Form.module.css';
import React, { Component } from 'react';
import axios from '../axios';
import DeliveryTypes from '../components/OrderDetails/DeliveryTypes';
import { connect } from 'react-redux';
import * as cartActions from '../store/actions/cart';
import * as authActions from '../store/actions/auth';
import Input from '../components/UI/Input/Input';
import { checkValidity } from '../shared/validate';
import { sendEmail } from '../shared/Email';
import PinkButton from '../components/UI/Button/PinkButton';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: 0,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
      },
      deliveryTypes: [],
      deliverySelects: [],
      deliveryType: null,
      deliveryPrice: 0,
      deliverySelected: null,
      userValidationRules: {
        firstName: {
          required: true,
          minLength: 2,
          maxLength: 15,
          letterOnly: true,
        },
        lastName: {
          required: true,
          minLength: 2,
          maxLength: 20,
          letterOnly: true,
        },
        phone: {
          required: true,
          regExc: /\b\d{3}[-]?\d{3}[-]?\d{4}|\d{2}[-]?\d{3}[-]?\d{4}|\d{1}[-]?\d{3}[-]?\d{6}|\d{1}[-]?\d{3}[-]?\d{2}[-]?\d{2}[-]?\d{2}|\*{1}?\d{2,5}\b/,
        },
        address: { required: true, minLength: 2, maxLength: 20 },
        email: {
          required: true,
          regExc: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
      },
      userValid: {
        firstName: { valid: false, touched: false, errmessage: '' },
        lastName: { valid: false, touched: false, errmessage: '' },
        phone: { valid: false, touched: false, errmessage: '' },
        address: { valid: false, touched: false, errmessage: '' },
        email: { valid: false, touched: false, errmessage: '' },
      },
      isValidForm: false,
    };
  }
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
        console.log('options', options[options.length - 1]);
        this.setState({ deliverySelects: options });
        this.setState({ deliveryTypes: res.data });
        this.setState({ deliverySelected: options[options.length - 1] });
        this.setState({ deliveryType: options[options.length - 1].value });
      })
      .catch((err) => {
        console.log(err);
      });
    this.autoUserInputs();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      this.autoUserInputs();
    }
  }
  autoUserInputs = () => {
    if (this.props.isAuthenticated) {
      axios
        .get('user/GetUser', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
          console.log('user data:', res.data);
          this.setState({
            ...this.state,
            user: {
              ...this.state.user,
              userId: res.data.userId,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              phone: res.data.phone,
              email: res.data.email,
              address: res.data.address,
            },
            isValidForm: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  handleChange = (input) => (e) => {
    e.preventDefault();
    let updatedUser = this.state.user;
    let validUser = this.state.userValid;
    updatedUser[input] = e.target.value;
    validUser[input].touched = true;
    validUser[input].errmessage = checkValidity(
      updatedUser[input],
      this.state.userValidationRules[input]
    );
    validUser[input].valid = validUser[input].errmessage === '';

    let validForm = true;
    for (let field in validUser) {
      validForm = validUser[field].valid && validForm;
    }

    this.setState({
      user: updatedUser,
      userValid: validUser,
      isValidForm: validForm,
    });
  };
  setupOrder = (userId) => {
    let newOrderItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log('cart Items1', JSON.parse(localStorage.getItem('cartItems')));
    newOrderItems = newOrderItems.map((item) => {
      let newToppings = Object.values(item.toppings).map((top) => {
        return {
          toppingId: top.toppingId,
          price: top.price,
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
      finalPrice: this.state.deliveryPrice + this.props.finalPrice,
      clientId: userId,
    };
    console.log('newOrderItems', newOrderItems);
    axios
      .post('order/order', order, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        this.sendingEmails();
        this.props.onPay();
      })
      .catch((err) => {
        console.log(err);
      });

    alert('...ההזמנה בדרך אליך :)');
  };

  sendingEmails = () => {
    const dreamCream = 'Dream Cream';
    const subject = 'ההזמנה שלך התקבלה';
    const paragraph = `<br />ההזמנה שלך התקבלה באתר בהצלחה.<br />בקרוב יגיע אליך שליח.<br /> תודה שבחרת לקנות אצלינו ${dreamCream}`;
    const space = '<br /><br />המוצרים שהזמנת:<br />';
    let body = JSON.parse(localStorage.getItem('cartItems'))
      .map((item) => {
        const toppings = item.toppings
          .map((top) => {
            return top.toppingName;
          })
          .join('<br />');
        let arr = [
          '<b>' + item.product.productName + ':</b>',
          toppings,
          'גודל: ' + item.size.sizeName,
          'כמות:' + item.amount,
        ];
        return arr.join('<br />');
      })
      .join('<br />');
    body +=
      '<br /><br /> סוג משלוח: ' +
      this.state.deliveryTypes.find((del) => {
        return del.deliveryTypeId === this.state.deliverySelected.value;
      }).deliveryDescription;
    body += '<br /> כתובת: ' + this.state.user.address;
    let price = this.state.deliveryPrice + this.props.finalPrice;
    body += '<br /> מחיר סופי: ' + price;
    sendEmail(
      this.state.user.email,
      subject,
      paragraph + '' + space + '' + body
    );
    sendEmail(
      process.env.REACT_APP_MANAGER_EMAIL,
      subject,
      paragraph + '' + space + '' + body
    );
  };
  submitHandler = (event) => {
    event.preventDefault();

    if (this.props.isAuthenticated === false) {
      const guestUser = {
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        phone: this.state.user.phone,
        email: this.state.user.email,
        address: this.state.user.address,
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
      console.log('else');
      this.setupOrder(this.state.user.userId);
    }
  };

  handleSelectChange = (selectedOption) => {
    this.setState({ deliveryType: selectedOption.value });
    this.setState({ deliverySelected: selectedOption });
    const typeObj = this.state.deliveryTypes.find(
      (type) => type.deliveryTypeId === selectedOption.value
    );
    this.setState({ deliveryPrice: typeObj.price });
  };

  render() {
    console.log('this.state.deliverySelected', this.state.deliverySelected);
    return (
      <div className={classes.OrderDetails}>
        <h3 style={{ textAlign: 'center' }}>הכנס פרטים אישיים להזמנה</h3>
        <form onSubmit={this.submitHandler} className={classes.Form}>
          <div className='row'>
            <div className='col-md-6'>
              <Input
                type='text'
                name='first-name'
                value={this.state.user.firstName}
                id='first-name'
                inputtype='input'
                label='שם פרטי'
                onChange={this.handleChange('firstName')}
                readOnly={this.props.isAuthenticated ? true : false}
                invalid={(!this.state.userValid.firstName.valid).toString()}
                touched={this.state.userValid.firstName.touched.toString()}
                errmessage={this.state.userValid.firstName.errmessage}
              />
            </div>
            <div className='col-md-6'>
              <Input
                type='text'
                name='last-name'
                value={this.state.user.lastName}
                id='last-name'
                inputtype='input'
                label='שם משפחה'
                onChange={this.handleChange('lastName')}
                readOnly={this.props.isAuthenticated ? true : false}
                invalid={(!this.state.userValid.lastName.valid).toString()}
                touched={this.state.userValid.lastName.touched.toString()}
                errmessage={this.state.userValid.lastName.errmessage}
              />
            </div>
          </div>
          <Input
            type='text'
            name='phone'
            value={this.state.user.phone}
            id='phone'
            inputtype='input'
            label='טלפון'
            onChange={this.handleChange('phone')}
            readOnly={this.props.isAuthenticated ? true : false}
            invalid={(!this.state.userValid.phone.valid).toString()}
            touched={this.state.userValid.phone.touched.toString()}
            errmessage={this.state.userValid.phone.errmessage}
          />
          <Input
            type='text'
            name='email'
            value={this.state.user.email}
            id='email'
            inputtype='input'
            label='אימייל'
            onChange={this.handleChange('email')}
            readOnly={this.props.isAuthenticated ? true : false}
            invalid={(!this.state.userValid.email.valid).toString()}
            touched={this.state.userValid.email.touched.toString()}
            errmessage={this.state.userValid.email.errmessage}
          />
          <div className='delivery row'>
            <div className='col-md-6'>
              <label htmlFor='delivery-type' style={{ fontWeight: 600 }}>
                סוג משלוח
              </label>
              <DeliveryTypes
                delTypes={this.state.deliverySelects}
                handleSelectChange={(selectedOption) => {
                  console.log('selectedOption', selectedOption);
                  this.handleSelectChange(selectedOption);
                }}
                value={
                  this.state.deliverySelected !== null
                    ? this.state.deliverySelected
                    : null
                }
              />
            </div>
            <div className='col-md-6' style={{ alignSelf: 'flex-end' }}>
              <p style={{ fontWeight: 600 }}>
                מחיר משלוח: <span>&#8362;</span>
                {this.state.deliveryPrice}
              </p>
            </div>
          </div>
          <Input
            type='text'
            name='address'
            value={this.state.user.address}
            id='address'
            inputtype='input'
            label='כתובת'
            onChange={this.handleChange('address')}
            readOnly={this.props.isAuthenticated ? true : false}
            invalid={(!this.state.userValid.address.valid).toString()}
            touched={this.state.userValid.address.touched.toString()}
            errmessage={this.state.userValid.address.errmessage}
          />
          <PinkButton
            text='תשלום'
            type='submit'
            disabled={!this.state.isValidForm}
          />
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
    finalPrice: state.cart.finalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPay: () => dispatch(cartActions.clearCart()),
    setUserId: (id) => dispatch(authActions.setUserId(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
