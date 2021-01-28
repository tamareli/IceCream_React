import * as actionTypes from '../actionTypes/productBuilder';
import axios from '../../axios';

const setCategory = (category) => {
  return {
    type: actionTypes.SET_CATEGORY,
    category: category,
  };
};
export const setSelectedCategory = (catgId) => {
  return (dispatch) => {
    axios.get('category/category/' + catgId).then((res) => {
      dispatch(setCategory(res.data));
    });
  };
};

const setProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products,
  };
};
const setSelectedProduct = (product) => {
  return {
    type: actionTypes.SET_PRODUCT,
    product: product,
  };
};
export const initSelectedProduct = (productId) => {
  return (dispatch) => {
    axios
      .get('product/product/' + productId)
      .then((res) => {
        dispatch(setSelectedProduct(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const initProducts = (catgId) => {
  return (dispatch) => {
    axios
      .get('product/products/' + catgId)
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const setToppingsForCategories = (categories) => {
  return (dispatch) => {
    let toppingsForCategories = [];
    let index = 0;
    categories.map((category) => {
      axios.get('topping/toppings/' + category.categoryId).then((res) => {
        index++;
        let obj = { [category.categoryId]: res.data };
        toppingsForCategories.push(obj);
        if (index === categories.length) {
          dispatch(setToppingsCategories(toppingsForCategories));
          console.log(index, 'index');
        }
      });
    });
  };
};
const setToppingsCategories = (categoriesAndToppings) => {
  return {
    type: actionTypes.SET_TOPPINGS_FOR_CATEGORIES,
    toppings: categoriesAndToppings,
  };
};
const setCategoriesForToppings = (categories) => {
  return {
    type: actionTypes.SET_TOPPINGS_CATEGORIES,
    categories: categories,
  };
};
const setCategoriesForToppingsLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING_FOR_CATEGORIES,
    loading: loading,
  };
};
const setToppingsCategoriesLoading = (loading) => {
  return {
    type: actionTypes.SET_LOADING_FOR_CATEGORIES_TOPPINGS,
    loading: loading,
  };
};
export const initToppingsCategories = (catgId) => {
  return (dispatch) => {
    dispatch(setCategoriesForToppingsLoading(true));
    dispatch(setToppingsCategoriesLoading(true));
    axios
      .get('category/toppingsCategoriesForProductCategory/' + catgId)
      .then((res) => {
        dispatch(setToppingsForCategories(res.data));
        dispatch(setCategoriesForToppings(res.data));
      })
      .catch((err) => console.log(err));
  };
};
const setSizes = (sizes) => {
  return {
    type: actionTypes.SET_SIZES,
    sizes: sizes,
  };
};
export const initSizes = (catgId) => {
  return (dispatch) => {
    axios
      .get('size/sizes/' + catgId)
      .then((res) => {
        dispatch(setSizes(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const initFreeToppingsAmount = () => {
  return {
    type: actionTypes.SET_FREE_TOPPINGS_AMOUNT,
  };
};
const setToppings = (toppings) => {
  return {
    type: actionTypes.SET_TOPPINGS,
    toppings: toppings,
  };
};
const arrayToObject = (array) =>
  array.reduce((obj, item) => {
    obj[item.toppingId] = item;
    return obj;
  }, {});
export const initToppings = (catgId) => {
  return (dispatch) => {
    axios
      .get('topping/toppingsByCatgProduct/' + catgId)
      .then((res) => {
        const updatedToppings = res.data.map((topping) => {
          return {
            ...topping,
            amount: 0,
          };
        });
        const toppingsObject = arrayToObject(updatedToppings);
        dispatch(setToppings(toppingsObject));
      })
      .catch((err) => console.log(err));
  };
};

export const addToppping = (toppingId, amount) => {
  return {
    type: actionTypes.ADD_TOPPING,
    toppingId: toppingId,
    amount: amount,
  };
};
export const updatePriceAdd = (toppingId) => {
  return {
    type: actionTypes.UPDATE_PRICE_ADD,
    toppingId: toppingId,
  };
};
export const updatePriceRemove = (toppingId) => {
  return {
    type: actionTypes.UPDATE_PRICE_REMOVE,
    toppingId: toppingId,
  };
};
export const removeTopping = (toppingId, catgId) => {
  return {
    type: actionTypes.REMOVE_TOPPING,
    toppingId: toppingId,
    catgId: catgId,
  };
};
export const setSelectedSize = (size) => {
  return {
    type: actionTypes.SET_SELECTED_SIZE,
    size: size,
  };
};
