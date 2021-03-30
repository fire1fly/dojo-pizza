import axios from 'axios';

export const setLoaded = payload => {
  return {
    type: 'SET_LOADING_STATUS',
    payload
  }
}

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items
});

export const fetchPizzas = (category, sortBy) => {
  let categoryQuery = '';
  if (category !== null) {
    categoryQuery = `&category=${category}`;
  }
  return (dispatch) => {
    dispatch(setLoaded(false));
    axios.get(`/pizzas?_sort=${sortBy.type}&_order=${sortBy.order}${categoryQuery}`)
      .then(({ data }) => {
        dispatch(setPizzas(data));
      });
  }
}