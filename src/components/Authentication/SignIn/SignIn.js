import React, { Component } from 'react';
import axios from '../../../axios';
import classes from '../../../css/Form.module.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as AuthActions from '../../../store/actions/auth';
import Input from '../../UI/Input/Input';
import { checkValidity } from '../../../shared/validate';

class SignIn extends Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
      password: '',
    },
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
      password: { required: true, minLength: 8, maxLength: 15 },
    },
    userValid: {
      firstName: { valid: false, touched: false, errmessage: '' },
      lastName: { valid: false, touched: false, errmessage: '' },
      phone: { valid: false, touched: false, errmessage: '' },
      address: { valid: false, touched: false, errmessage: '' },
      email: { valid: false, touched: false, errmessage: '' },
      password: { valid: false, touched: false, errmessage: '' },
    },
    isValidForm: false,
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

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('user/register', this.state.user)
      .then((res) => {
        alert('ברוכה הבאה!');
        this.props.onAuth(this.state.user.email, this.state.user.password);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    var urlParams = new URLSearchParams(window.location.search);
    let redirectTo = urlParams.get('redirectTo');
    let path = '/';
    if (redirectTo != null) path = redirectTo;
    let authRedirect = null;
    console.log(path);
    if (this.props.isAuthenticated) authRedirect = <Redirect to={path} />;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={this.handleSubmit} className={classes.Form}>
          {authRedirect}
          <h3>הירשם</h3>
          <hr></hr>
          <Input
            type='text'
            name='first-name'
            inputtype='input'
            label='שם פרטי'
            value={this.state.user.firstName}
            onChange={this.handleChange('firstName')}
            invalid={(!this.state.userValid.firstName.valid).toString()}
            touched={this.state.userValid.firstName.touched.toString()}
            errmessage={this.state.userValid.firstName.errmessage}
          />

          <Input
            type='text'
            name='last-name'
            inputtype='input'
            label='שם משפחה'
            value={this.state.user.lastName}
            onChange={this.handleChange('lastName')}
            invalid={(!this.state.userValid.lastName.valid).toString()}
            touched={this.state.userValid.lastName.touched.toString()}
            errmessage={this.state.userValid.lastName.errmessage}
          />
          <Input
            type='text'
            name='phone'
            inputtype='input'
            label='טלפון'
            value={this.state.user.phone}
            onChange={this.handleChange('phone')}
            invalid={(!this.state.userValid.phone.valid).toString()}
            touched={this.state.userValid.phone.touched.toString()}
            errmessage={this.state.userValid.phone.errmessage}
          />
          <Input
            type='text'
            name='address'
            inputtype='input'
            label='כתובת'
            value={this.state.user.address}
            onChange={this.handleChange('address')}
            invalid={(!this.state.userValid.address.valid).toString()}
            touched={this.state.userValid.address.touched.toString()}
            errmessage={this.state.userValid.address.errmessage}
          />
          <Input
            type='email'
            name='email'
            inputtype='input'
            label='מייל'
            value={this.state.user.email}
            onChange={this.handleChange('email')}
            invalid={(!this.state.userValid.email.valid).toString()}
            touched={this.state.userValid.email.touched.toString()}
            errmessage={this.state.userValid.email.errmessage}
          />
          <Input
            type='password'
            name='password'
            inputtype='input'
            label='סיסמה'
            value={this.state.user.password}
            onChange={this.handleChange('password')}
            invalid={(!this.state.userValid.password.valid).toString()}
            touched={this.state.userValid.password.touched.toString()}
            errmessage={this.state.userValid.password.errmessage}
          />
          <input
            className={classes.Button}
            type='submit'
            value='הירשם'
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, path) =>
      dispatch(AuthActions.auth(email, password, path)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
