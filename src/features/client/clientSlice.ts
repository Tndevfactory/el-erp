import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export interface IClient {
    id: number;
    designation: string;
    adresse: string ;
    deleted_at: string; 
    created_at: string ; 
    updated_at: string ;
} 
export const getClients: any = createAsyncThunk(
    "client",
    async (espace_id, thunkAPI) => {
      try {
        let url = `/tiers`;
        const resp = await api.get(url);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );