import * as actionTypes from '../actionTypes/cart';
const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  editClicked: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
    case actionTypes.DELETE_FROM_CART:
    case actionTypes.UPDATE_ORDER_AMOUNT: {
      return {
        ...state,
        cartItems: JSON.parse(localStorage.getItem('cartItems')),
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
