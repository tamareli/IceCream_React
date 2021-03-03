import classes from '../../../css/Form.module.css';
import React from 'react';
import Input from '../../UI/Input/Input';
import { Component } from 'react';
import GreenButton from '../../UI/Button/GreenButton';

class ForgetPassword extends Component {
  state = {
    userName: '',
    email: '',
  };
  handleChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  };
  onSubmitHandler = () => {
    alert('submit');
  };
  render() {
    return (
      <div className={classes.ForgotPasswordForm}>
        <p style={{ fontSize: '18px' }}>
          הכנס/י את כתובת האימייל שלך וקבל סיסמה חדשה
        </p>
        <form className={classes.Form} onSubmit={this.onSubmitHandler}>
          <Input
            type='email'
            name='email'
            inputtype='input'
            label='אימייל'
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <GreenButton
            text='קבל סיסמה'
            type='submit'
            disabled={false}
          ></GreenButton>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
