import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../assets/img/empty-cart.png';
import { Button } from '../../components'

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link to="/">
        <Button className="button--black go-back-btn">
          <span>Вернуться назад</span>
        </Button>
      </Link>
    </div>
  )
}