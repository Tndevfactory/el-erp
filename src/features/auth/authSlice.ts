import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const login: any = createAsyncThunk(
    "auth",
    async (data, thunkAPI) => {
      try {
        let url = `/login`;
        const resp = await api.post(url,data);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );