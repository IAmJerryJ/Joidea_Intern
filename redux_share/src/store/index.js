import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

//配置store,相当于订阅了这两个slice
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
