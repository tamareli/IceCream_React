import * as actionTypes from '../actionTypes/productBuilder';

const initialState = {
  category: null,
  products: null,
  product: null,
  toppingsCatgs: [],
  toppingsForCatgs: [],
  sizes: [],
  freeToppingsAmount: {
    // should be getting from an api to a certain product,
    sauces: 0,
    others: 0,
  },
  toppings: null, //toppings id:{...},id:{...}
  selectedSize: null,
  startingPrice: 0,
  toppingsPrice: 0,
  toppingsAmount: {
    sauces: 0, //רטבים
    others: 0, // תוספות
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TOPPING:
      let amount = 0;
      if (action.amount === 1) amount = 1;
      else {
        if (state.toppings[action.toppingId].amount === 0) amount = 0;
        else amount = -1;
      }
      return {
        ...state,
        toppings: {
          ...state.toppings,
          [action.toppingId]: {
            ...state.toppings[action.toppingId],
            amount: state.toppings[action.toppingId].amount + amount,
          },
        },
        toppingsAmount: {
          ...state.toppingsAmount,
          [state.toppings[action.toppingId].categoryType]:
            state.toppingsAmount[
              state.toppings[action.toppingId].categoryType
            ] + amount,
        },
      };
    case actionTypes.UPDATE_PRICE_ADD:
      let price = 0;
      if (
        state.toppingsAmount[state.toppings[action.toppingId].categoryType] >
        state.freeToppingsAmount[state.toppings[action.toppingId].categoryType]
      )
        price = state.toppings[action.toppingId].price;
      return {
        ...state,
        toppingsPrice: state.toppingsPrice + price,
      };
    case actionTypes.UPDATE_PRICE_REMOVE:
      let price2 = 0;
      if (
        state.toppingsAmount[state.toppings[action.toppingId].categoryType] >=
        state.freeToppingsAmount[state.toppings[action.toppingId].categoryType]
      )
        price2 = state.toppings[action.toppingId].price;
      return {
        ...state,
        toppingsPrice: state.toppingsPrice - price2,
      };
    case actionTypes.ADD_TOPPING:
      return state;
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
        freeToppingsAmount: {
          ...state.freeToppingsAmount,
          sauces: action.category.freeToppingsForSaucesAmount,
          others: action.category.freeToppingsForOthersAmount,
        },
      };
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actionTypes.SET_TOPPINGS_CATEGORIES:
      return {
        ...state,
        toppingsCatgs: action.categories,
      };
    case actionTypes.SET_TOPPINGS_FOR_CATEGORIES:
      return {
        ...state,
        toppingsForCatgs: action.toppings,
      };
    case actionTypes.SET_SIZES:
      return {
        ...state,
        sizes: action.sizes,
        selectedSize: action.sizes[0],
        startingPrice: action.sizes[0].price,
      };
    case actionTypes.SET_TOPPINGS:
      return {
        ...state,
        toppings: action.toppings,
      };
    case actionTypes.SET_SELECTED_SIZE:
      return {
        ...state,
        selectedSize: action.size,
        startingPrice: action.size.price,
      };
  }
  return state;
};
export default reducer;
