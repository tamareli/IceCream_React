import React from 'react';

export default function Toppings(props) {
  return (
    <div>
      <p>תוספות:</p>
      {props.toppings.map((top) => {
        return <div key={top.toppingId}>{top.toppingName}</div>;
      })}
    </div>
  );
}
