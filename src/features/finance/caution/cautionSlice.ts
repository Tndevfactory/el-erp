import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProject } from "@/features/project/projectSlice";
import { IProlongation } from "./prolongationCaution";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface Projet {
  id: number;
  tier_id: number;
  departement_id: number;
  designation: string;
  reference: string;
  projet_id?: any;
  date_ordre_service: string;
  duree_exec?: any;
  lien_partage?: string;
  signature_contrat: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CautionEtat {
  id: number;
  etat: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ICautionNature {
  id: number;
  type: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ICaution {
  id: number;
  designation?: string;
  projet_id: number;
  etat_id: number;
  type_id: number;
  created_by?: string;
  montant: number;
  eps: number;
  date_max_retour?: string;
  period_valid: number;
  date_validation_chef?: string;
  date_validation_dep?: string;
  date_env_bnq?: string;
  date_retour_bnq?: string;
  date_close?: string;
  DateE?: string;
  pourcentage?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  tier_id: number;
  tier_name: string;
  entreprise_id?: string;
  entreprise_name?: string;
  projet: Projet;
  caution_etat: CautionEtat;
  caution_type: ICautionNature;
  user?: string;
  caution_files: string[];
  prolongations: IProlongation[];
  key:string;
  dureeAfterProlongation?:number;
}
export const getCautions: any = createAsyncThunk(
  "cautions",
  async (_, thunkAPI) => {
    try {
      let url = `/cautions`;
      const resp = await api.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getCautionNatures: any = createAsyncThunk(
  "cautions",
  async (_, thunkAPI) => {
    try {
      let url = `/caution_types`;
      const resp = await api.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const createCaution: any = createAsyncThunk(
  "cautions",
  async (data, thunkAPI) => {
    try {
      let url = `/cautions`;
      const resp = await api.post(url, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const updateCaution: any = createAsyncThunk(
  "cautions",
  async (data:{id: number; projet_id: number; caution_nature_id:number; montant:number; eps:number; period_valid:number}, thunkAPI) => {
    try {
      let url = `/cautions/${data.id}`;
      const resp = await api.put(url, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteCaution: any = createAsyncThunk(
  "cautions",
  async (id, thunkAPI) => {
    try {
      let url = `/cautions/${id}`;
      const resp = await api.delete(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

// const initialState = {
//   cautions: dataSource,
//   caution: {},
// };

// const cautionSlice = createSlice({
//   name: "caution",
//   initialState,
//   reducers: {
//   },
// });

// export const {
// } = cautionSlice.actions;

// export default cautionSlice.reducer;
