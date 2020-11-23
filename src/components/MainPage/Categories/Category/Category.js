import React from 'react';
import classes from './Category.module.css';

export default function Category(props) {
  return (
    <div className={classes.Category}>
      <h2>{props.name}</h2>
    </div>
  );
}
