import React, { Component } from 'react';
import axios from '../../../axios';
import classes from '../LogIn/LogIn.module.css';

export default class SignIn extends Component {
  state = {
    user: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      email: '',
      password: '',
    },
  };
  handleChange = (input) => (e) => {
    e.preventDefault();
    let updatedUser = this.state.user;
    updatedUser[input] = e.target.value;
    this.setState({ user: updatedUser });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('user/register', this.state.user)
      .then((res) => {
        alert('ברוכה הבאה!');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={this.handleSubmit} className={classes.LoginForm}>
          <label className={classes.LoginItem} htmlFor='first-name'>
            שם פרטי:
          </label>
          <input
            className={[classes.LoginItem, classes.InputField].join(' ')}
            type='text'
            name='first-name'
            value={this.state.user.firstName}
            onChange={this.handleChange('firstName')}
          />
          <br />
          <label className={classes.LoginItem} htmlFor='last-name'>
            שם משפחה:
          </label>
          <input
            className={[classes.LoginItem, classes.InputField].join(' ')}
            type='text'
            name='lasr-name'
            value={this.state.user.lastName}
            onChange={this.handleChange('lastName')}
          />
          <br />

          <label className={classes.LoginItem} htmlFor='phone'>
            {' '}
            טלפון:
          </label>
          <input
            className={[classes.LoginItem, classes.InputField].join(' ')}
            type='text'
            name='phone'
            value={this.state.user.phone}
            onChange={this.handleChange('phone')}
          />

          <br />

          <label className={classes.LoginItem} htmlFor='address'>
            כתובת:
          </label>
          <input
            className={[classes.LoginItem, classes.InputField].join(' ')}
            type='text'
            name='address'
            value={this.state.user.address}
            onChange={this.handleChange('address')}
          />
          <br />

          <label className={classes.LoginItem} htmlFor='email'>
            מייל:
          </label>
          <input
            className={[classes.LoginItem, classes.InputField].join(' ')}
            type='email'
            name='email'
            value={this.state.user.email}
            onChange={this.handleChange('email')}
          />
          <br />
          <label className={classes.LoginItem} htmlFor='password'>
            סיסמא:
          </label>
          <input
            className={[classes.LoginItem, classes.InputField].join(' ')}
            type='password'
            name='password'
            value={this.state.user.password}
            onChange={this.handleChange('password')}
          />
          <br />
          <div className={classes.LoginItem}>
            <input
              className={classes.LoginButton}
              type='submit'
              value='הירשם'
            />
          </div>
        </form>
      </div>
    );
  }
}
