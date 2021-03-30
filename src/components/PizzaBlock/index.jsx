import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Button } from '../../components';

const typesNames = ['тонкое', 'традиционное'];
const sizesValues = [26, 30, 40];

function PizzaBlock({id, name, imageUrl, price, types, sizes, onAddtoCart}) {

  // console.log(`RERENDER ${name} PIZZA`);

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [btnIsHover, setBtnIsHover] = useState(0);

  const cartItems = useSelector(({ cart }) => cart.items);
  const pizzaId = `${id}_${activeSize}_${activeType}`;
  const countCartPizza = cartItems[pizzaId] && cartItems[pizzaId].items.length;

  const selectType = useCallback(index => {
    setActiveType(index);
  }, []);

  const selectSize = useCallback(index => {
    setActiveSize(index);
  }, []);

  const onBtnAddMouseEnter = useCallback(() => {
    setBtnIsHover(1);
  }, []);

  const onBtnAddMouseOver = useCallback(() => {
    setBtnIsHover(2);
  }, []);

  const onAddtoCartHandle = () => {
    const pizza = {
      id, 
      name,
      imageUrl,
      price,
      type: activeType,
      size: activeSize
    }

    onAddtoCart(pizza);
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt={name}
        title={`Добавить ${name}, ${activeSize} см, ${typesNames[activeType]} тесто`}
        onClick={onAddtoCartHandle}
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {
            typesNames.map((type, index) => 
              <li 
                key={index}
                onClick={() => selectType(index)}
                className={classNames({
                  disabled: !types.includes(index),
                  active: index === activeType
                })}
              >
                {type}
              </li>
            )
          }
        </ul>
        <ul>
          {
            sizesValues.map((size, index) => 
              <li 
                key={index}
                onClick={() => selectSize(size)}
                className={classNames({
                  disabled: !sizes.includes(size),
                  active: size === activeSize,
                })}
              >
                {size} см.
              </li>
            )
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <Button 
          className={"button--add"} 
          onClick={onAddtoCartHandle} 
          onMouseEnter={onBtnAddMouseEnter}
          onMouseLeave={onBtnAddMouseOver} 
          isHover={btnIsHover} 
          outline>

          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {countCartPizza && <i>{countCartPizza}</i>}
        </Button>
      </div>
    </div> 
  )
}

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLoaded: PropTypes.bool,
  onAddtoCart: PropTypes.func,
  countCartPizza: PropTypes.number
}

PizzaBlock.defaultProps = {
  name: '---',
  imageUrl: '',
  price: -1,
  types: [],
  sizes: [],
  isLoaded: false
};

export default PizzaBlock;
