import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROD_URL,
});

export interface IEmployee {
}
export const getEmployees: any = createAsyncThunk(
  "employees",
  async (data, thunkAPI) => {
    try {
      let url = `/employes/all`;
      const resp = await api.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const initialState = {
} 
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
  });
  
  export const {  } = userSlice.actions;
  
  export default userSlice.reducer;
