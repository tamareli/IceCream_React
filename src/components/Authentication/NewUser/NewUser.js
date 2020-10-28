import classes from './NewUser.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NewUser(props) {
  return (
    <div className={classes.NewUser}>
      <h3>חדש באתר?</h3>
      <Link to='/SignIn'>
        <button className={classes.Button}>להרשמה</button>
      </Link>
      {props.fromOrder ? (
        <>
          <p>או</p>
          <Link exact='true' to='/OrderDetails'>
            <button className={classes.Button}>הזמנה כאורח</button>
          </Link>
        </>
      ) : null}
    </div>
  );
}

export default NewUser;
