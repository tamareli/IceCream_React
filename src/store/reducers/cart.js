import * as actionTypes from '../actionTypes';
const initialState = {
  cartItems: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const newItem = {
        product: action.payload.product,
        price: action.payload.price,
        toppings: action.payload.toppings,
      };
      return {
        ...state,
        cartItems: state.cartItems.concat(newItem),
      };
    }
  }
  return state;
};
export default reducer;
