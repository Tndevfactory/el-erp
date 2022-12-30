import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProject } from "@/features/project/projectSlice";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
const dataSource = [
  {
    id: 0,
    Nom_Projet: "AO N°21/2022",
    Demandeur: "Asma Manaii",
    type_caution: "Provisoire-CSP",
    DateD: "1/11/2022",
    Client: "Ministère de la Jeunesse et des Sports",
    Montant: 3500,
    ligne: "EPS",
    Durée: 120,
    DuréeAdditionnelle: null,
    Frais_mois: 20,
    Etat_main_levée: "En attente",
    Date_réception_PV_définitif: null,
    Observation: null,
    Prolongations: [],
  },
  {
    id: 1,
    Nom_Projet: "C N°5 PAQ-DGSE 022-UT",
    Demandeur: "Asma Manaii",
    type_caution: "Provisoire-CSP",
    DateD: "1/08/2022",
    Client: "ISEAHT",
    Montant: 300,
    ligne: "Compte courant",
    Frais_mois: 20,
    Durée: 120,
    DuréeAdditionnelle: null,
    Etat_main_levée: "En cours",
    Date_réception_PV_définitif: null,
    Observation: null,
    Prolongations: [
      {
        Référence: "1FS548E",
        Durée: 15,
        DateE: "12/01/2023",
        Etat: "En attente",
      },
      {
        Référence: "34DS856",
        Durée: 30,
        DateE: "28/12/2022",
        Etat: "Approuver",
      },
    ],
  },
  {
    id: 2,
    Nom_Projet: "AO N°02/2020",
    Demandeur: "Abdelmonam KOUKA",
    type_caution: "Retenue de Garantie",
    DateD: "30/06/2022",
    Client: "SNIT Nord",
    Montant: 2142,
    ligne: "EPS",
    Frais_mois: 20,
    Durée: 120,
    DuréeAdditionnelle: null,
    Etat_main_levée: "En cours",
    Date_réception_PV_définitif: null,
    Observation: null,
    Prolongations: [],
  },
  {
    id: 3,
    Nom_Projet: "AO N°02/CN/2021",
    Demandeur: "Abdelmonam KOUKA",
    type_caution: "Retenue de Garantie",
    DateD: "20/10/2022",
    Client: "Institut National de la Météorologie-INM",
    Montant: 1458,
    ligne: "EPS",
    Frais_mois: 20,
    Durée: 90,
    DuréeAdditionnelle: null,
    Etat_main_levée: "En cours",
    Date_réception_PV_définitif: "25/10/2023",
    Prolongations: [],
    Observation: null,
  },
  {
    id: 4,
    Nom_Projet: "AO N°21/2022",
    Demandeur: "Hiba GRAYAA",
    type_caution: "Définitive-CSP",
    DateD: "11/8/2022",
    Client: "Ministère de commerce et du Développement des Exportations",
    Montant: 4831.4,
    ligne: "EPS",
    Durée: 120,
    DuréeAdditionnelle: 30,
    Frais_mois: 20,
    Etat_main_levée: "En cours",
    Date_réception_PV_définitif: null,
    Observation:
      "Reste la validation du directeur de l'IRT + PAM (PV DE VALIDATION). Garantie 10 mois, réception déf 30 jrs après la garantie.",
    Prolongations: [],
  },
  {
    id: 5,
    Nom_Projet: "C N°5 PAQ-DGSE 022-UT",
    Demandeur: "Asma Manaii",
    type_caution: "Provisoire-CSP",
    DateD: "1/4/2022",
    Client: "ISEAHT",
    Montant: 300,
    ligne: "Compte courant",
    Frais_mois: 20,
    Durée: 90,
    DuréeAdditionnelle: null,
    Etat_main_levée: "Fermée",
    Date_réception_PV_définitif: "12/03/2023",
    Observation: null,
    Prolongations: [],
  },
  {
    id: 6,
    Nom_Projet: "AO N°02/CN/2021",
    Demandeur: "Abdelmonam KOUKA",
    type_caution: "Retenue de Garantie",
    DateD: "20/10/2022",
    Client: "Institut National de la Météorologie-INM",
    Montant: 1458,
    ligne: "EPS",
    Frais_mois: 20,
    Durée: 90,
    DuréeAdditionnelle: null,
    Etat_main_levée: "En cours",
    Date_réception_PV_définitif: null,
    Observation: null,
    Prolongations: [],
  },
  {
    id: 7,
    Nom_Projet: "AO N°21/2022",
    Demandeur: "Hiba GRAYAA",
    type_caution: "Définitive-CSP",
    DateD: "11/8/2022",
    Client: "Ministère de commerce et du Développement des Exportations",
    Montant: 4831.4,
    ligne: "EPS",
    Durée: 120,
    DuréeAdditionnelle: 30,
    Frais_mois: 20,
    Etat_main_levée: "En cours",
    Date_réception_PV_définitif: null,
    Prolongations: [],
    Observation:
      "Reste la validation du directeur de l'IRT + PAM (PV DE VALIDATION). Garantie 10 mois, réception déf 30 jrs après la garantie.",
  },
];
export interface IProlongation {
  reference: string;
  duree: string;
  etat?: string;
}
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
}
export const getCautions: any = createAsyncThunk(
  "cautions",
  async (espace_id, thunkAPI) => {
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
  async (espace_id, thunkAPI) => {
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

const initialState = {
  cautions: dataSource,
  caution: {},
};

const cautionSlice = createSlice({
  name: "caution",
  initialState,
  reducers: {
  },
});

export const {
} = cautionSlice.actions;

export default cautionSlice.reducer;
