export const setCartPizzas = payload => {
  return {
    type: 'ADD_PIZZA_TO_CART',
    payload
  }
}

export const setEmptyCart = () => {
  return {
    type: 'SET_EMPTY_CART'
  }
}

export const removePizzaItem = payload => {
  return {
    type: 'REMOVE_PIZZA_ITEM',
    payload
  }
}

export const plusItemCart = payload => {
  return {
    type: 'PLUS_ITEM_CART',
    payload
  }
}

export const minusItemCart = payload => {
  return {
    type: 'MINUS_ITEM_CART',
    payload
  }
}