import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  appMenu: {}[];
  homeSideMenu: {}[];
  rhSideMenu: {}[];
  achatSideMenu: {}[];
  financeSideMenu: {}[];
  immoSideMenu: {}[];
  projetSideMenu: {}[];
  ticketingSideMenu: {}[];
  accountSideMenu: {}[];
  configSideMenu: {}[];
  profileMenu: {}[];
  nothing: boolean;
}
const initialState = {
  appMenu: [{}],
} as MenuState;

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    closeDrawer: (state) => {
      state.nothing = false;
    },
  },
});

export const { closeDrawer } = menuSlice.actions;

export default menuSlice.reducer;
