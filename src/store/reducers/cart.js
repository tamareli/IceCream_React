import * as actionTypes from '../actionTypes/cart';
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  editClicked: false,
  finalPrice: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
    case actionTypes.DELETE_FROM_CART:
    case actionTypes.UPDATE_ORDER_AMOUNT: {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'));
      let finalPrice = 0;
      cartItems.forEach((item) => {
        finalPrice += item.price * item.amount;
      });
      return {
        ...state,
        cartItems: cartItems,
        finalPrice: finalPrice,
      };
    }
    case actionTypes.CLEAR_CART: {
      return {
        ...state,
        cartItems: [],
      };
    }
    case actionTypes.EDIT_TRUE: {
      return {
        ...state,
        editClicked: true,
      };
    }
    case actionTypes.EDIT_FALSE: {
      return {
        ...state,
        editClicked: false,
      };
    }
  }
  return state;
};
export default reducer;
