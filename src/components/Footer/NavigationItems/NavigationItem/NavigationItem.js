import React from 'react';
import classes from '../../../../css/Footer.module.css';
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
        activeStyle={{ color: 'var(--green-color)' }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
