import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/Authenticate'>התחברות</NavigationItem>
    <NavigationItem link='/'>בית</NavigationItem>
    <NavigationItem link='/AboutUs'>עלינו</NavigationItem>
    <NavigationItem link='/Contact'>צור קשר</NavigationItem>
    <NavigationItem link='/OrdersSummary'>סל קניות</NavigationItem>
  </ul>
);

export default navigationItems;
