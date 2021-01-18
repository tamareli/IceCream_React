import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from '../../../css/NavigationItems.module.css';
import ItemsSumUI from '../../Cart/ItemsSumUI';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {!props.isAuth ? (
      <NavigationItem
        link={'/Authenticate?redirectTo=' + props.redirectTo}
        activeClass={true}
      >
        התחבר
      </NavigationItem>
    ) : (
      <NavigationItem link='logout' activeClass={true}>
        התנתק
      </NavigationItem>
    )}
    <NavigationItem link='/' activeClass={true}>
      בית
    </NavigationItem>
    <NavigationItem link='/ourProducts' activeClass={true}>
      המוצרים שלנו
    </NavigationItem>

    <NavigationItem link='/' activeClass={false}>
      <p style={{ fontFamily: 'cursive', fontSize: '28px' }}>IceCream</p>
    </NavigationItem>
    <NavigationItem link='/AboutUs' activeClass={true}>
      עלינו
    </NavigationItem>
    <NavigationItem link='/Contact' activeClass={true}>
      צור קשר
    </NavigationItem>
    <NavigationItem link='/OrdersSummary' activeClass={false}>
      <i className='fa fa-shopping-cart fa-lg'></i>
      <ItemsSumUI />
    </NavigationItem>
  </ul>
);

export default navigationItems;
