import React from 'react';
import LogIn from './LogIn/LogIn';
import NewUser from './NewUser/NewUser';
import classes from './Authenticate.module.css';

function Authenticate(props) {
  let isFromOrder = false;
  if (props.location.aboutProps)
    if (props.location.aboutProps.fromOrder) isFromOrder = true;

  return (
    <div className={classes.Authenticate}>
      <LogIn fromOrder={isFromOrder} />
      <NewUser fromOrder={isFromOrder} />
    </div>
  );
}

export default Authenticate;
