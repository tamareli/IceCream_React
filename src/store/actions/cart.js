import * as actionTypes from '../actionTypes/cart';

export const addOrder = (orders, newOrder) => {
  return (dispatch) => {
    let returnedObj = editOrder(orders, newOrder);
    orders = returnedObj.orders;
    if (!returnedObj.edited) {
      let exist = checkAndUpdateExistingOrder(orders, newOrder, dispatch);
      if (exist === true) {
        return;
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(orders.concat(newOrder))
      );
    } else {
      localStorage.setItem('cartItems', JSON.stringify(orders));
    }
    dispatch({ type: actionTypes.ADD_TO_CART });
  };
};
const editOrder = (orders, newOrder) => {
  let foundIndex = orders.findIndex((x) => x.id === newOrder.id);
  let edited = false;
  if (foundIndex !== -1 && orders.length !== 0) {
    orders[foundIndex] = newOrder;
    edited = true;
  }

  return { orders: orders, edited: edited };
};
export const clearCart = () => {
  return (dispatch) => {
    localStorage.removeItem('cartItems');
    dispatch({ type: actionTypes.CLEAR_CART });
  };
};
export const setEditTrue = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.EDIT_TRUE });
  };
};
export const setEditFalse = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.EDIT_FALSE });
  };
};
export const deleteOrder = (orders, index) => {
  return (dispatch) => {
    orders.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(orders));
    dispatch({ type: actionTypes.DELETE_FROM_CART });
  };
};
export const updateOrderAmount = (orders, index, amount) => {
  return (dispatch) => {
    let orderToUpdate = orders[index];
    if (orderToUpdate.amount + amount <= 0) {
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
    size: newOrder.size,
  };
  let flag = false;
  orders.forEach((element, index) => {
    let orderToCompare = {
      product: element.product,
      price: element.price,
      size: element.size,
    };
    if (JSON.stringify(orderToCompare) === JSON.stringify(newOrderToCompare)) {
      if (equalArrays(element.toppings, newOrder.toppings)) {
        dispatch(updateOrderAmount(orders, index, 1));
        flag = true;
        return;
      }
    }
  });
  return flag;
};
function equalArrays(a, b) {
  if (a.length !== b.length) return false;
  const ser = (o) =>
    JSON.stringify(
      Object.keys(o)
        .sort()
        .map((k) => [k, o[k]])
    );
  a = new Set(a.map(ser));
  return b.every((o) => a.has(ser(o)));
}
