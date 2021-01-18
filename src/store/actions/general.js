import * as actionTypes from '../actionTypes/general';
import axios from '../../axios';

const setCategories = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES,
    categories: categories,
  };
};
const fetchCategoriesFailed = () => {
  return {
    type: actionTypes.FETCH_CATEGORIES_FAILED,
  };
};
export const initCategories = () => {
  return (dispatch) => {
    axios
      .get('category/categories')
      .then((res) => {
        dispatch(setCategories(res.data));
      })
      .catch((err) => {
        dispatch(fetchCategoriesFailed());
      });
  };
};
