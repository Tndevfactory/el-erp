import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import modalReducer from "./modal/modalSlice";
import uiReducer from "./ui/uiSlice";
import cautionReducer from "./caution/cautionSlice"
import projectReducer from "./project/projectSlice"
import timesheetReducer from "./timesheet/timesheetSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    ui: uiReducer,
    caution:cautionReducer,
    project:projectReducer,
    timesheet:timesheetReducer
  },
});
