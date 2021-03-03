import React from 'react';
import LogIn from '../components/Authentication/LogIn/LogIn';
import NewUser from '../components/Authentication/LoginForm/LoginForm';
import classes from '../css/Authenticate.module.css';

function Authenticate(props) {
  var urlParams = new URLSearchParams(window.location.search);
  let redirectTo = urlParams.get('redirectTo');
  return (
    <div className={['container', classes.Authenticate].join(' ')}>
      <div
        className={['row', classes.Bg].join(' ')}
        style={{ paddingTop: '4rem' }}
      >
        <h1
          className='text-center'
          style={{ fontWeight: '700', color: 'var(--bg-color' }}
        >
          הצטרף לקהל לקחותינו המרוצים
        </h1>
        <h5
          className='text-center'
          style={{ fontWeight: '600', color: 'var(--bg-color' }}
        >
          הרשמה לאתר תאפשר לך חוית קניה נוחה ופשוטה יותר
        </h5>
      </div>
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
