import React from 'react';
import LogIn from '../components/Authentication/LogIn/LogIn';
import NewUser from '../components/Authentication/LoginForm/LoginForm';
import classes from '../css/Authenticate.module.css';

function Authenticate(props) {
  var urlParams = new URLSearchParams(window.location.search);
  let redirectTo = urlParams.get('redirectTo');
  return (
    <div className={['container', classes.Authenticate].join(' ')}>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          <NewUser redirectTo={redirectTo} />
        </div>
        <div className='col-md-4'>
          <LogIn redirectTo={redirectTo} />
        </div>
        <div className='col-md-2'></div>
      </div>
    </div>
  );
}

export default Authenticate;
