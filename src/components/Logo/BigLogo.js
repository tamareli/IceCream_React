import React from 'react';
import dreamCreamLogo from '../../assets/images/logo4.png';

const logo = () => (
  <div
    style={{
      height: '220px',
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <img style={{ height: '100%' }} src={dreamCreamLogo} alt='DreamCream' />
  </div>
);

export default logo;
