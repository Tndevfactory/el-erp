import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import modalReducer from "./modal/modalSlice";
import uiReducer from "./ui/uiSlice";
import menuReducer from "./menus/menuSlice";
import helperReducer from "./helper/helperSlice";
import configReducer from "./config/configSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    ui: uiReducer,
    menu: menuReducer,
    helper: helperReducer,
    config: configReducer,
  },
});
