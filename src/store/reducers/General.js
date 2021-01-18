import * as actionTypes from '../actionTypes/general';
const initialState = {
  categories: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
  }
  return state;
};
export default reducer;
