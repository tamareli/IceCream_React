import React from 'react';

export default function Toppings(props) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <p>תוספות:</p>
      <div>
        {props.toppings.map((top) => {
          return <div key={top.toppingId}>{top.toppingName}</div>;
        })}
        {props.toppings.length === 0 ? <p>ללא</p>: null}
      </div>
    </div>
  );
}
