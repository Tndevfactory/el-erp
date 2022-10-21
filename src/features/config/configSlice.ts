import { createSlice } from "@reduxjs/toolkit";

interface ConfigState {
  isCollapsed: boolean;
  isVisibleDrawer: boolean;
  lang: "ar" | "fr" | "en";
}
const initialState = {
  isCollapsed: false,
  isVisibleDrawer: false,
  lang: "ar",
} as ConfigState;

const configSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    collapseLayer: (state, action) => {
      state.isCollapsed = true;
    },
    toggleCollapseLayout: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    uncollapseLayer: (state, action) => {
      state.isCollapsed = false;
    },
    showDrawer: (state) => {
      state.isVisibleDrawer = true;
    },
    closeDrawer: (state) => {
      state.isVisibleDrawer = false;
    },
  },
});

export const {
  collapseLayer,
  uncollapseLayer,
  toggleCollapseLayout,
  showDrawer,
  closeDrawer,
} = configSlice.actions;

export default configSlice.reducer;
