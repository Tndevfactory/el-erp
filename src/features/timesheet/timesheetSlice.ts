import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROD_URL,
});

export interface ISheet {
    key?: number;
    employe: string;
    entreprise: string;
    details: {
      id: number;
      projet: string;
      tache: string;
      typeTache: string;
      nbrHeures: number;
      date: string;
    }[];
}
export const getTimesheets: any = createAsyncThunk(
  "timesheets",
  async (data, thunkAPI) => {
    try {
      let url = `/timetracking/all`;
      const resp = await api.post(url, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const initialState = {
} 
const timesheetSlice = createSlice({
    name: "timesheet",
    initialState,
    reducers: {
    },
  });
  
  export const {  } = timesheetSlice.actions;
  
  export default timesheetSlice.reducer;
