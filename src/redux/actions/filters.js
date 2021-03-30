const setSortBy = ({type, order}) => ({
  type: 'CHANGE_SORT_BY',
  payload: {type, order}
});

const setCategory = (index) => ({
  type: 'CHANGE_CATEGORY',
  payload: index
});

export { setSortBy, setCategory as setCategoryState }