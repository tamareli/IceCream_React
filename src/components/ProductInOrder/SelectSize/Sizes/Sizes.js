import classes from '../../../../css/SelectSize.module.css';
import React from 'react';

export default function Sizes(props) {
  return (
    <div className={classes.Sizes}>
      {props.sizes.map((size) => {
        const classesStyle = [classes.Size];
        const sizeImage = require(`../../../../assets/images/sizes/${size.image}`);

        if (size.sizeId === props.selectedSize.sizeId) {
          classesStyle.push(classes.Active);
        }

        return (
          <div
            className={classesStyle.join(' ')}
            key={size.sizeId}
            onClick={props.sizeClicked.bind(this, size)}
          >
            <div
              className={classes.Img}
              style={{ backgroundImage: 'url(' + sizeImage + ')' }}
            ></div>
            <p
              style={{ direction: 'rtl' }}
            >{`${size.sizeName}: ${size.price}`}</p>
          </div>
        );
      })}
    </div>
  );
}
