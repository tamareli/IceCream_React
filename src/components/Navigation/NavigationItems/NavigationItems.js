import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from '../../../css/NavigationItems.module.css';
import ItemsSumUI from '../../Cart/ItemsSumUI';
import Logo from '../../Logo/Logo';

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
      <>
        <NavigationItem link='logout' activeClass={true}>
          התנתק
        </NavigationItem>
        <NavigationItem link='orders' activeClass={true}>
          ההזמנות שלי
        </NavigationItem>
      </>
    )}

    <NavigationItem link='/ourProducts' activeClass={true}>
      המוצרים שלנו
    </NavigationItem>

    <NavigationItem link='/' activeClass={false}>
      <Logo />
    </NavigationItem>
    <NavigationItem link='/AboutUs' activeClass={true}>
      עלינו
    </NavigationItem>
    <NavigationItem link='/Contact' activeClass={true}>
      צור קשר
    </NavigationItem>
    <NavigationItem link='/OrdersSummary' activeClass={false}>
      <i className='fa fa-shopping-cart fa-md'></i>
      <ItemsSumUI />
    </NavigationItem>
  </ul>
);

export default navigationItems;
