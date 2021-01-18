import React from 'react';
import classes from '../../css/ItemsSumUi.module.css';
import { connect } from 'react-redux';

function ItemsSumUI(props) {
  let itemsAmount = props.cartItems.reduce((acc, curr) => acc + curr.amount, 0);
  if (itemsAmount === 0) itemsAmount = '';
  return (
    <div className={itemsAmount !== '' ? classes.Counter : classes.Hidden}>
      {itemsAmount}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};
export default connect(mapStateToProps)(ItemsSumUI);
