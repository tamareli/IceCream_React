import * as actionTypes from '../actionTypes/cart';

export const addOrder = (orders, newOrder) => {
  return (dispatch) => {
    let exist = checkAndUpdateExistingOrder(orders, newOrder, dispatch);
    console.log(exist);

    if (exist === true) {
      console.log(exist);
      return;
    }
    localStorage.setItem('cartItems', JSON.stringify(orders.concat(newOrder)));
    dispatch({ type: actionTypes.ADD_TO_CART });
  };
};
export const clearCart = () => {
  return (dispatch) => {
    localStorage.removeItem('cartItems');
    dispatch({ type: actionTypes.CLEAR_CART });
  };
};
export const deleteOrder = (orders, index) => {
  return (dispatch) => {
    alert('אתה הולך למחוק את הפריט מהעגלה');
    orders.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(orders));
    dispatch({ type: actionTypes.DELETE_FROM_CART });
  };
};
export const updateOrderAmount = (orders, index, amount) => {
  return (dispatch) => {
    console.log('index', index);
    console.log('orders', orders);
    let orderToUpdate = orders[index];
    if (orderToUpdate.amount + amount <= 0) {
      console.log('Byee');
      dispatch(deleteOrder(orders, index));
      return;
    }
    orderToUpdate.amount += amount;
    orders[index] = orderToUpdate;
    localStorage.setItem('cartItems', JSON.stringify(orders));
    dispatch({ type: actionTypes.UPDATE_ORDER_AMOUNT });
  };
};
const checkAndUpdateExistingOrder = (orders, newOrder, dispatch) => {
  let newOrderToCompare = {
    product: newOrder.product,
    price: newOrder.price,
    toppings: newOrder.toppings,
    size: newOrder.size,
  };
  let flag = false;
  orders.forEach((element, index) => {
    let orderToCompare = {
      product: element.product,
      price: element.price,
      toppings: element.toppings,
      size: element.size,
    };
    if (JSON.stringify(orderToCompare) === JSON.stringify(newOrderToCompare)) {
      dispatch(updateOrderAmount(orders, index, 1));
      flag = true;
      return;
    }
  });
  return flag;
};
