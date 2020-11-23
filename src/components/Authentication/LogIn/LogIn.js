import React, { Component } from 'react';
import classes from './LogIn.module.css';
import { Link, withRouter } from 'react-router-dom';

export class LogIn extends Component {
  state = {
    userName: '',
    password: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (fun()) {
      alert('ברוכה הבאה ' + this.state.userName);
      if (this.props.fromOrder) this.props.history.push('/Orderdetails');
      else this.props.history.push('/');
    } else alert('שם משתמש או סיסמה שגויים');
  };

  handleChange = (input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className={classes.LoginForm}>
        <h3>התחברות לחשבון</h3>
        <label className={classes.LoginItem} htmlFor='user-name'>
          שם משתמש
        </label>
        <input
          className={[classes.LoginItem, classes.InputField].join(' ')}
          type='text'
          name='user-name'
          value={this.state.userName}
          id='name'
          placeholder='שם משתמש'
          onChange={this.handleChange('userName')}
        />
        <label className={classes.LoginItem} htmlFor='password'>
          סיסמה{' '}
        </label>
        <input
          className={[classes.LoginItem, classes.InputField].join(' ')}
          type='password'
          name='password'
          value={this.state.password}
          id='password'
          placeholder='סיסמה'
          onChange={this.handleChange('password')}
        />
        <div className={classes.LoginItem}>
          <input className={classes.LoginButton} type='submit' value='כניסה' />
        </div>
        <div className={classes.LoginItem}>
          {/* הקישור יפנה לדף של שיחזור סיסמה */}
          <Link to='/ForgetPassword'>שכחת סיסמה?</Link>
        </div>
      </form>
    );
  }
}
//זו כביכול הפונקציה שתחזור מהשרת
function fun(params) {
  return true;
  //return false;
}

export default withRouter(LogIn);
