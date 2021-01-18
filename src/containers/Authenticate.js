import React from 'react';
import LogIn from '../components/Authentication/LogIn/LogIn';
import NewUser from '../components/Authentication/LoginForm/LoginForm';
import classes from '../css/Authenticate.module.css';

function Authenticate(props) {
  var urlParams = new URLSearchParams(window.location.search);
  let redirectTo = urlParams.get('redirectTo');
  return (
    <div className={classes.Authenticate}>
      <LogIn redirectTo={redirectTo} />
      <NewUser redirectTo={redirectTo} />
    </div>
  );
}

export default Authenticate;
