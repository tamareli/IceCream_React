import * as actionTypes from '../actionTypes/productBuilder';
import axios from '../../axios';

export const initProductBuilder = () => {
  return {
    type: actionTypes.INIT_PRODUCT_BUILDER,
  };
};
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

const setProductsError = () => {
  return {
    type: actionTypes.SET_PRODUCTS_ERROR,
  };
};

const setSelectedProduct = (product) => {
  return {
    type: actionTypes.SET_PRODUCT,
    product: product,
  };
};

const setSelectedProductError = () => {
  return {
    type: actionTypes.SET_PRODUCT_ERROR,
  };
};

const setCategoryError = () => {
  return {
    type: actionTypes.SET_CATEGORY_ERROR,
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
        dispatch(setSelectedProductError());
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
        dispatch(setProductsError());
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
          let transformedToppingsForCategories=[];
          for (let i = 0; i < categories.length; i++) {
            let category2 = toppingsForCategories.filter(
              category => Object.keys(category)[0] == categories[i].categoryId
            );  
            transformedToppingsForCategories.push(category2[0]);
          }          
          dispatch(setToppingsCategories(transformedToppingsForCategories));
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

const setCategoriesForToppingsError = () => {
  return {
    type: actionTypes.SET_CATEGORIES_TOPPINGS_ERROR,
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
      .catch((err) => {
        dispatch(setCategoriesForToppingsError());
      });
  };
};

const setSizes = (sizes) => {
  return {
    type: actionTypes.SET_SIZES,
    sizes: sizes,
  };
};

export const setSizesError = () => {
  return {
    type: actionTypes.SET_SIZES_ERROR,
  };
};

export const initSizes = (catgId, from) => {
  return (dispatch) => {
    axios
      .get('size/sizes/' + catgId)
      .then((res) => {
        dispatch(setSizes(res.data));
        if(from === 'fromCreate'){
          dispatch(setSelectedSize(res.data[0]));
        }
      })
      .catch((err) => {
        dispatch(setSizesError());
      });
  };
};

export const initFreeToppingsAmount = () => {
  return {
    type: actionTypes.SET_FREE_TOPPINGS_AMOUNT,
  };
};
export const initToppings = (toppings) => {
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

export const addToppping = (topping, amount) => {
  return {
    type: actionTypes.ADD_TOPPING,
    topping: topping,
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

export const setSelectedSize = (size) => {
  return {
    type: actionTypes.SET_SELECTED_SIZE,
    size: size,
  };
};

export const setToppingsAmount = (toppingsAmount) => {
  return {
    type: actionTypes.SET_TOPPINGS_AMOUNT,
    toppingsAmount: toppingsAmount,
  };
};

export const setToppingsPrice = (toppingsPrice) => {
  return {
    type: actionTypes.SET_TOPPINGS_PRICE,
    toppingsPrice: toppingsPrice,
  };
};
