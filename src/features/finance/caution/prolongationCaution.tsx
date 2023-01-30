import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface IProlongation {
    id:number,
    caution_id: number,
    reference: string,
    duree: string,
    etat_id: number,
    date_validation_dep: string,
    key?:any
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
  export const updateProlongation: any = createAsyncThunk(
    "prolongation",
    async (data:{id: number; caution_id: number; etat_id:number; duree:number; reference:string}, thunkAPI) => {
      try {
        let url = `/prolongations/${data.id}`;
        const resp = await api.put(url, data);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );