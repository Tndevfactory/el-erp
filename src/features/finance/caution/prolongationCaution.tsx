import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export interface IProlongation {
    caution_id: number,
    reference: string;
    duree: string;
    etat_id: string;
    date_validation_dep: string
  }

  export const getProlongations: any = createAsyncThunk(
    "prolongation",
    async (_, thunkAPI) => {
      try {
        let url = `/prolongations`;
        const resp = await api.get(url);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );
  export const createProlongation: any = createAsyncThunk(
    "prolongation",
    async (data, thunkAPI) => {
      try {
        let url = `/prolongations`;
        const resp = await api.post(url, data);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );