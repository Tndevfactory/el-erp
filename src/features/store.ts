import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import modalReducer from "./modal/modalSlice";
import uiReducer from "./ui/uiSlice";
import cautionReducer from "./caution/cautionSlice"
import projectReducer from "./project/projectSlice"
import timesheetReducer from "./timesheet/timesheetSlice"
import flotteContractReducer from "./flotte/contract/flotteContractSlice"
import flotteClientReducer from "./flotte/client/flotteClientSlice"
import flotteVehiculeReducer from "./flotte/vehicule/flotteVehiculeSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    ui: uiReducer,
    caution:cautionReducer,
    project:projectReducer,
    timesheet:timesheetReducer,
    flotteContract:flotteContractReducer,
    flotteClient:flotteClientReducer,
    flotteVehicule:flotteVehiculeReducer
  },
});
