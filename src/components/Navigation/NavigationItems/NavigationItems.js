import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/Authenticate'>התחברות</NavigationItem>
    <NavigationItem link='/'>בית</NavigationItem>
    <NavigationItem link='/'>עלינו</NavigationItem>
    <NavigationItem link='/'>צור קשר</NavigationItem>
  </ul>
);

export default navigationItems;
