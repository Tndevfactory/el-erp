import { createSlice } from "@reduxjs/toolkit";
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
interface IProlongation {
  Référence: string;
  Durée: number;
  Etat: string;
}
export interface ICaution {
  id: number;
  Nom_Projet: string;
  Demandeur: string;
  type_caution: string;
  DateD: string;
  DateE?: string;
  Client: string;
  Montant: number;
  ligne: string;
  Durée?: number;
  DuréeAdditionnelle?: number;
  Frais_mois: number;
  Etat_main_levée: string;
  Date_réception_PV_définitif?: string;
  Observation?: string;
  Prolongations?: IProlongation[];
}
interface ICautions {
  cautions: ICaution[];
  caution: ICaution;
}

const initialState = {
  cautions: dataSource,
  caution:{}
} ;

const cautionSlice = createSlice({
  name: "caution",
  initialState,
  reducers: {
    getOneCaution: (state, action) => {
      state.caution = state.cautions.filter(
        (caution) => caution.id === action.payload.id
      )[0];
    },
    deleteCaution: (state, action) => {
      state.cautions = state.cautions.filter(
        (caution) => caution.id !== action.payload.id
      );
      console.log(state.cautions);
    },
    addCaution: (state, action) => {
      state.cautions.unshift(action.payload);
    },
    updateCaution: (state, action) => {
      state.cautions.map((caution) => {
        if (caution.id === action.payload.id) {
          caution.Nom_Projet = action.payload.caution.Nom_Projet;
          caution.Demandeur = action.payload.caution.Demandeur;
          caution.type_caution = action.payload.caution.type_caution;
          caution.Client = action.payload.caution.Client;
          caution.Montant = action.payload.caution.Montant;
          caution.DateD = action.payload.caution.DateD;
          caution.Durée = action.payload.caution.Durée;
          caution.ligne = action.payload.caution.ligne;
          caution.Observation = action.payload.caution.Observation;
          caution.Etat_main_levée = action.payload.caution.Etat_main_levée;
          caution.Date_réception_PV_définitif =
            action.payload.caution.Date_réception_PV_définitif;
        }
      });
    },
    CautionApprove: (state, action) => {
      state.cautions.map((caution) => {
        if (caution.id === action.payload.id) {
          caution.Etat_main_levée = "En cours";
        }
      });
    },
    closeCaution: (state, action) => {
      state.cautions.map((caution) => {
        if (caution.id === action.payload.id) {
          caution.Etat_main_levée = "Fermée";
        }
      });
    },
    addDuration: (state, action) => {
      state.cautions.map((caution) => {
        if (caution.id === action.payload.id) {
          caution.DuréeAdditionnelle += action.payload.DuréeAdditionnelle;
          caution.Durée += action.payload.DuréeAdditionnelle;
        }
      });
    },
  },
});

export const {
  getOneCaution,
  closeCaution,
  deleteCaution,
  addCaution,
  updateCaution,
  addDuration,
  CautionApprove,
} = cautionSlice.actions;

export default cautionSlice.reducer;
