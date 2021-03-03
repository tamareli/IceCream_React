import classes from '../../../../css/SelectSize.module.css';
import React from 'react';

export default function Sizes(props) {
  return (
    <div className={classes.Sizes}>
      {props.sizes.map((size) => {
        const classesStyle = [classes.Size, size.sizeId, 'size'];
        const sizeImage = require(`../../../../assets/images/sizes/${size.image}`);

        if (size.sizeId === props.selectedSize.sizeId) {
          classesStyle.push(classes.Active);
        }

        return (
          <div
            className={classesStyle.join(' ')}
            key={size.sizeId}
            onClick={() => {
              props.sizeClicked(size);
              let sizes = props.sizes.map((size) => {
                document
                  .getElementsByClassName(size.sizeId)[0]
                  .classList.remove(classes.Active);
              });
              document
                .getElementsByClassName(size.sizeId)[0]
                .classList.add(classes.Active);
            }}
          >
            <div
              className={classes.Img}
              style={{ backgroundImage: 'url(' + sizeImage + ')' }}
            ></div>
            <p
              style={{
                direction: 'rtl',
                color: 'inherit',
                fontWeight: 'inherit',
              }}
            >
              {size.sizeName + ': '}
              &#8362;{size.price}
            </p>
          </div>
        );
      })}
    </div>
  );
}
