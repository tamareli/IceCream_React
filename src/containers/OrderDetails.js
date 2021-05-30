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
import Spinner from '../components/UI/Spinner/Spinner';
import {Link} from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorMessageForm from '../components/UI/Error/FormErrorMessage';
import Layout from '../hoc/Layout/Layout';

class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingForm: false,
      orderIsLoading: false,
      isOrderSent: false,
      hasError: false,
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
            label: type.deliveryDescription + ':      ' + '₪' + type.price,
          };
        });
        this.setState({ deliverySelects: options });
        this.setState({ deliveryTypes: res.data });
        this.setState({ deliverySelected: options[options.length - 1] });
        this.setState({ deliveryType: options[options.length - 1].value });
      })
      .catch((err) => {
        this.setState({hasError: true, orderIsLoading: false, isLoadingForm: false});
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
      this.setState({isLoadingForm: true});
      axios
        .get('user/GetUser', {
          headers: { Authorization: `Bearer ${this.props.token}` },
        })
        .then((res) => {
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
            isLoadingForm: false
          });
        })
        .catch((err) => {
          this.setState({hasError: true, orderIsLoading: false, isLoadingForm: false});
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
    this.setState({orderIsLoading: true});
    let newOrderItems = JSON.parse(localStorage.getItem('cartItems'));
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
    axios
      .post('order/order', order, {
        headers: { Authorization: `Bearer ${this.props.token}` },
      })
      .then((res) => {
        this.setState({orderIsLoading: false, isOrderSent: true});
        this.sendingEmails();
        this.props.onPay();
      })
      .catch((err) => {
        this.setState({hasError: true, orderIsLoading: false, isLoadingForm: false});
      });
  };

  sendingEmails = () => {
    const dreamCream = 'Dream Cream';
    const subject = 'ההזמנה שלך התקבלה';
    const paragraph = `<p style="width: 100%; padding: 18px; background-color: #8cb8a69f;"><br />ההזמנה שלך התקבלה באתר בהצלחה.<br />בקרוב יגיע אליך שליח.<br /> תודה שבחרת לקנות אצלינו <b>${dreamCream}</b></p>`;
    const space =
      '<p style="width: 100%; padding: 18px; background-color: #b3d4c69f;">המוצרים שהזמנת:<br />';
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
    body += '</p>';
    body +=
      '<p style="width: 100%; padding: 18px; height: 100px; background-color: #ec6f779c; background-image: url(' +
      'https://d2cbg94ubxgsnp.cloudfront.net/Pictures/1024x536/4/0/8/132408_shutterstock_406445776.jpg' +
      '); background-position: center; background-size: contain; background-repeat: no-repeat;"> סוג משלוח: ' +
      this.state.deliveryTypes.find((del) => {
        return del.deliveryTypeId === this.state.deliverySelected.value;
      }).deliveryDescription;
    body += '<br /> כתובת: ' + this.state.user.address;
    let price = this.state.deliveryPrice + this.props.finalPrice;
    body += '<br /> מחיר סופי: ' + price;
    body += '</p>';
    sendEmail(
      this.state.user.email,
      subject,
      '<div style="width: 50%; font-size:18px;">' +
        paragraph +
        '' +
        space +
        '' +
        body +
        '</div>'
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
        .post('user/addGuestUser', guestUser)
        .then((res) => {
          this.props.setUserId(res.data);
          return res.data;
        })
        .then((userId) => {
          this.setupOrder(userId);
        })
        .catch((err) => {
          this.setState({hasError: true, orderIsLoading: false, isLoadingForm: false});
        });
    } else {
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
    let form = (
      <form onSubmit={this.submitHandler} className={classes.Form}>
          <div className='row'>
            <div className='col-md-4'></div>
            <div className='row col-md-4'>
                <div className='col-lg-6 col-md-12'>
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
              <div className='col-lg-6 col-md-12'>
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
              <div className='delivery row'>
                <div className='col-lg-6 col-md-12'>
                  <label htmlFor='delivery-type' style={{ fontWeight: 700 }}>
                    סוג משלוח
                  </label>
                  <ErrorBoundary>
                    <DeliveryTypes
                      delTypes={this.state.deliverySelects}
                      handleSelectChange={(selectedOption) => {
                        this.handleSelectChange(selectedOption);
                      }}
                      value={
                        this.state.deliverySelected !== null
                          ? this.state.deliverySelected
                          : null
                      }
                    />
                  </ErrorBoundary>
                </div>
                <div
                  className='col-lg-6 col-md-12'
                  style={{ alignSelf: 'flex-end' }}
                >
                  <p style={{ fontWeight: 600 }}>מחיר סופי + משלוח: <span>&#8362;</span>
                    {this.props.finalPrice + this.state.deliveryPrice}
                  </p>
                </div>
              </div>
               <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PinkButton
                  text='תשלום'
                  type='submit'
                  disabled={!this.state.isValidForm}
                />
              </div>
            
            </div>
            <div className='col-md-4'></div>
          </div>
        </form>
    );
     if(this.state.isLoadingForm || this.state.orderIsLoading){
       form = <Spinner />;
     }
     if(this.state.hasError){
       form = <ErrorMessageForm />;
     }
     if(this.state.isOrderSent === true){
      form = (
        <div className='col-md-12 d-flex flex-column justify-content-center align-items-center'>
          <i
            className='far fa-check-circle fa-4x'
            style={{ margin: '1.5rem', color: 'var(--green-color)' }}
          ></i>
          <h4>.הזמנתך התקבלה בהצלחה</h4>
          <p>.נשלח לך פירוט ההזמנה לתיבת האימייל השמורה במערכת</p>
        </div>
      )
    }
    if(this.props.finalPrice === 0){
      form = (
        <div className='col-md-12 d-flex flex-column justify-content-center align-items-center'>
          <p>...העגלה שלך ריקה</p>
          <i
            style={{ fontSize: '11rem' }}
            className='fa fa-shopping-cart'
          ></i>
          <Link to='/Products' style={{ margin: '1rem' }}>
            <PinkButton text='הוסף מוצרים לעגלה' />
          </Link>
        </div>)
    }
    return (
      <Layout>
        <div className={classes.OrderDetails}>
          <h3 style={{ textAlign: 'center' }}>הכנס פרטים אישיים להזמנה</h3>
          {form}
        </div>
      </Layout>
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
