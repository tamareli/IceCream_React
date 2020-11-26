import React from 'react';

export default function Sizes(props) {
  return (
    <div>
      <h3>גודל רצוי:</h3>
      {props.sizes.map((size) => {
        return (
          <div
            key={size.sizeId}
            onClick={props.sizeClicked.bind(this, size.price)}
          >
            {size.sizeName}
          </div>
        );
      })}
    </div>
  );
}
