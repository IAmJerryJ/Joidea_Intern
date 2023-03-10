import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // //判断传入的item是需要update的值还是要新加的值 => 不存在这个item，findIndex = -1，如果存在，>-1
    // //来处理不存在item的情况
    // //if不存在，处理添加的情况 => [..., newItem]
    // //if结束，直接return
    // //if存在, 找到state里的是哪个item，更新state里的item，return
    // //items.map((item) => {
    // //  if (index === findIndex) return {
    // //    ...existingCartItem,
    // //    amount: existingCartItem.amount + action.item.amount,
    // //  }
    // //    return item}
    // //)
    // //

    const incomingId = action.item.id;
    const totalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    if (state.items.findIndex((item) => item.id === incomingId) === -1) {
      return { items: [...state.items, action.item], totalAmount };
    }
    const items = state.items.map((x) =>
      x.id === incomingId ? { ...x, amount: x.amount + action.item.amount } : x
    );

    return { items, totalAmount };

    // const updatedTotalAmount =
    //   state.totalAmount + action.item.price * action.item.amount;

    // const existingCartItemIndex = state.items.findIndex(
    //   (item) => item.id === action.item.id
    // );

    // const existingCartItem = state.items[existingCartItemIndex];

    // let updatedItems;

    // if (existingCartItem) {
    //   const updatedItem = {
    //     ...existingCartItem,
    //     amount: existingCartItem.amount + action.item.amount,
    //   };
    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // } else {
    //   updatedItems = state.items.concat(action.item);
    // }
    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount,
    // };
  }
  if (action.type === "REMOVE") {
    const existingItem =
      state.items[state.items.findIndex((item) => item.id === action.id)];
    const totalAmount = state.totalAmount - existingItem.price;
    // const items = state.items.reduce((previousItems, currentItem) => {
    //   if (existingItem.id === currentItem.id) {
    //     currentItem.amount > 1 ? currentItem.amount-- : (currentItem = null);
    //   }
    //   if (currentItem) previousItems.push(currentItem);
    //   return previousItems;
    // }, []);
    // return { items, totalAmount };

    let items;
    if (existingItem.amount === 1)
      items = state.items.filter((item) => item.id !== action.id);
    else {
      items = state.items.map((x) =>
        x.id === existingItem.id ? { ...x, amount: x.amount - 1 } : x
      );
    }
    return { items, totalAmount };
    //------------------------------------------
    // const existingCartItemIndex = state.items.findIndex(
    //   (item) => item.id === action.id
    // );
    // const existingItem = state.items[existingCartItemIndex];
    // const updatedTotalAmount = state.totalAmount - existingItem.price;
    // let updatedItems;
    // if (existingItem.amount === 1) {
    //   updatedItems = state.items.filter((item) => item.id !== action.id);
    // } else {
    //   const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // }
    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount,
    // };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
