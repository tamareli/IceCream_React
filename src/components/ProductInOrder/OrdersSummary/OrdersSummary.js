import React from 'react';
import { Link } from 'react-router-dom';

function OrdersSummary() {
  return (
    <div>
      <h1>סיכום הזמנות</h1>
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

export default OrdersSummary;
