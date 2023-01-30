import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROD_URL,
});
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
export interface MenuRecursive {
  id: number;
  designation_fr: string;
  designation_ar?: any;
  ordre?: any;
  menu_parant: number;
  active: number;
  link?: string;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
  // child_recursive: MenuRecursive[];
}
export const getMenus: any = createAsyncThunk(
  "menus",
  async (_, thunkAPI) => {
    try {
      let url = `/menus/myMenu`;
      const resp = await api.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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
