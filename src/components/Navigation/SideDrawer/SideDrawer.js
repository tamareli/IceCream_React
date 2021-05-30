import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from '../../../css/SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router-dom';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) attachedClasses = [classes.SideDrawer, classes.Open];
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Link to='/'>
            <Logo />
          </Link>
        </div>
        <nav>
          <NavigationItems
            isAuth={props.isAuth}
            redirectTo='/'
            sideDrawer={true}
          />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;
