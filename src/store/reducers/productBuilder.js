import * as actionTypes from '../actionTypes/productBuilder';

const initialState = {
  category: null,
  products: null,
  product: null,
  toppingsCatgs: [],
  toppingsCatgsLoading: true,
  toppingsForCatgs: [],
  toppingsForCatgsLoading: true,
  sizes: [],
  freeToppingsAmount: {
    sauces: 0,
    others: 0,
  },
  toppings: [], //toppings id:{...},id:{...}
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
    case actionTypes.INIT_PRODUCT_BUILDER:
      return {
        category: null,
        products: null,
        product: null,
        toppingsCatgs: [],
        toppingsCatgsLoading: false,
        toppingsForCatgs: [],
        toppingsForCatgsLoading: false,
        sizes: [],
        freeToppingsAmount: {
          sauces: 0,
          others: 0,
        },
        toppings: [], //toppings id:{...},id:{...}
        selectedSize: null,
        startingPrice: 0,
        toppingsPrice: 0,
        toppingsAmount: {
          sauces: 0, //רטבים
          others: 0, // תוספות
        },
      };
    case actionTypes.ADD_TOPPING:
      let amount = 0;
      let toppings = [...state.toppings];
      if (action.amount === 1) {
        amount = 1;
        toppings.push(action.topping);
      } else {
        amount = -1;
        toppings = toppings.filter(
          (obj) => obj.toppingId !== action.topping.toppingId
        );
      }
      return {
        ...state,
        toppings: toppings,
        toppingsAmount: {
          ...state.toppingsAmount,
          [action.topping.categoryType]:
            state.toppingsAmount[action.topping.categoryType] + amount,
        },
      };
    case actionTypes.UPDATE_PRICE_ADD:
      let topping = state.toppings.filter(
        (top) => top.toppingId === action.toppingId
      )[0];
      console.log('topping', topping);
      let price = 0;
      if (
        state.toppingsAmount[topping.categoryType] >
        state.freeToppingsAmount[topping.categoryType]
      ) {
        price = topping.price;
      }

      return {
        ...state,
        toppingsPrice: state.toppingsPrice + price,
      };
    case actionTypes.UPDATE_PRICE_REMOVE:
      let priceR = 0;
      let toppingR = state.toppings.filter(
        (top) => top.toppingId === action.toppingId
      )[0];
      if (
        state.toppingsAmount[toppingR.categoryType] >
        state.freeToppingsAmount[toppingR.categoryType]
      ) {
        priceR = toppingR.price;
      }
      return {
        ...state,
        toppingsPrice: state.toppingsPrice - priceR,
      };

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
        toppingsCatgsLoading: false,
      };
    case actionTypes.SET_TOPPINGS_FOR_CATEGORIES:
      return {
        ...state,
        toppingsForCatgs: action.toppings,
        toppingsForCatgsLoading: false,
      };
    case actionTypes.SET_SIZES:
      let size = state.selectedSize;
      if (size === null) {
        return {
          ...state,
          sizes: action.sizes,
          selectedSize: action.sizes[0],
          startingPrice: action.sizes[0].price,
        };
      } else {
        return {
          ...state,
          sizes: action.sizes,
        };
      }
    case actionTypes.SET_SELECTED_SIZE:
      return {
        ...state,
        selectedSize: action.size,
        startingPrice: action.size.price,
      };
    case actionTypes.SET_LOADING_FOR_CATEGORIES:
      return {
        ...state,
        toppingsCatgsLoading: action.loading,
      };
    case actionTypes.SET_LOADING_FOR_CATEGORIES_TOPPINGS:
      return {
        ...state,
        toppingsForCatgsLoading: action.loading,
      };
    case actionTypes.SET_TOPPINGS:
      return {
        ...state,
        toppings: action.toppings,
      };
  }
  return state;
};
export default reducer;
