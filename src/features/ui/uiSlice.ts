import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  isCollapsed: boolean;
  isVisibleDrawer: boolean;
  lang: "ar" | "fr" | "en";
}
const initialState = {
  isCollapsed: false,
  isVisibleDrawer: false,
  lang: "ar",
} as UiState;

const uiSlice = createSlice({
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
} = uiSlice.actions;

export default uiSlice.reducer;
