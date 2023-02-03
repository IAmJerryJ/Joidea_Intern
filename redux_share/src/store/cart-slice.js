import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    //可以直接修改state函数，因为@redux/toolkit使用了immer插件，正常的reducer必须返回新的state
    replaceCart(state, action) {
      //接收到的action是个对象类型，其中payload包含传入的参数
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      //除了初次replce cart之外，state有改变，所以要发送数据请求
      state.changed = true;
      const newItem = action.payload;
      //查找存在的物品
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      //如果不存在，向state.item数组增加新的items，格式要对应
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        //如果存在，只增加数量和总价
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      //如果只有一个物品，直接移除
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        //如果>1，数量-1，总价减去当前物品价格
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
