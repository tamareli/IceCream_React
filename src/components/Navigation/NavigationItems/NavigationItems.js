import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from '../../../css/NavigationItems.module.css';
import ItemsSumUI from '../../Cart/ItemsSumUI';
import Logo from '../../Logo/Logo';

const navigationItems = (props) => {
  let attachedClasses = [classes.NavigationItems];
  if (props.sideDrawer) attachedClasses.push(classes.SideNavigationItems);
  return (
    <ul className={attachedClasses.join(' ')}>
      {!props.isAuth ? (
        <NavigationItem
          link={'/Authenticate?redirectTo=' + props.redirectTo}
          activeClass={true}
        >
          התחבר
        </NavigationItem>
      ) : (
        <>
          <NavigationItem link='/logout' activeClass={true}>
            התנתק
          </NavigationItem>
          <NavigationItem link='/orders' activeClass={true}>
            ההזמנות שלי
          </NavigationItem>
        </>
      )}

      <NavigationItem link='/Products' activeClass={true}>
        המוצרים שלנו
      </NavigationItem>
      {!props.sideDrawer ? (
        <NavigationItem link='/' activeClass={false}>
          <Logo />
        </NavigationItem>
      ) : null}

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
};

export default navigationItems;
