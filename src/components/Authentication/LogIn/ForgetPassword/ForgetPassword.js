import classes from './ForgetPassword.module.css';
import React from 'react';

function ForgetPassword() {
  return (
    <div className={classes.ForgetPassword}>
      <h2>קבלת סיסמה חדשה למייל</h2>
      <form className={classes.PasswordForm}>
        <label className={classes.FormItem} htmlFor='user-name'>
          שם משתמש
        </label>
        <input
          className={classes.FormItem}
          type='text'
          name='user-name'
        ></input>
        <label className={classes.FormItem} htmlFor='email'>
          דואר אלקטרוני
        </label>
        <input className={classes.FormItem} type='text' name='email'></input>
        <button className={classes.FormItem} type='submit'>
          קבל סיסמה
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;
