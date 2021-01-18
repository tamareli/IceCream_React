import classes from '../../../../css/SelectSize.module.css';
import React from 'react';

export default function Sizes(props) {
  // const sizeImage = require(`../../../assets/images/products/${props.selectedProduct.image}`);
  const sizeImage = require(`../../../../assets/images/products/yogurt/mango.png`);

  return (
    <div className={classes.Sizes}>
      {props.sizes.map((size) => {
        const classesStyle = [classes.Size];

        if (size.sizeId === props.selectedSize.sizeId) {
          classesStyle.push(classes.Active);
        }
        console.log(size.sizeId, 'size.sizeId');
        console.log(props.selectedSize.sizeId, 'props.selectedSize.sizeId');
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
            <p>{size.sizeName + ': ' + size.price}</p>
          </div>
        );
      })}
    </div>
  );
}
