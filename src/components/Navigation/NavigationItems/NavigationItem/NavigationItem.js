import React from 'react';
import classes from '../../../../css/NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
  let active = '';
  if (props.activeClass === true) {
    active = 'active';
  }
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        exact
        activeClassName={active}
        to={props.link}
        activeStyle={{ color: '#69be73' }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
