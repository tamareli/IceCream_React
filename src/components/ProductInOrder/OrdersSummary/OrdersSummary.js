import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function OrdersSummary(props) {
  console.log(props.cartItems);
  return (
    <div>
      <h1>סיכום הזמנות</h1>
      {props.cartItems.map((item) => {
        return <p>{item.price}</p>;
      })}
      <Link
        to={{
          pathname: '/Authenticate',
          aboutProps: {
            fromOrder: true,
          },
        }}
      >
        <button>המשך לתשלום</button>
      </Link>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};
export default connect(mapStateToProps)(OrdersSummary);
