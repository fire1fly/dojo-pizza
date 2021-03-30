const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0
}

const getTotalPrice  = pizzas => pizzas.reduce((sum, obj) => obj.price + sum, 0);

const getValue = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};

const getTotal = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = getValue(obj, path);
    return sum + value;
  },0)
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART': {
      const itemId = action.payload ? `${action.payload.id}_${action.payload.size}_${action.payload.type}` : '';
      const currentPizzaItems = !state.items[itemId]
        ? [action.payload]
        : [...state.items[itemId].items, action.payload];

      const obj = {
        ...state.items,
        [itemId]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems)
        }
      }

      const totalCount = getTotal(obj, 'items.length');
      const totalPrice = getTotal(obj, 'totalPrice');

      return {
        ...state,
        items: obj,
        totalPrice,
        totalCount
      };
    }
    case 'SET_EMPTY_CART': {
      return { items: {}, totalCount: 0, totalPrice: 0}
    }
    case 'REMOVE_PIZZA_ITEM': {
      const newItems = {
        ...state.items
      }
      console.log(action.payload);
      const totalPriceByPizza = newItems[action.payload].totalPrice,
            totalCountByPizza = newItems[action.payload].items.length;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - totalPriceByPizza,
        totalCount: state.totalCount - totalCountByPizza
      }
    }
    case 'PLUS_ITEM_CART': {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0]
      ];

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        }
      }

      const totalCount = getTotal(newItems, 'items.length');
      const totalPrice = getTotal(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice
      }
    }
    case 'MINUS_ITEM_CART': {
      const oldItems = state.items[action.payload].items;
      const newObjItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        }
      }
      const totalCount = getTotal(newItems, 'items.length');
      const totalPrice = getTotal(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice
      }
    }

    default:
      return state;
  }
}

export default cart;