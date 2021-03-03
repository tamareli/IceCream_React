import React from 'react';
import classes from '../../../css/OrderSummary.module.css';
import { Link } from 'react-router-dom';

export default function NextStep() {
  return (
    <div>
      {' '}
      <div>
        <p style={{ textAlign: 'center' }}>!המוצר התווסף לסל בהצלחה</p>
        <hr />
      </div>
      <div className={classes.Buttons}>
        <Link to='/OrdersSummary'>
          <button className='PinkWhiteButton'>קופה</button>
        </Link>
        <Link to='/Products'>
          <button className='GreenWhiteButton'>המשך קניה</button>
        </Link>
      </div>
    </div>
  );
}
