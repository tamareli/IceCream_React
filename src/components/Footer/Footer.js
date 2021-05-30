import React from 'react';
import classes from '../../css/Footer.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import Logo from '../Logo/BigLogo';
import dreamCreamLogo from '../../assets/images/logo4.png';



export default function Footer() {
  return (
    <div className={classes.Footer}>
      <div style={{width: '60px', height: '60px'}}>
      <img style={{ height: '100%' }} src={dreamCreamLogo} alt='DreamCream' />

      </div>
      
      <NavigationItems />
      <p style={{color: 'var(--bg-color)'}}>M&T הזכויות שמורות ל &copy; </p>
    </div>
  );
}
