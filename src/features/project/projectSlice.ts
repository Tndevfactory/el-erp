import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
const data = {
  cards: [
    {
      id: 92,
      dateD: "2022-06-23",
      dateF: "2022-06-28",
      title: "gerer demande",
      description: null,
      state: "Backlog",
    },

    {
      id: 48,
      dateD: "2022-06-08",
      dateF: "2022-07-03",
      title: "gerer compte",
      description: "bqvdsqvdvqdvkq",
      state: "Doing",
    },
    {
      id: 49,
      dateD: "2022-06-30",
      dateF: "2022-07-04",
      title: "Admin Dashboard",
      description: "On this task we will build the admin's dashboard...",
      state: "Doing",
    },
    {
      id: 7,
      dateD: "2022-06-09",
      dateF: "2022-06-13",
      title: "Messagerie11",
      description: null,
      state: "Test",
    },
    {
      id: 9,
      dateD: "2022-06-01",
      dateF: "2022-06-09",
      title: "gerer notification",
      description: "description dhvsdh",
      state: "Test",
    },
    {
      id: 88,
      dateD: "2022-06-24",
      dateF: "2022-06-30",
      title: "gestion annonce",
      description: null,
      state: "Finish",
    },
    {
      id: 89,
      dateD: "2022-06-25",
      dateF: "2022-06-30",
      title: "gerer profile",
      description: null,
      state: "Finish",
    },

    {
      id: 94,
      dateD: "2022-08-18",
      dateF: "2022-08-27",
      title: "task135",
      description: null,
      state: "Finish",
    },
  ],
};

interface ITask {
  id: number;
  dateD: string;
  dateF: string;
  title: string;
  description?: string;
  state: string;
}

interface IColumn {
  id: number;
  title: string;
  cards: ITask[];
}

export interface IProject {
  id: number;
  tier_id: number;
  departement_id: number;
  designation: string;
  reference: string;
  projet_id?: any;
  date_ordre_service?: string;
  duree_exec?: number;
  lien_partage?: string;
  signature_contrat?: string;
  deleted_at?: any;
  created_at?: Date;
  updated_at?: Date;
}

export const getProjects: any = createAsyncThunk(
  "project",
  async (espace_id, thunkAPI) => {
    try {
      let url = `/projets`;
      const resp = await api.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
    tasks:data.cards
  } ;

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {

  },
});

export const {  } = projectSlice.actions;

export default projectSlice.reducer;
