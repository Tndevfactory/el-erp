import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export interface IEntreprise {
    id: number;
    entreprise_id: number;
    designation: string;
    caution_mnt_max: number;
    deleted_at: string;
    created_at:string;
    updated_at:string;
    entreprise: IEntreprise[]
} 
export const getEntreprises: any = createAsyncThunk(
    "entreprise",
    async (espace_id, thunkAPI) => {
      try {
        let url = `/entreprises`;
        const resp = await api.get(url);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );