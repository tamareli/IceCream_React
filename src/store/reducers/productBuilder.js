import * as actionTypes from '../actionTypes/productBuilder';

const initialState = {
  category: null,
  products: null,
  productsError: false,
  product: null,
  toppingsCatgs: [],
  toppingsCatgsLoading: true,
  toppingsForCatgs: [],
  toppingsForCatgsLoading: true,
  sizes: [],
  sizesError: false,
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
        productError: false,
        categoryError: false,
        toppingsCatgs: [],
        toppingsCatgsLoading: false,
        catgsToppingsError: false,
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
        categoryError: false
      };
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        productsError: false
      };
    case actionTypes.SET_PRODUCTS_ERROR:
    return {
      ...state,
      productsError: true,
    };
    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
        productError: false
      };
    case actionTypes.SET_PRODUCT_ERROR:
    return {
      ...state,
      productError: true
    };
    case actionTypes.SET_CATEGORY_ERROR:
    return {
      ...state,
      categoryError: true
    };
    case actionTypes.SET_TOPPINGS_CATEGORIES:
      return {
        ...state,
        toppingsCatgs: action.categories,
        toppingsCatgsLoading: false,
        catgsToppingsError: false

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
          sizesError: false
        };
      } else {
        return {
          ...state,
          sizes: action.sizes,
          sizesError: false
        };
      }
    case actionTypes.SET_SIZES_ERROR:
      return {
        ...state,
        sizesError: true
      };
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
    
    case actionTypes.SET_CATEGORIES_TOPPINGS_ERROR:
      return {
        ...state,
        catgsToppingsError: true,
        toppingsCatgsLoading: false,
        toppingsForCatgsLoading: false
      };

    case actionTypes.SET_TOPPINGS:
      return {
        ...state,
        toppings: action.toppings,
      };
    case actionTypes.SET_TOPPINGS_AMOUNT: 
      return {
        ...state,
        toppingsAmount: action.toppingsAmount
      };
    case actionTypes.SET_TOPPINGS_PRICE: 
    return {
      ...state,
      toppingsPrice: action.toppingsPrice
    }
  }
  return state;
};
export default reducer;
