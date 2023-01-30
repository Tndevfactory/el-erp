import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROD_URL,
});

export const getToken: any = createAsyncThunk(
    "redirection",
    async (token, thunkAPI) => {
      try {
        let url = `/redirect_elastic/${token}`;
        const resp = await api.get(url);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );