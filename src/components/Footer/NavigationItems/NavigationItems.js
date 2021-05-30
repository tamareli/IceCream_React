import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from '../../../css/Footer.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/Products' activeClass={true}>
        המוצרים שלנו
      </NavigationItem>
      <NavigationItem link='/main' activeClass={true}>
        ראשי
      </NavigationItem>
      <NavigationItem link='/AboutUs' activeClass={true}>
        עלינו
      </NavigationItem>
      <NavigationItem link='/Contact' activeClass={true}>
        צור קשר
      </NavigationItem>
      <NavigationItem link='/OrdersSummary' activeClass={false}>
        עגלה
      </NavigationItem>
    </ul>
  );
};

export default navigationItems;
