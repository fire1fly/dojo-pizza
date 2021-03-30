import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/actions/pizzas';
import { setSortBy, setCategoryState } from '../redux/actions/filters';
import { setCartPizzas } from '../redux/actions/cart';

import { Categories, Sort, PizzaBlock, PizzaLoader } from '../components';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  {type: 'rating', name: 'популярности', order: 'desc'},
  {type: 'price', name: 'цене', order: 'desc'},
  {type: 'name', name: 'алфавиту', order: 'asc'}
];

export default function Home() {

  console.log("HOME RERENDER");

  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);


  React.useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback(index => {
    dispatch(setCategoryState(index));
  }, []);

  const onSelectSortBy = React.useCallback(sort => {
    dispatch(setSortBy(sort))
  }, []);

  const addToCart = React.useCallback((product) => {
    dispatch(setCartPizzas(product));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCat={onSelectCategory}
          categories={categoryNames}
        />
        <Sort 
          activeSortType={sortBy.type}
          onClickSort={onSelectSortBy}
          sorts={sortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded 
        ? items.map(pizza => <PizzaBlock 
          key={pizza.id} 
          {...pizza} 
          onAddtoCart={addToCart} 
        />)
        : Array(10).fill('').map((_, index) => <PizzaLoader key={index}/>)}
      </div>
    </div>
  )
}
