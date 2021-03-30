const initialState = {
  sortBy: { type: 'rating', order: 'desc'},
  category: null
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SORT_BY':
      return {
        ...state,
        sortBy: action.payload
      }
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        category: action.payload
      }
    default:
      return state;
  }
}

export default filters;