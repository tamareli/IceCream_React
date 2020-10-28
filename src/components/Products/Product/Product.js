import React from 'react';

export default function Product(props) {
  return (
    <div>
      <h2>{props.type}</h2>
      <h2>{props.description}</h2>
    </div>
  );
}
