import * as actionTypes from '../actionTypes/general';
const initialState = {
  categories: [],
  isLoading: true,
  hasError: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
        isLoading: false,
        hasError: false
      };
    case actionTypes.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        hasError: true,
        isLoading: false
      }
  }
  return state;
};
export default reducer;
