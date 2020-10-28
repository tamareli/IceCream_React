import React from 'react';
import LogIn from './LogIn/LogIn';
import NewUser from './NewUser/NewUser';
import classes from './Authenticate.module.css';

function Authenticate(props) {
  let isFromOrder = false;
  if (props.fromOrder) isFromOrder = true;
  return (
    <div className={classes.Authenticate}>
      <LogIn />
      <NewUser fromOrder={isFromOrder} />
    </div>
  );
}

export default Authenticate;
