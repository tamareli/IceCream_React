import classes from '../../../css/Form.module.css';
import React from 'react';
import Input from '../../UI/Input/Input';
import { Component } from 'react';

class ForgetPassword extends Component {
  state = {
    userName: '',
    email: '',
  };
  handleChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  };
  render() {
    return (
      <div className={classes.ForgetPassword}>
        <h2>קבלת סיסמה חדשה למייל</h2>
        <form className={classes.Form}>
          <Input
            type='email'
            name='email'
            inputtype='input'
            label='הכנס כתובת אימייל'
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <button className={classes.Button} type='submit'>
            קבל סיסמה
          </button>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
