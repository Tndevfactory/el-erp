import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface IEntreprise {
  id: number;
  entreprise_id: number;
  designation: string;
  caution_mnt_max: number;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface IClient {
  id: number;
  designation: string;
  entreprise_id: number;
  adresse: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  entreprise: IEntreprise;
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